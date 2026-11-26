// Importamos la funcion de conexion a la base de datos: ↓
import { conectar } from "../baseDeDatos/conexion.js";
async function mostrarPerfil(req, res) {
  try {
    let idUsuario = req.session.idUsuario;
    if (!idUsuario) {
      return res.redirect("/");
    }

    let conexion = await conectar();
    let [rows] = await conexion.query(
      `SELECT 
         u.Id_usuario,
         u.Nombres,
         u.Apellidos,
         p.Cedula,
         DATE_FORMAT(p.Fecha_nacimiento, '%Y-%m-%d') AS Fecha_nacimiento,
         p.Telefono,
         p.Barrio,
         p.Nomenclatura,
         p.Foto_url
       FROM usuarios u
       LEFT JOIN perfiles_usuario p ON u.Id_usuario = p.Id_usuario
       WHERE u.Id_usuario = ?`,
      [idUsuario],
    );
    await conexion.end();

    if (rows.length > 0) {
      let usuario = rows[0];
      res.render("usuario/perfilUsuario", { usuario });
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.error("Error al cargar el perfil:", error);
    res.status(500).send("Error en el servidor");
  }
}
export let methods = {
  mostrarPerfil,
};
