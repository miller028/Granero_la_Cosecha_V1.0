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
async function ingresarSistema(req, res) {}
async function registroSistema(req, res) {
  console.log(req.body);
  let nombres = req.body.nombres;
  let apellidos = req.body.apellidos;
  let correo = req.body.correo;
  let contrasena = req.body.contrasena;
  // Validacion de campos no vacios: ↓
  if (!nombres || !apellidos || !correo || !contrasena) {
    // Mensaje de error si los campos estan vacios que se envia al frontend: ↓
    return res.status(400).json({
      success: false,
      message: "Los campos están incompletos",
    });
  }
  // Validacion de correo de usuario en base de datos que no exista para su registro: ↓
  let usuarioaVerificar = usuarios.find((usuario) => usuario.correo === correo);
  if (usuarioaVerificar) {
    // Mensaje de correo ya existe: ↓
    return (res = console.log("Este usuario ya existe"));
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
  (console.log(nuevoUsuario), usuarios.push(nuevoUsuario));
  // Mensaje de usuario agregado: ↓
  /*eturn res
    .status(201)
    .send({ message: `Usuario ${nuevoUsuario.correo} agregado` });
    */

  // Insertar usuario en base de datos MySQL: ↓
  async function iniciarProceso() {
    try {
      // 1. Obtenemos la conexión abierta usando await:↓
      const conexion = await conectar();
      const query =
        "INSERT INTO USUARIOS (Nombres, Apellidos, Correo, Contraseña) VALUES (?, ?, ?, ?)";

      // 2. Ejecutamos el query con await (con mysql2/promise ya no necesitas los callbacks tradicionales)
      const [resultado] = await conexion.execute(query, [
        nuevoUsuario.nombres,
        nuevoUsuario.apellidos,
        nuevoUsuario.correo,
        nuevoUsuario.contrasena,
      ]);
      console.log("¡Usuario insertado con éxito! ID:");

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
  ingresarSistema,
  registroSistema,
};
