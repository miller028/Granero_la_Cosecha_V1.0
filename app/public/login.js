document.getElementById("login").addEventListener("submit", async (e) => {
  e.preventDefault(); // Para que no se recarge la pagina
  // console.log(e.target.querySelector("[id=correo]").value);
  //Aqui capturamos los datos del formulario inicio de sesion: ↓↓
  let res = await fetch("/api/login", {
    // Para que funcione en el movil "/api/login" ↑↑
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      correo: e.target.querySelector("[id=correo]").value,
      contrasena: e.target.querySelector("[id=password]").value,
    }),
  });
  let resultado = await res.json();
  // Aquí es donde hacemos la redirección real al /admin
  if (resultado.status === "ok") {
    alert(resultado.message); // Esto abrirá una alerta de diálogo con "Inicio de sesion exitoso"
    if (resultado.redirect) {
      window.location.href = resultado.redirect;
    }
  } else {
    // Aquí muestras la alerta cuanto es true: ↓
    alert(resultado.message); // Esto abrirá una alerta de diálogo
    setingresar(resultado.message); // Esto abrirá una alerta de diálogo
  }
});
