import { db } from "../db.js";

// 🧩 5. 🛒 Carrito (/cart)
// Este módulo puede manejarse en frontend, pero si querés persistir el carrito en la base de datos (opcional), entonces:
// GET	/cart	Obtener carrito actual del usuario
// POST	/cart	Agregar producto al carrito
// PUT	/cart/:itemId	Modificar cantidad
// DELETE	/cart/:itemId	Eliminar ítem del carrito
// DELETE	/cart	Vaciar todo el carrito