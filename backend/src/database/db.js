import mysql2 from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql2.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // port: process.env.DB_PORT
});

db.connect((err) => {
  if (err) {
    console.error("❌ Error de conexión:", err);
    process.exit(1);
  }
  console.log("✅ Conexión a la base de datos exitosa");
});