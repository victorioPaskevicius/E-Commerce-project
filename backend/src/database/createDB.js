import mysql2 from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const connection = mysql2.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  multipleStatements: true, // importante para ejecutar varias consultas
});

const initQuery = `
  CREATE DATABASE IF NOT EXISTS ecommerce_db;
  USE ecommerce_db;

  CREATE TABLE IF NOT EXISTS roles (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(50) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role_id INT,
      FOREIGN KEY (role_id) REFERENCES roles(id)
  );

  CREATE TABLE IF NOT EXISTS categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description TEXT,
      price DECIMAL(10,2) NOT NULL,
      stock INT NOT NULL,
      category_id INT,
      FOREIGN KEY (category_id) REFERENCES categories(id)
  );

  CREATE TABLE IF NOT EXISTS orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      status VARCHAR(50) DEFAULT 'pendiente',
      FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS order_items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      order_id INT,
      product_id INT,
      quantity INT NOT NULL,
      price_at_time DECIMAL(10,2) NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
  );
`;

connection.connect((err) => {
  if (err) {
    console.error("❌ Error de conexión:", err);
    return;
  }

  connection.query(initQuery, (err, results) => {
    if (err) {
      console.error("❌ Error ejecutando script SQL:", err);
    } else {
      console.log("✅ Base de datos y tablas creadas correctamente");
    }

    connection.end();
  });
});