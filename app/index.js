import session from "express-session"; // <-- 1. Importa express-session aquí
import express from "express";
//fix para __dirname:
import path from "path";
import { fileURLToPath } from "url";
let __dirname = path.dirname(fileURLToPath(import.meta.url));
//Importarmos los controladores: ↓
import { methods as authentication } from "./controladores/autenticacionIngresoSescion.js";
import { methods as recuperacionContrasena } from "./controladores/recuperacionPassword.js";
import { methods as ingresar } from "./controladores/ingresoSistema.js";
import { methods as listar } from "./controladores/listarUsuarios.js";
import { methods as datosPerfilesUsuarios } from "./controladores/datosPerfilesUsuarios.js";
import { methods as mostrarDatosDeUsuario } from "./controladores/mostrarDatosDeUsuario.js";
import { methods as fotosUsuario } from "./controladores/fotosUsuario.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

//Servidor:
let app = express();
app.set("port", 4000);
app.listen(app.get("port"), "0.0.0.0", () => {
  console.log("Servidor corriendo en puerto", app.get("port"));
});

// Configuracion:
app.use(express.json());
app.use(cookieParser());
app.set("view engine", "ejs"); // Paginas para renderizar.
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/estilos"));
app.use(
  session({
    secret: "clave_secreta_para_tu_proyecto",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  }),
);
app.use("/fotosUsuario", fotosUsuario.servirFotos);
//Rutas: ↓
app.get("/", (req, res) => res.sendFile(__dirname + "/paginas/login.html")); // Formulario principal
app.get("/registro", (req, res) =>
  res.sendFile(__dirname + "/paginas/registrologin.html"),
); // Formulario de registro
app.get("/recuperarPassword", (req, res) =>
  res.sendFile(__dirname + "/paginas/recuperarPassword.html"),
); // Formulario de recuperacion de contraseña
// Funciónes Middleware para verificar el token de la cookie: ↓
function verificarToken(req, res, next) {
  let token = req.cookies.JWT; // Lee la cookie que guardas al iniciar sesión
  if (!token) {
    return res.redirect("/"); // Si no hay token, redirige al login
  }
  try {
    let verificado = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verificado;
    next(); // Token válido, permite avanzar
  } catch (error) {
    console.log("Error detallado al verificar token:", error.message);
    return res.redirect("/"); // Token falso o expirado, al login
  }
}
// Renderizados de pagina de rol administrador: ↓
app.get("/admin", verificarToken, (req, res) => {
  res.render("administrador/principal");
}); // Pagina de rol Administrador
app.get("/usuariosRegistrados", (req, res) => {
  res.render("administrador/usuariosRegistrados");
}); // Pagina de Usuarios registrados
app.get("/usuario", verificarToken, (req, res) => {
  res.render("usuario/usuario");
}); // Pagina de rol de usuario

// Metodos de peticiones a node js: ↓
app.post("/api/login", ingresar.ingresar);
app.post("/api/registro", authentication.registroSistema);
app.post(
  "/api/recuperarPassword",
  recuperacionContrasena.recuperacionContrasena,
);
app.get("/api/usuarios", listar.listarUsuarios);
app.post(
  "/api/perfilUsuario",
  fotosUsuario.actualizar.single("foto"),
  datosPerfilesUsuarios.datosPerfilesUsuarios,
);
app.get("/editarPerfil", mostrarDatosDeUsuario.mostrarPerfil); // Formulario de editar perfil
