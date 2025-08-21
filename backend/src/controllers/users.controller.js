import { db } from "../database/db.js";
import jwt from "jsonwebtoken";

// 🧩 3. 👤 Usuarios (/users)
// GET	/users	Obtener todos los usuarios (admin)✔️
// GET	/users/:id	Obtener un usuario✔️
// POST	/users	Crear nuevo usuario (registro manual o por admin)✔️
// PUT	/users/:id	Editar usuario✔️
// DELETE	/users/:id	Eliminar usuario✔️

export const getUsers = (req, res) => {
  const query = "SELECT * FROM users";

  db.query(query, (err, data) => {
    if (err) {
      console.error("Error al obtener usuarios:", err);
      return res.status(500).json({
        message: "Error del servidor al intentar extraer los usuarios",
      });
    }
    res.status(200).json(data);
  });
};

export const getUser = (req, res) => {
  const id = parseInt(req.params.id);
  const query = "SELECT * FROM users WHERE id = ?";

  db.query(query, [id], (err, data) => {
    if (err) {
      console.error("Error al buscar usuario:", err);
      return res.status(500).json({ message: "Error del servidor" });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(data[0]);
  });
};

export const getUserLogin = (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(query, [email, password], (err, data) => {
    if (err) {
      res.status(500).json({ message: "Error del servidor" });
      return console.log({ "Error del servidor": err });
    }
    if (data.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    let username = data[0].name;
    let id = data[0].id
    const token = jwt.sign({ id,username, email }, "stack", {
      expiresIn: "30m",
    });

    return res.status(201).json({
      token
    });
  });
};

export const createUserRegister = (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios." });
  }

  // Primero, verificamos si el email ya existe
  const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkEmailQuery, [email], (err, data) => {
    if (err) {
      console.error("Error al verificar el email:", err);
      return res
        .status(500)
        .json({ message: "Error en el servidor al verificar el correo." });
    }

    if (data.length > 0) {
      return res.status(409).json({ message: "El correo ya está registrado." });
    }

    // Si no existe, se inserta el nuevo usuario
    const role_id = 2;
    const insertQuery =
      "INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)";

    db.query(
      insertQuery,
      [username, email, password, role_id],
      (err, data) => {
        if (err) {
          console.error("Error al insertar usuario:", err);
          return res
            .status(500)
            .json({ message: "Error al insertar datos del usuario" });
        }

        let id = data.insertId
        let token = jwt.sign({ id,username,email }, "stack", {
          expiresIn: "30m"
        })

        res.status(201).json({
          token,
        });
      }
    );
  });
};

export const updateUser = (req, res) => {
  const id = req.params.id;
  const { username } = req.body;

  if (!id) return res.status(400).json({ error: "ID no proporcionado" });
  if (!username || username.length < 6) {
    return res
      .status(400)
      .json({ error: "El nombre debe tener al menos 6 caracteres" });
  }

  const query = "UPDATE users SET name = ? WHERE id = ?";
  db.query(query, [username, id], (err, result) => {
    if (err) {
      console.error("Error al actualizar usuario:", err);
      return res.status(500).json({ error: "Error del servidor" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Usuario actualizado con éxito" });
  });
};

export const deleteUser = (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM users WHERE id = ?";

  db.query(query, [id], (err, data) => {
    if (err) {
      console.error({ "Error en el servidor:": err });
      return res
        .status(500)
        .json({ Error: "Ha ocurrido un error en el servidor" });
    }
    if (data.affectedRows == 0) {
      return res
        .status(404)
        .json({ message: "El usuario que se intenta eliminar no existe" });
    }

    return res.status(201).send("Usuario eliminado con exito");
  });
};
