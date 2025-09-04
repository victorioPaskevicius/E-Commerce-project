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
  const { cart_id, product_id, quantity, price } = req.body;

  // Verificar si el producto ya está en el carrito del usuario
  const verifyProductQuery = `
    SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?
  `;

  db.query(verifyProductQuery, [cart_id, product_id], (err, data) => {
    if (err) {
      console.error("Error en la consulta:", err);
      return res.status(500).json({ message: "Error en el servidor" });
    }

    if (data.length > 0) {
      return res
        .status(201)
        .json({ message: "El producto ya se encuentra en tu carrito" });
    } else {
      // Producto no existe, insertar nuevo
      const insertQuery = `
        INSERT INTO cart_items (cart_id, product_id, quantity, price)
        VALUES (?, ?, ?, ?)
      `;

      db.query(insertQuery, [cart_id, product_id, quantity, price], (err) => {
        if (err) {
          console.error("Error al añadir producto:", err);
          return res
            .status(400)
            .json({ message: "Error al añadir el producto al carrito" });
        }
        return res.status(201).json({ message: "Producto añadido con éxito" });
      });
    }
  });
};
