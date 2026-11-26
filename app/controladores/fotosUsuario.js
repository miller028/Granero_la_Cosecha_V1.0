// Importamos la funcion de conexion a la base de datos: ↓
import { conectar } from "../baseDeDatos/conexion.js";
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

let __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);

// 1. Definir y crear la carpeta automáticamente si no existe (subiendo un nivel desde controladores)
let carpetaFotos = path.join(__dirname, "..", "archivos", "fotosUsuario");
if (!fs.existsSync(carpetaFotos)) {
  fs.mkdirSync(carpetaFotos, { recursive: true });
}

// 2. Middleware para servir las fotos estáticas
let servirFotos = express.static(carpetaFotos);

// 3. Configuración de Multer
let almacenamiento = multer.diskStorage({
  destination: (req, file, cb) => cb(null, carpetaFotos),
  filename: (req, file, cb) => {
    let ext = path.extname(file.originalname).toLowerCase();
    let idUsuario = req.session.idUsuario || "user";
    cb(null, `perfil-${idUsuario}-${Date.now()}${ext}`);
  },
});

let actualizar = multer({
  storage: almacenamiento,
  limits: { fileSize: 5 * 1024 * 1024 }, // Máximo 5 MB
  fileFilter: (req, file, cb) => {
    let permitidos = ["image/jpeg", "image/jpg", "image/png"];
    if (permitidos.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Formato de imagen no válido"), false);
    }
  },
});
export let methods = { servirFotos, actualizar };
