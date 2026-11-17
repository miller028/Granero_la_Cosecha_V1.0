let obtenerUsuarios = async () => {
  try {
    // 1. Hacemos la petición fetch a la ruta de la API del backend
    let res = await fetch("http://localhost:4000/api/usuarios");
    let resultado = await res.json();

    // 2. Verificamos que la respuesta sea exitosa
    if (resultado.status === "ok") {
      let cuerpoTabla = document.getElementById("tablaDeUsuarios");
      cuerpoTabla.innerHTML = ""; // Limpiamos la tabla por seguridad

      // 3. Recorremos el arreglo de usuarios que viene en resultado.data
      resultado.data.forEach((user) => {
        let fila = `
                    <tr>
                        <td>${user.Id_usuario}</td>
                        <td>${user.Nombres}</td>
                        <td>${user.Apellidos}</td>
                        <td>${user.Correo}</td>
                        <td>${user.Password}</td>
                        <td>${user.Fecha_registro}</td>
                        <td>${user.Fecha_modificacion}</td>
                        <td class="text-center">
                            <a href="/editar/${user.Id_usuario}" class="btn btn-warning btn-sm">Actualizar</a>
                            <a href="/eliminar/${user.Id_usuario}" class="btn btn-danger btn-sm">Eliminar</a>
                        </td>
                    </tr>
                `;
        // Añadimos cada fila generada al cuerpo de la tabla en el HTML
        cuerpoTabla.innerHTML += fila;
      });
    } else {
      alert(resultado.message);
    }
  } catch (error) {
    console.error("Error al obtener y listar los usuarios:");
  }
};
// Aqui se se ejecuta al cargar la página usando await: ↓
document.addEventListener("DOMContentLoaded", async () => {
  await inicializarLaDataTable();
});
// Variable para almacenar los datos de la tabla: ↓
let datosTabla;
// Variable para saber si los datos de la tabla estan inicializados: ↓
let dataTableInicializada = false;

async function inicializarLaDataTable() {
  if (dataTableInicializada) {
    datosTabla.destroy();
  }
  await obtenerUsuarios();
  // Aqui se utiliza JQuery: ↓
  datosTabla = $("#dataTable").DataTable({});
  dataTableInicializada = true;
}
