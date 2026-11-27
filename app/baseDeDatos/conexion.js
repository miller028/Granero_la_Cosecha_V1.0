import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
// Resuelve la ruta hacia LOGIN/.env sin importar desde qué carpeta ejecutes Node: ↓
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
async function conectar() {
  try {
    const conexion = await mysql.createConnection({
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT) || 3306,
    });
    console.log("Conexion exitosa a base de datos MySQL");
    return conexion;
  } catch (error) {
    console.error("Error al conectar:", error);
  }
}
conectar();
export { conectar };
