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
async function ingresar(req, res) {
  console.log(req.body);
  let correo = req.body.correo;
  let contrasena = String(req.body.contrasena);
  // Validacion de campos no vacios: ↓
  if (!correo && !contrasena) {
    // Mensaje de error si los campos estan vacios que se envia al frontend: ↓
    return res.status(400).json({
      success: false,
      message: "Los campos de Correo y Contraseña estan vacios",
    });
  }
  // Si los campos no estan vacios: ↓
  async function iniciarProceso() {
    try {
      // 1. Obtenemos la conexión abierta usando await:↓
      let conexion = await conectar();
      // 2. Realiza la consulta si el correo ya existe en la tabla USUARIOS: ↓
      let query =
        "SELECT  Id_usuario, Correo, Contraseña AS password FROM usuarios WHERE Correo = ?";
      let [resultado] = await conexion.execute(query, [correo]);
      //3.  Validacion si el correo existe: ↓
      if (resultado.length > 0) {
        //5. Guardamos el resultado en una nueva variable: ↓
        let usuarioEncontrado = resultado[0].password;
        let idUsuario = resultado[0].Id_usuario; // Captura del Id del usuario
        console.log("El Id del usuario es: " + idUsuario);
        //6. Validar contraseñas iguales: ↓
        let contrasenaValida = await bcrypt.compare(
          contrasena,
          usuarioEncontrado,
        );
        if (!contrasenaValida) {
          return res.status(400).json({
            success: false,
            message: "La contraseña es incorrecta.",
          });
        } else {
          // GUARDAS EL ID EN LA SESIÓN AQUÍ
          req.session.idUsuario = idUsuario;
          // 💡 Añade este console.log aquí mismo para verificar en la terminal:
          console.log(
            "--> ¡ID guardado exitosamente en la sesión:",
            req.session.idUsuario,
          );
          //8. Autenticacion mediante tokens: ↓
          let generarToken = jsonwebtoken.sign(
            { correo: correo },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_TIEMPO_DE_EXPIRACION },
          );
          // 9. Creacion de una cookies: ↓
          let cookieOpcion = {
            expires: new Date(
              Date.now() + process.env.JWT_COOKIE_EXPIRACION * 1000,
            ), // 24*60*100 es igual a 1 dia
            path: "/",
          };
          // Mensaje al cliente de la cookie
          console.log(generarToken);
          res.cookie("JWT", generarToken, cookieOpcion);
          return res.status(200).json({
            status: "ok",
            message: "¡Inicio de sesión exitoso!",
            redirect: "/usuario",
          });
          /*return res.status(200).json({
            status: "Ok",
            message: "¡Inicio de sesión exitoso!",
            redirect: "/admin",
            //token: token,
          });*/
        }
      }
      //4. Si no existe el correo en la base de datos: ↓
      return res.status(404).json({
        success: false,
        message: `error durante login → correo ${correo} no existe. `,
      });
      //8. Cerramos la conexión cuando se termine de usarla: ↓
      await conexion.end();
    } catch (error) {
      console.error("Error en el servidor:", error);
    }
  }
  //9. Ejecutamos la función principal
  iniciarProceso();
}
export let methods = {
  ingresar,
};
