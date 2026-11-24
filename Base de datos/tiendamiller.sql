-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: tiendamiller
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `Id_categoria` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(30) NOT NULL,
  `Descripcion` text,
  `Icono` varchar(50) DEFAULT 'fa-box',
  `Estado` tinyint(1) DEFAULT '1',
  `Fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_categoria`),
  UNIQUE KEY `Nombres` (`Nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Aceites y salsas','Aceites de cocina, salsa de tomate, mayonesa, mostaza y aderezos','fa-bottle-droplet',1,'2026-10-29 21:03:26'),(2,'Aseo del hogar','Detergentes, blanqueador, desinfectantes, esponjas y escobas','fa-broom',1,'2026-10-29 21:03:26'),(3,'Bebidas alcohólicas','Cervezas, aguardiente, rones, vinos y aperitivos','fa-wine-bottle',1,'2026-10-29 21:03:26'),(4,'Bebidas en polvo','Chocolate de mesa, café soluble, jugos en polvo y malteadas','fa-mug-hot',1,'2026-10-29 21:03:26'),(5,'Bebidas no alcohólicas','Gaseosas, jugos en caja, maltas, energizantes y agua embotellada','fa-bottle-water',1,'2026-10-29 21:03:26'),(6,'Carnes','Carne de res, cerdo, pollo y otras proteínas frescas','fa-drumstick-bite',1,'2026-10-29 21:03:26'),(7,'Confitería','Chocolates, caramelos, chicles, bombones y golosinas','fa-candy-cane',1,'2026-10-29 21:03:26'),(8,'Cuidado personal','Jabón de baño, crema dental, desodorante y papel higiénico','fa-pump-soap',1,'2026-10-29 21:03:26'),(9,'Embutidos','Jamón, salchichas, chorizo, mortadela y salchichón','fa-hotdog',1,'2026-10-29 21:03:26'),(10,'Endulzantes y repostería','Azúcar, panela, gelatina, polvo para hornear, flanes y esencias','fa-cake-candles',1,'2026-10-29 21:03:26'),(11,'Enlatados y envasados','Atún, sardinas, maíz tierno, granos enlatados y envasados','fa-boxes-stacked',1,'2026-10-29 21:03:26'),(12,'Granos y semillas','Arroz, frijol, lenteja, maíz, chía y semillas','fa-wheat-awn',1,'2026-10-29 21:03:26'),(13,'Harinas y repostería','Harina de trigo, harina de maíz, avena, azúcar, sal, pastas para sopa, espaguetis, galletas saladas y de dulce ','fa-bowl-food',1,'2026-10-29 21:03:26'),(14,'Lácteos','Leche, quesos, suero, crema de leche, yogur y mantequilla','fa-cheese',1,'2026-10-29 21:03:26'),(15,'Papelería','Cuadernos, lapiceros, marcadores y útiles escolares básicos','fa-pen-clip',1,'2026-10-29 21:03:26'),(16,'Pasabocas','Papas fritas, chicharrones, platanitos, nachos y snacks','fa-cookie-bite',1,'2026-10-29 21:03:26');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `Codigo_barras` varchar(100) DEFAULT NULL,
  `Nombre` varchar(150) NOT NULL,
  `Descripcion` text,
  `Id_categoria` int DEFAULT NULL,
  `Id_proveedor` int DEFAULT NULL,
  `Precio_compra` decimal(10,2) NOT NULL,
  `Precio_venta` decimal(10,2) NOT NULL,
  `Strok` decimal(10,2) NOT NULL DEFAULT '0.00',
  `Stock_minimo` decimal(10,2) NOT NULL DEFAULT '5.00',
  `Unidad` enum('unidad','kg','lb','litro','paquete') DEFAULT 'unidad',
  `Estado` tinyint(1) DEFAULT '1',
  `fecha_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_producto`),
  UNIQUE KEY `Codigo_barras` (`Codigo_barras`),
  KEY `fk_producto_categoria` (`Id_categoria`),
  KEY `fk_producto_proveedor` (`Id_proveedor`),
  CONSTRAINT `fk_producto_categoria` FOREIGN KEY (`Id_categoria`) REFERENCES `categorias` (`Id_categoria`) ON UPDATE CASCADE,
  CONSTRAINT `fk_producto_proveedor` FOREIGN KEY (`Id_proveedor`) REFERENCES `proveedores` (`id_proveedor`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedores`
--

DROP TABLE IF EXISTS `proveedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedores` (
  `id_proveedor` int NOT NULL AUTO_INCREMENT,
  `Nombre_empresa` varchar(100) NOT NULL,
  `Nit_empresa` varchar(15) NOT NULL,
  `Direccion_empresa` varchar(100) DEFAULT NULL,
  `Nombre_contacto` varchar(50) DEFAULT NULL,
  `Telefono_contacto` varchar(30) NOT NULL,
  `Correo_empresa` varchar(100) NOT NULL,
  `Estado` tinyint(1) DEFAULT '1',
  `fecha_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_proveedor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedores`
--

LOCK TABLES `proveedores` WRITE;
/*!40000 ALTER TABLE `proveedores` DISABLE KEYS */;
/*!40000 ALTER TABLE `proveedores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `Id_Usuario` int NOT NULL AUTO_INCREMENT,
  `Nombres` varchar(25) NOT NULL,
  `Apellidos` varchar(25) NOT NULL,
  `Correo` varchar(254) NOT NULL,
  `contraseña` varchar(60) NOT NULL,
  PRIMARY KEY (`Id_Usuario`),
  UNIQUE KEY `Correo` (`Correo`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (5,'Diana Carolina','Martinez Erazo','Diana2026@gmail.com','$2b$05$TBmBE5uJtaslpbyUJIr/gOuQ7Ob46r/beKSCtvUvd0zDcYznvqp9.'),(6,'Miller Andres','Salas Alvarez','millersalas028@gmail.com','$2b$05$6AhA8BQGNJGa.BVf9CN3/ekmRQUka/vkshH61h.MjelkyFdqmYBLm'),(7,'Maria Estela','Alvarez','mariaestela@gmail.com','$2b$05$oICZEVlhGitSnD/DXS.vs.prLMc/EVkmUPUNxCHZ5/1g4vQQheSvq');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-01 19:46:29
