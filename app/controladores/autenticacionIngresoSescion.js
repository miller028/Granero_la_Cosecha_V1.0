// Importamos la funcion de conexion a la base de datos: ↓
import { conectar } from "../baseDeDatos/conexion.js";
import { error } from "console";
// Libreria para encriptar contraseñas:↓
import bcryptjs from "bcryptjs";
/* Prueba de usuario sin usar Mysql: ↓
const usuarios = [
  {
    correo: "millersalas028@gmail.com",
    contrsena: "1234",
  },
];
*/
async function registroSistema(req, res) {
  console.log(req.body);
  let nombres = req.body.nombres;
  let apellidos = req.body.apellidos;
  let correo = req.body.correo;
  let contrasena = req.body.contrasena;
  // Validacion de campos vacios: ↓
  if (!nombres && !apellidos && !correo && !contrasena) {
    // Mensaje de error si los campos estan vacios que se envia al frontend: ↓
    return res.status(400).json({
      success: false,
      message:
        "Los campos de Nombre, Apelllidos, Correo y Contraseña estan vacios",
    });
  } else if (!nombres) {
    return res.status(400).json({
      success: false,
      message: "El campo Nombres esta vacio",
    });
  } else if (!apellidos) {
    return res.status(400).json({
      success: false,
      message: "El campo Apellidos esta vacio",
    });
  } else if (!correo) {
    return res.status(400).json({
      success: false,
      message: "El campo Correo esta vacio",
    });
  } else if (!contrasena) {
    return res.status(400).json({
      success: false,
      message: "El campo Contraseña esta vacio",
    });
  }
  // Validacion de correo de usuario en base de datos que no exista para su registro: ↓
  const conexion = await conectar();
  let query = "SELECT * FROM usuarios WHERE Correo = ?";
  let [usuarioaVerificar] = await conexion.execute(query, [correo]);
  if (usuarioaVerificar.length > 0) {
    // Mensaje de correo ya existe: ↓
    return res.status(400).json({
      success: false,
      message: `El usuario ${correo} ya existe con este correo.`,
    });
  }
  // Encriptar la contraseña original 5 veces
  let salt = await bcryptjs.genSalt(5);
  let nuevaConstrasenaCliente = await bcryptjs.hash(contrasena, salt);
  let nuevoUsuario = {
    nombres,
    apellidos,
    correo,
    contrasena: nuevaConstrasenaCliente,
  };
  // Insertar usuario en base de datos MySQL: ↓
  async function iniciarProceso() {
    try {
      // 1. Obtenemos la conexión abierta usando await:↓
      const conexion = await conectar();
      const query =
        "INSERT INTO usuarios (Nombres, Apellidos, Correo, Contraseña) VALUES (?, ?, ?, ?)";

      // 2. Ejecutamos el query con await (con mysql2/promise ya no necesitas los callbacks tradicionales)
      const [resultado] = await conexion.execute(query, [
        nuevoUsuario.nombres,
        nuevoUsuario.apellidos,
        nuevoUsuario.correo,
        nuevoUsuario.contrasena,
      ]);
      console.log("¡Usuario insertado con éxito! ID:");
      // Mensaje de usuario registrado con exito: ↓
      return res.status(400).json({
        success: false,
        message: `Usuario registrado con exito.`,
      });

      // 3. Cerramos la conexión cuando termines de usarla: ↓
      await conexion.end();
    } catch (error) {
      console.error("Hubo un error en el proceso:", error);
    }
  }
  // Ejecutamos la función principal
  iniciarProceso();
}
export let methods = {
  registroSistema,
};
