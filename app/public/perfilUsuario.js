document
  .getElementById("datosUsuario")
  .addEventListener("submit", async (e) => {
    e.preventDefault(); // Para que no se recarge la pagina
    // console.log(e.target.querySelector("[id=correo]").value);
    // FormData captura automáticamente todos los inputs y el archivo binario
    let formData = new FormData();
    formData.append("nombres", document.getElementById("nombres").value);
    formData.append("apellidos", document.getElementById("apellidos").value);
    formData.append("cedula", document.getElementById("cedula").value);
    formData.append(
      "fechaNacimiento",
      document.getElementById("fechaNacimiento").value,
    );
    formData.append("telefono", document.getElementById("telefono").value);
    formData.append("barrio", document.getElementById("barrio").value);
    formData.append(
      "nomenclatura",
      document.getElementById("nomenclatura").value,
    );

    const inputFoto = document.getElementById("foto");
    if (inputFoto.files.length > 0) {
      formData.append("foto", inputFoto.files[0]);
    }
    //Aqui capturamos los datos del formulario inicio de sesion: ↓↓
    let res = await fetch("/api/perfilUsuario", {
      // Para que funcione en el movil "/api/login" ↑↑
      method: "POST",
      body: formData, // Se envia como multipart/form-data
    });
    let resultado = await res.json();
    // Aquí es donde hacemos la redirección real al /admin
    if (resultado.status === "ok") {
      alert(resultado.message);
      if (resultado.redirect) {
        window.location.href = resultado.redirect;
      }
    } else {
      // Aquí muestras la alerta cuanto es true: ↓
      alert(resultado.message || resultado.error); // Esto abrirá una alerta de diálogo
      //setingresar(resultado.message); // Esto abrirá una alerta de diálogo
    }
  });
