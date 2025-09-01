import { db } from "../database/db.js";

// 🧩 5. 🛒 Carrito (/cart)
// Este módulo puede manejarse en frontend, pero si querés persistir el carrito en la base de datos (opcional), entonces:
// GET	/cart	Obtener carrito actual del usuario
// POST	/cart	Agregar producto al carrito
// PUT	/cart/:itemId	Modificar cantidad
// DELETE	/cart/:itemId	Eliminar ítem del carrito
// DELETE	/cart	Vaciar todo el carrito

export const getCart = (req, res) => {
  const userId = req.body.userId
  const query = `
        SELECT * 
        FROM carts c
        JOIN cart_items ci ON c.id = ci.cart_id
        JOIN products p ON ci.product_id = p.id
        WHERE c.user_id = ?;
    `;

    db.query(query, [userId], (err,data) => {
        if (err) {
            console.log({error: err})
            return res.status(500).json({'error': 'Error del servidor'})
        }
        return res.status(201).json(data)
    })
};
