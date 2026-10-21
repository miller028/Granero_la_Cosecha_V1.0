document
  .getElementById("recuperarPassword")
  .addEventListener("submit", async (e) => {
    e.preventDefault(); // Para que no se recarge la pagina
    // console.log(e.target.querySelector("[id=correo]").value);
    //Aqui capturamos los datos del formulario inicio de sesion: ↓↓
    let res = await fetch("http://localhost:4000/api/recuperarPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correo: e.target.querySelector("[id=correo]").value,
      }),
    });
    let resultado = await res.json();
    if (!resultado.success) {
      // Aquí muestras la alerta en el navegador que envia el backend al usuario
      alert(resultado.message); // Esto abrirá una alerta de diálogo con "!Tu contraseña ha sido enviada con exito al correo suministrado!. Por favor, revisa su correo"
    }
  });
