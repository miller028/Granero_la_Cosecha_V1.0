// Importamos la funcion de conexion a la base de datos: ↓
import { conectar } from "../baseDeDatos/conexion.js";
import { error } from "console";
// importamos bcrypt para encriptar la contraseña: ↓
import bcrypt from "bcryptjs";
// importamos jsonwebtoken para generar token de autenticacion de usuario: ↓
import jsonwebtoken from "jsonwebtoken";
// importamos dotenv para cargar la variable de entorno de .env: ↓
import dotenv from "dotenv";
dotenv.config();
async function listarUsuarios(req, res) {
  async function iniciarProceso() {
    try {
      // 1. Obtenemos la conexión abierta usando await:↓
      let conexion = await conectar();
      // 2. Realiza la consulta de la tabla USUARIOS: ↓
      let query =
        "SELECT Id_usuario, Nombres, Apellidos, Correo, Contraseña AS Password, Fecha_registro, Fecha_modificacion FROM usuarios";
      let [resultado] = await conexion.execute(query);
      console.log(resultado);

      // Cerramos la conexión cuando se termine de usarla: ↓
      await conexion.end();
      // Enviamos la respuesta en formato JSON al frontend
      return res.status(200).json({
        status: "ok",
        message: "Usuarios listados exitosamente",
        data: resultado, // Aquí viaja todo el arreglo con los datos de la base de datos
      });
    } catch (error) {
      console.error("Error en el servidor:", error);
    }
  }
  // Ejecutamos la función principal
  iniciarProceso();
}
export let methods = {
  listarUsuarios,
};
