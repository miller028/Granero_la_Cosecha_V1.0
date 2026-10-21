import express from "express";
//fix para __dirname:
import path from "path";
import { fileURLToPath } from "url";
let __dirname = path.dirname(fileURLToPath(import.meta.url));
//Importarmos los controladores: ↓
import { methods as authentication } from "./controladores/autenticacionIngresoSescion.js";
import { methods as recuperacionContrasena } from "./controladores/recuperacionPassword.js";

//Servidor:
let app = express();
app.set("port", 4000);
app.listen(app.get("port"));
console.log("Servidor corriendo en puerto", app.get("port"));

// Configuracion:
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/estilos"));
app.use(express.static(__dirname + "/baseDeDatos"));

app.use(express.json());

//Rutas:
app.get("/", (req, res) => res.sendFile(__dirname + "/paginas/Login.html")); // Formulario principal
app.get("/registro", (req, res) =>
  res.sendFile(__dirname + "/paginas/registrologin.html"),
); // Formulario de registro
app.get("/recuperarPassword", (req, res) =>
  res.sendFile(__dirname + "/paginas/recuperarPassword.html"),
); // Formulario de recuperacion de contraseña
app.get("/usuario", (req, res) =>
  res.sendFile(__dirname + "/paginas/admin/usuario.html"),
);
app.post("/api/login", authentication.ingresarSistema);
app.post("/api/registro", authentication.registroSistema);
app.post(
  "/api/recuperarPassword",
  recuperacionContrasena.recuperacionContrasena,
);
