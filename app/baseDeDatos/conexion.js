import mysql from "mysql2/promise";
async function conectar() {
  try {
    const conexion = await mysql.createConnection({
      host: "tiendamiller.cs7maoe2y8sf.us-east-1.rds.amazonaws.com",
      database: "tiendaMiller",
      user: "admin",
      password: "9Vp3tm5ZjT",
      port: 3306,
    });
    console.log("Conexion exitosa a base de datos MySQL");
    return conexion;
  } catch (error) {
    console.error("Error al conectar:", error);
  }
}
conectar();
export { conectar };
