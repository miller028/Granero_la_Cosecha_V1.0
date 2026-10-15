import mysql from "mysql2/promise";
async function conectar() {
  try {
    const conexion = await mysql.createConnection({
      host: "localhost",
      database: "tiendaMiller",
      user: "root",
      password: "1234",
    });
    console.log("Conexion exitosa a base de datos MySQL");
    return conexion;
  } catch (error) {
    console.error("Error al conectar:", error);
  }
}
conectar();
export { conectar };
