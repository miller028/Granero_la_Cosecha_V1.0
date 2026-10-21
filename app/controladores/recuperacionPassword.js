// Importamos la funcion de conexion a la base de datos: ↓
import { conectar } from "../baseDeDatos/conexion.js";
import { error } from "console";
export async function recuperacionContrasena(req, res) {
  console.log(req.body);
  let correo = req.body.correo;
  // Validacion de campos no vacios: ↓
  if (!correo) {
    // Mensaje de error si los campos estan vacios que se envia al frontend: ↓
    return res.status(400).json({
      success: false,
      message:
        "!Uups los campos estan vacios!. Por favor ingresa un correo valido",
    });
  }
  // Consultar usuario registrado en base de datos MySQL: ↓
  async function iniciarProceso() {
    try {
      // 1. Obtenemos la conexión abierta usando await:↓
      let conexion = await conectar();
      // 2. Realiza la consulta si el correo ya existe en la tabla USUARIOS: ↓
      let query = "SELECT * FROM USUARIOS WHERE Correo = ?";
      let [resultado] = await conexion.execute(query, [correo]);
      //3.  Validacion si el correo existe: ↓
      if (resultado.length > 0) {
        // Mensaje informativo de envio decontraseña al correo: ↓
        return res.status(400).json({
          success: false,
          message: `¡Listo! Se ha enviado la información de tu contraseña al correo electrónico ${correo}`,
        });
      }
      // El correo NO está registrado (disponible)

      // Si no existe el usuario en la base de datos: ↓
      return res.status(400).json({
        success: false,
        message: `El correo electrónico ${correo} no se existe en nuestra base de datos. Si no tiene una cuenta, lo invitamos a registrarse.`,
      });
      //5. Cerramos la conexión cuando termines de usarla: ↓
      await conexion.end();
    } catch (error) {
      //console.error("Hubo un error en el proceso:", error);
    }
  }
  // Ejecutamos la función principal
  iniciarProceso();
}
export const methods = {
  recuperacionContrasena,
};
