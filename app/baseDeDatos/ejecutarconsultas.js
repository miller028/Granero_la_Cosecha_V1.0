import { conectar } from "./conexion.js";

async function iniciarProceso() {
  try {
    // 1. Obtenemos la conexión abierta usando await:↓
    const conexion = await conectar();

    const nuevoUsuario = {
      Nombres: "Angie Lucero",
      Apellidos: "lopez Mora",
      Correo: "anguieluceroL@gmail.com",
      Contrasena: "1234",
    };

    const query =
      "INSERT INTO USUARIOS (Nombres, Apellidos, Correo, Contraseña) VALUES (?, ?, ?, ?)";

    // 2. Ejecutamos el query con await (con mysql2/promise ya no necesitas los callbacks tradicionales)
    const [resultado] = await conexion.execute(query, [
      nuevoUsuario.Nombres,
      nuevoUsuario.Apellidos,
      nuevoUsuario.Correo,
      nuevoUsuario.Contrasena,
    ]);
    console.log("¡Usuario insertado con éxito! ID:");

    // 3. Cerramos la conexión cuando termines de usarla: ↓
    await conexion.end();
  } catch (error) {
    console.error("Hubo un error en el proceso:", error);
  }
}
iniciarProceso();
