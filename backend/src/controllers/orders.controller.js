import { db } from "../database/db.js";

// 🧩 6. 📦 Órdenes (/orders)
// GET	/orders	Ver todas las órdenes (admin o usuario)
// GET	/orders/:id	Ver orden específica
// POST	/orders	Crear una nueva orden (finalizar compra)
// PUT	/orders/:id	Cambiar estado (ej: enviada, cancelada)
// DELETE	/orders/:id	Eliminar orden (opcional, admin)

export function newOrder(req, res) {
  const { user_id, items } = req.body;

  // 1. Crear orden
  const queryOrder = "INSERT INTO orders (user_id, status) VALUES (?, ?)";
  db.query(queryOrder, [user_id, "Pendiente"], (err, data) => {
    if (err) {
      console.log("Error creando orden:", err);
      return res.status(500).json({ message: "Algo salió mal" });
    }

    const order_id = data.insertId;

    // 2. Insertar items
    const queryItems =
      "INSERT INTO order_items (order_id, product_id, quantity, price_at_time) VALUES ?";

    // Cada item lleva el mismo order_id
    const values = items.map((item) => [
      order_id,
      item.product_id,
      item.quantity,
      item.price,
    ]);

    db.query(queryItems, [values], (err) => {
      if (err) {
        console.log("Error insertando items:", err);
        return res
          .status(500)
          .json({ message: "Error registrando los productos" });
      }

      return res
        .status(201)
        .json({ message: "El pedido se realizó con éxito"});
    });
  });
}
