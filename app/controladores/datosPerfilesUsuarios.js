import { conectar } from "../baseDeDatos/conexion.js";
async function datosPerfilesUsuarios(req, res) {
  console.log(req.body);
  let nombres = req.body.nombres;
  let apellidos = req.body.apellidos;
  let cedula = req.body.cedula;
  let fechaNacimiento = req.body.fechaNacimiento;
  let telefono = req.body.telefono;
  let barrio = req.body.barrio;
  let nomenclatura = req.body.nomenclatura;
  // 1. Verificar que Multer haya recibido el archivo y armar la URL pública: ↓
  if (!req.file) {
    return res
      .status(400)
      .json({ status: "error", message: "La foto de perfil es obligatoria" });
  }
  let fotoUrl = `/fotosUsuario/${req.file.filename}`;
  //2  Validacion de campos vacios: ↓
  let camposVacios = [
    nombres,
    apellidos,
    cedula,
    fechaNacimiento,
    telefono,
    barrio,
    nomenclatura,
  ].some((campo) => !campo || String(campo).trim() === "");
  if (camposVacios) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }
  // 3. Insertar datos de usuario en la tabla perfiles_Usuario MySQL: ↓
  async function iniciarProceso() {
    try {
      // 4. Se invoca al Id_usuario de la tabla usuaios: ↓
      let idUsuario = req.session.idUsuario;
      if (!idUsuario) {
        return res
          .status(401)
          .json({ status: "error", message: "No hay sesión activa" });
      }
      // 5. Obtenemos la conexión abierta usando await:↓
      let conexion = await conectar();
      // Actualizamos también nombres y apellidos en la tabla usuarios
      await conexion.execute(
        "UPDATE usuarios SET Nombres = ?, Apellidos = ? WHERE Id_usuario = ?",
        [nombres, apellidos, idUsuario],
      );
      // Verificamos si el usuario ya tiene un perfil creado
      let [perfilExistente] = await conexion.execute(
        "SELECT Id_perfilUsuario, Foto_url FROM perfiles_usuario WHERE Id_usuario = ?",
        [idUsuario],
      );
      if (perfilExistente.length > 0) {
        // Si ya existe perfil, actualizamos (si no subió foto nueva, conserva la anterior)
        let fotoFinal = req.file
          ? `/fotosUsuario/${req.file.filename}`
          : perfilExistente[0].Foto_url;

        await conexion.execute(
          `UPDATE perfiles_usuario 
         SET Cedula = ?, Fecha_nacimiento = ?, Telefono = ?, Barrio = ?, Nomenclatura = ?, Foto_url = ?, Fecha_modificacion = (UTC_TIMESTAMP() - INTERVAL 5 HOUR)
         WHERE Id_usuario = ?`,
          [
            cedula,
            fechaNacimiento,
            telefono,
            barrio,
            nomenclatura,
            fotoFinal,
            idUsuario,
          ],
        );
      } else {
        // Si es la primera vez que guarda, exige la foto e inserta
        if (!req.file) {
          return res.status(400).json({
            status: "error",
            message: "La foto de perfil es obligatoria",
          });
        }
        let fotoUrl = `/fotosUsuario/${req.file.filename}`;

        let query =
          "INSERT INTO perfiles_usuario (Id_usuario, Cedula, Fecha_nacimiento, Telefono, Barrio, Nomenclatura, Foto_url) VALUES (?, ?, ?, ?, ?, ?, ?)";
        // 6. Ejecutamos el query con await (con mysql2/promise ya no necesitas los callbacks tradicionales)
        let [resultado] = await conexion.execute(query, [
          idUsuario,
          cedula,
          fechaNacimiento,
          telefono,
          barrio,
          nomenclatura,
          fotoUrl, // Se guarda en la ruta "/fotosUsuario/perfil-1-173240....jpg"
        ]);
        console.log("¡Perfil insertado con éxito! ID:", resultado.insertId);
        return res.status(200).json({
          status: "ok",
          message: `Perfil guardado con exito.`,
          insertId: resultado.insertId,
        });
        // 7. Cerramos la conexión cuando termines de usarla: ↓
        await conexion.end();
      }
    } catch (error) {
      console.error("Error al instertar perfil:", error);
      return res.status(500).json({
        status: "error",
        message: "Error interno del servidor",
      });
    }
  }
  // Ejecutamos la función principal
  iniciarProceso();
}
export let methods = {
  datosPerfilesUsuarios,
};
