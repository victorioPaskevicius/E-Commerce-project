import { db } from "../db.js";

// 🧩 6. 📦 Órdenes (/orders)
// GET	/orders	Ver todas las órdenes (admin o usuario)
// GET	/orders/:id	Ver orden específica
// POST	/orders	Crear una nueva orden (finalizar compra)
// PUT	/orders/:id	Cambiar estado (ej: enviada, cancelada)
// DELETE	/orders/:id	Eliminar orden (opcional, admin)