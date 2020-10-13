-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: artistica_dali
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.14-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `usuario_id_carrito_idx` (`usuario_id`),
  KEY `producto_id_carrito_idx` (`producto_id`),
  CONSTRAINT `producto_id_carrito` FOREIGN KEY (`producto_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `usuario_id_carrito` FOREIGN KEY (`usuario_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `banner` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Escolar','banner_escolar.jpg'),(2,'Artística','banner_artistica.jpg'),(3,'Oficina','banner_oficina.jpg');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `producto_id` int(11) NOT NULL,
  `imagen` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `producto_id_idx` (`producto_id`),
  CONSTRAINT `producto_id` FOREIGN KEY (`producto_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (16,24,'image-1602552164495.jpg'),(17,25,'image-1602552275336.jpg'),(18,26,'image-1602552382052.jpg'),(19,27,'image-1602555850750.jpg'),(20,28,'image-1602555979916.jpg'),(21,29,'image-1602556092570.jpg'),(22,30,'image-1602556187014.jpg'),(23,31,'image-1602556292798.jpg'),(24,32,'image-1602556408566.jpg'),(25,33,'image-1602556489876.jpg'),(26,34,'image-1602556571621.jpg'),(27,35,'image-1602556662341.jpg'),(28,36,'image-1602556741299.jpg'),(29,37,'image-1602556825855.jpg'),(30,38,'image-1602557084400.jpg'),(31,39,'image-1602557158892.jpg'),(32,40,'image-1602557265404.jpg'),(33,41,'image-1602557330494.jpg'),(34,42,'image-1602557415289.jpg'),(35,43,'image-1602557581238.jpg'),(36,44,'image-1602557672263.jpg'),(37,45,'image-1602557781997.jpg'),(38,46,'image-1602557853254.jpg'),(39,47,'image-1602557993577.jpg'),(40,48,'image-1602558069970.jpg'),(41,49,'image-1602558178929.jpg'),(42,50,'image-1602558236977.jpg'),(43,51,'image-1602558275958.jpg'),(44,52,'image-1602558332452.jpg'),(45,53,'image-1602558382398.jpg'),(46,54,'image-1602558442891.jpg'),(47,55,'image-1602558498669.jpg');
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `precio` varchar(45) NOT NULL,
  `descuento` varchar(45) DEFAULT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `subcategoria_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `subcategory_idx` (`subcategoria_id`),
  CONSTRAINT `subcategory` FOREIGN KEY (`subcategoria_id`) REFERENCES `subcategories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (24,'Acrilico profesional Winsor & Newton 60ml, ca','1010','25','El acrílico profesional es nuestra gama posee',12),(25,'Bandeja acuarela Giotto 24 colores + pincel','628','15','Las acuarelas Giotto proporcionan una gama de',5),(26,'Acuarelas Rembrandt traditional estuche X22','28123','10','Rembrandt es el nombre legendario de una gama',5),(27,'ATRIL A MORZA REGULABLE LUSTRADO SEURAT','6220','5','Atril a morza regulable lustrado Seurat',6),(28,'BARNIZ POLIURETANICO AL AGUA EUREKA X 250ML','324','8','Barniz poliuretanico al agua ofrece una varia',16),(29,'BASTIDOR SEURAT','703','5','50X65 CM TELA ESTUDIO GRANO FINO',21),(30,'BASTIDOR SEURAT 20X20 CM TELA ESTUDIO GRANO F','208','12','Bastidor Seurat\\nTela Estudio\\nGrano Fino',21),(31,'BIBLIORATO AVIOS LOMO DE PAPEL LEGAL','208','5','\"Reforzado, la mejor calidad',8),(32,'CABALLETE VERTICAL A VARILLA LUSTRADO SEURAT','45960','5','-Caballete vertical a varilla roscada lustrad',26),(33,'CAJA PLASTICA UTIL-OF AMERICANA','781','5','COLOR AZUL 2,5 X 32,5 X 25,5 CM',20),(34,'CAJA UTIL-OF KRAFT','230','5','LOMO 4 CM 3 SOLAPAS PLASTIFICADA MARRON',20),(35,'ESTUCHE ALBA OLEO EXTRA FINO 10 POMOS DE 18ML','2372','5','Estuche Alba Oleo Profesional\r\nContiene 10 po',4),(36,'Carpeta Mooving fortnite a4 2 anillos x40cm','350','10','Carpeta Mooving de fortnite a4 2 anillos x40 ',11),(37,'Cartuchera Mooving doble cierre fortnite, ref','735','5','Cartuchera Mooving doble cierre fortnite, ref',2),(38,'CINTA UTIL-OF ADHESIVA 48 X 50 YDS TRANSPAREN','59','5','Cinta adhesiva de embalar transparente 48x50 ',22),(39,'COMPAS PLAN-TEC 9112 BIGOTERA AJUSTE RAPIDO','1450','10','Con dispositivo de ajuste rápido y regulador ',14),(40,'CUADERNO EXITO TAPA DURA FORRADO UNIVERSO Nº3','195','5','CUADERNO TAPA DURA 19X24 48 HOJAS RAYADAS UNI',15),(41,'GOMA STABILO EXAM GRADE NEGRA','65','5','GOMA STABILO EXAM GRADE NEGRA',18),(42,'Lapices de colores Faber Castell Kit','665','5','Lápices de madera clásicos: lápices de color ',3),(43,'Sharpie Kit Lettering crea tus diseños 30 Pcs','4500','10','El Set Lettering Sharpie contiene:\r\n-10 Marca',10),(44,'Resaltador Stabilo Swing Cool Paster x6, la m','95','5','Marca Nº1 en resaltadores. Colores pastel, pu',10),(45,'MARCADOR ALBA ACRYLIC 6MM (COLORES VARIOS)','290','5','-son de base acrilica \r\n-20 colores compatibl',10),(46,'Valija Cresko Disney Spiderman 17','5240','6','Valija Cresko Disney Spiderman 17',1),(47,'PERFORADORA MIT CHICA PINTADA','485','5','Perforador metálico y zona de sujeción antide',24),(48,'Mini pincel Winsor & Newton','449','5','Pincel Winsor & Newton mini, pincel de bolsil',13),(49,'PIZARRA GALAXIA 80X120','2600','5','Pizarra blanca laminada Galaxia.\r\nDimensiones',23),(50,'EPUESTO EXITO Nº3 CAJA FAMILIAR POR 480 HOJAS','1200','5','EPUESTO EXITO Nº3 CAJA FAMILIAR POR 480 HOJAS',27),(51,'REPUESTO RIVADAVIA Nº 3 FAMILIAR POR 288 HOJA','299','10','REPUESTO RIVADAVIA Nº 3 FAMILIAR POR 288 HOJA',27),(52,'SOBRE MEDORO CAJA 2781 OBRA 12.5X19 BOLSA 80G','123','10','Sobre tipo caja varias medidas',25),(53,'SOBRE MEDORO CAJA A1386 OFICIO CON VENTANA IN','112','4','Papel obre, la mejor calidad',25),(54,'TIJERA PIZZINI SPAZIO ACERO 17 CM ACERO MANGO','150','10','TIJERA PIZZINI SPAZIO ACERO 17 CM ACERO MANGO',19),(55,'TINTA ROTRING PARA ESTILOGRAFO 250ML. COLOR N','2588','10','Adecuada para papel vegetal, papel de dibujo,',17);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_product`
--

DROP TABLE IF EXISTS `purchase_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `purchase_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `compra_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `venta_id_idx` (`compra_id`),
  KEY `producto_id_compra_idx` (`producto_id`),
  CONSTRAINT `compra_id` FOREIGN KEY (`compra_id`) REFERENCES `purchases` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `producto_id_compra` FOREIGN KEY (`producto_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_product`
--

LOCK TABLES `purchase_product` WRITE;
/*!40000 ALTER TABLE `purchase_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `purchase_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchases`
--

DROP TABLE IF EXISTS `purchases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `purchases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `usuario_id_compra_idx` (`usuario_id`),
  CONSTRAINT `usuario_id_compra` FOREIGN KEY (`usuario_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchases`
--

LOCK TABLES `purchases` WRITE;
/*!40000 ALTER TABLE `purchases` DISABLE KEYS */;
/*!40000 ALTER TABLE `purchases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategories`
--

DROP TABLE IF EXISTS `subcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subcategories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `categoria_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `categoria_idx` (`categoria_id`),
  CONSTRAINT `categoria` FOREIGN KEY (`categoria_id`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategories`
--

LOCK TABLES `subcategories` WRITE;
/*!40000 ALTER TABLE `subcategories` DISABLE KEYS */;
INSERT INTO `subcategories` VALUES (1,'Mochilas',1),(2,'Cartucheras',1),(3,'Lápices',1),(4,'Oleos',2),(5,'Acuarelas',2),(6,'Atriles',2),(7,'Cajas',3),(8,'Biblioratos',3),(9,'Abrochadoras',3),(10,'Marcadores',2),(11,'Carpetas',1),(12,'Acrílicos',2),(13,'Pinceles',2),(14,'Compás',2),(15,'Cuadernos',1),(16,'Barniz',2),(17,'Tintas',2),(18,'Gomas',1),(19,'Tijeras',1),(20,'Cajas',3),(21,'Bastidores',2),(22,'Cintas Adhesivas',3),(23,'Pizarras',3),(24,'Perforadoras',3),(25,'Sobres',3),(26,'Caballetes y atriles',2),(27,'Repuestos',1);
/*!40000 ALTER TABLE `subcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(70) NOT NULL,
  `telefono` varchar(30) DEFAULT NULL,
  `calle` varchar(45) DEFAULT NULL,
  `numero` int(11) DEFAULT NULL,
  `dpto` varchar(10) DEFAULT NULL,
  `cp` varchar(15) DEFAULT NULL,
  `provincia` varchar(45) DEFAULT NULL,
  `localidad` varchar(45) DEFAULT NULL,
  `rol` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Jonatan','Cespedes','retratos.jonatan@gmail.com','$2b$12$STa15bgHbWy.znewxZTp3u9zvnJPL8Ww.h5UoXzMDrJPLdWLKAvP.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1),(2,'Jonatan','Cespedes','kuramatattoo@gmail.com','$2b$12$STa15bgHbWy.znewxZTp3u9zvnJPL8Ww.h5UoXzMDrJPLdWLKAvP.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-13  0:25:25
