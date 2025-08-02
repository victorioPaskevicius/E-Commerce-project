import { db } from "../database/db.js";

// Endpoints faltantes
// 🧩 1. 📦 Productos (/products)
// GET	/products	Obtener todos los productos ✔️
// GET	/products/:id	Obtener producto por ID ✔️
// GET	/products/category/:id	Obtener productos por categoría ✔️
// POST	/products	Crear nuevo producto (admin) ✔️
// PUT	/products/:id	Actualizar producto (admin) ✔️
// DELETE	/products/:id	Eliminar producto (admin) ✔️

export const getProducts = (req, res) => {
  const query = "SELECT * FROM products";

  db.query(query, (err, data) => {
    try {
      res.status(201).send(data);
    } catch (error) {
      res.json({ error: `Error al consultar la base de datos ${err}` });
    }
  });
};
export const getProduct = (req, res) => {
  const id = req.params.id;
  const query = "select * from products where products.id = ?";

  db.query(query, [id], (err, data) => {
    if (data.length == 0) {
      res.status(404).send("ID no valido");
      return;
    }
    try {
      res.send(data);
    } catch (error) {
      res.json({ error: `Error al consultar la base de datos ${err}` });
    }
  });
};
export const getProductsByCategory = (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM products WHERE products.category_id = ?";

  db.query(query, [id], (err, data) => {
    if (data.length == 0) {
      res.status(404).send("La categoria no existe");
      return;
    }
    try {
      res.send(data);
    } catch (error) {
      res.json({ error: `Error al consultar la base de datos ${err}` });
    }
  });
};
export const createProduct = (req, res) => {
  const { name, description, price, stock, category_id } = req.body;
  const query =
    "INSERT INTO products (name, description, price, stock, category_id) VALUES (?, ?, ?, ?, ?)";
  db.query(
    query,
    [name, description, price, stock, category_id],
    (err, data) => {
      try {
        res.status(201).json({
          message: "Producto creado exitosamente",
          productId: data.insertId,
        });
      } catch (error) {
        return res
          .status(500)
          .json({ error: `Error al insertar el producto: ${error}` });
      }
    }
  );
};
export const updateProduct = (req, res) => {
  const id = req.params.id;
  const { name, description, price, stock, category_id } = req.body;

  const query =
    "UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category_id = ? where id = ?";

  db.query(
    query,
    [name, description, price, stock, category_id, id],
    (err, data) => {
      try {
        res.status(201).send(data);
      } catch (error) {
        res
          .status(500)
          .json({ error: `Error al actualizar la tarea ${error}` });
      }
    }
  );
};
export const deleteProduct = (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM products WHERE id = ?";

  db.query(query, [id], (err, data) => {
    if (id <= 0 || data.affectedRows === 0) {
      res.status(404).send("ID no valido o producto no encontrado");
      return;
    }
    try {
      res.status(200).send("Producto eliminado con exito");
    } catch (error) {
      res.status(500).json({ error: `Error al eliminar la tarea ${error}` });
    }
  });
};

