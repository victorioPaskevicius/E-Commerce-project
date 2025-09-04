import { db } from "../database/db.js";

// 🧩 5. 🛒 Carrito (/cart)
// Este módulo puede manejarse en frontend, pero si querés persistir el carrito en la base de datos (opcional), entonces:
// GET	/cart	Obtener carrito actual del usuario
// POST	/cart	Agregar producto al carrito
// PUT	/cart/:itemId	Modificar cantidad
// DELETE	/cart/:itemId	Eliminar ítem del carrito
// DELETE	/cart	Vaciar todo el carrito

export const getCart = (req, res) => {
  const userId = req.body.userId;
  const query = `
        SELECT * 
        FROM carts c
        JOIN cart_items ci ON c.id = ci.cart_id
        JOIN products p ON ci.product_id = p.id
        WHERE c.user_id = ?;
    `;

  db.query(query, [userId], (err, data) => {
    if (err) {
      console.log({ error: err });
      return res.status(500).json({ error: "Error del servidor" });
    }
    return res.status(201).json(data);
  });
};

export const addProduct = (req, res) => {
  // Obtener id del carrito
  const { userId, product_id, price } = req.body;
  const query = `
    SELECT id FROM carts WHERE user_id = ?
  `;
  db.query(query, [userId], (err, data) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Error al obtener id del carrito" });
    }
    const cart_id = data[0].id;
    // Comprobar que el item aun no este en el carrito
    const isItemAdded = `
      SELECT product_id FROM cart_items WHERE cart_id = ? AND product_id = ?
    `;
    db.query(isItemAdded, [cart_id, product_id], (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500);
      }
      if (data.length > 0) {
        return res
          .status(201)
          .json({ message: "El producto ya se necuentra en tu carrito" });
      }
      // Insertar item en cart_items
      const insertItemQuery = `
      insert into cart_items (cart_id, product_id,quantity,price) VALUES (?,?,?,?)
    `;
      db.query(insertItemQuery, [cart_id, product_id, 1, price], (err) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ message: "Error al insertar producto" });
        }
        return res
          .status(201)
          .json({ message: "Producto insertado con exito" });
      });
    });
  });
};

export const deleteProduct = (req, res) => {
  const { product_id, user_id } = req.body;
  // Obtener id del carrito
  const getCartIdQuery = `
    SELECT id FROM carts WHERE user_id = ?
  `;
  db.query(getCartIdQuery, [user_id], (err, data) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Error al obtener id del carrito" });
    }
    const cart_id = data[0].id;
    const deleteQuery = `
  DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?;
  `;
    db.query(deleteQuery, [cart_id, product_id], (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Error al eliminar producto" });
      }
      res.status(200)
    });
  });
};
