import { db } from "../database/db.js";

// 🧩 2. 🧾 Categorías (/categories)✔️
// GET	/categories	Listar categorías✔️
// GET	/categories/:id	Obtener categoría por ID✔️
// POST	/categories	Crear categoría (admin)✔️
// PUT	/categories/:id	Actualizar categoría✔️
// DELETE	/categories/:id	Eliminar categoría✔️

export const getCategories = (req, res) => {
  const query = "SELECT * FROM categories";

  db.query(query, (err, data) => {
    try {
      res.status(201).send(data);
    } catch (error) {
      res.json({ error: `Error al consultar la base de datos ${err}` });
    }
  });
};
export const getCategory = (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM categories WHERE id = ?";

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
export const createCategory = (req, res) => {
  const { name } = req.body;
  const query = "INSERT INTO categories (name) VALUES (?)";

  if (!name) {
    return res
      .status(400)
      .json({ error: "El nombre de la categoría es requerido" });
  }

  db.query(query, [name], (err, data) => {
    try {
      res.status(201).json({
        message: "Categoría creada exitosamente",
        categoryId: data.insertId,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: `Error al insertar la categoría: ${error}` });
    }
  });
};
export const updateCategory = (req, res) => {
  const id = req.params.id;
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ error: "El nombre de la categoría es requerido" });
  }

  const query = "UPDATE categories SET name = ? WHERE id = ?";

  db.query(query, [name, id], (err, data) => {
    try {
      res.status(200).json({ message: "Categoría actualizada exitosamente" });
    } catch (error) {
      return res
        .status(500)
        .json({ error: `Error al actualizar la categoría: ${error}` });
    }
  });
};
export const deleteCategory = (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM categories WHERE id = ?";

  db.query(query, [id], (err, data) => {
    if (data.affectedRows === 0) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    try {
      res.status(200).json({ message: "Categoría eliminada exitosamente" });
    } catch (error) {
      return res
        .status(500)
        .json({ error: `Error al eliminar la categoría: ${error}` });
    }
  });
};
