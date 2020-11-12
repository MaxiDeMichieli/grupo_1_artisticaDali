CREATE DATABASE  IF NOT EXISTS `artistica_dali` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `artistica_dali`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: artistica_dali
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
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (106,3,26,1);
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Escolar','banner_escolar.jpg'),(2,'Artística','banner_artistica.jpg'),(3,'Oficina','banner_oficina.jpg');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (16,24,'image-1602552164495.jpg'),(18,26,'image-1602552382052.jpg'),(19,27,'image-1602555850750.jpg'),(20,28,'image-1602555979916.jpg'),(21,29,'image-1602556092570.jpg'),(22,30,'image-1602556187014.jpg'),(23,31,'image-1602556292798.jpg'),(24,32,'image-1602556408566.jpg'),(25,33,'image-1602556489876.jpg'),(26,34,'image-1602556571621.jpg'),(27,35,'image-1602556662341.jpg'),(28,36,'image-1602556741299.jpg'),(29,37,'image-1602556825855.jpg'),(30,38,'image-1602557084400.jpg'),(31,39,'image-1602557158892.jpg'),(32,40,'image-1602557265404.jpg'),(33,41,'image-1602557330494.jpg'),(34,42,'image-1602557415289.jpg'),(35,43,'image-1602557581238.jpg'),(36,44,'image-1602557672263.jpg'),(37,45,'image-1602557781997.jpg'),(38,46,'image-1602557853254.jpg'),(39,47,'image-1602557993577.jpg'),(40,48,'image-1602558069970.jpg'),(41,49,'image-1602558178929.jpg'),(42,50,'image-1602558236977.jpg'),(43,51,'image-1602558275958.jpg'),(44,52,'image-1602558332452.jpg'),(45,53,'image-1602558382398.jpg'),(46,54,'image-1602558442891.jpg'),(47,55,'image-1602558498669.jpg'),(48,25,'image-1602552275336.jpg');
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (24,'Acrilico profesional Winsor & Newton 60ml, ca','1010','25','El acrílico profesional es nuestra gama posee la calidad más fina. Combina nuestra experiencia con los colores y los últimos avances en tecnología de resina. Nuestros 80 colores son brillantes cuando están húmedos y siguen siendo tan brillante cuando están seco. Lo que se ve es realmente lo que es.-r-nCon 62 colores individuales de pigmento esto crea el más limpio espectro brillante y las mejores oportunidades de mezcla de color.',12,NULL,'2020-10-16 02:20:05'),(25,'Bandeja acuarela Giotto 24 colores + pincel','628','15','Las acuarelas Giotto proporcionan una gama de colores brillantes, vivos y opacos para que crees tu obra maestra.-r-nMezcla los colores como un chef mezcla sus ingredientes para crear una realidad mágica.-r-nY para fantásticos efectos de acuarela simplemente diluye la pintura con agua.',5,NULL,'2020-10-16 02:20:48'),(26,'Acuarelas Rembrandt traditional estuche X22','28123','5','Rembrandt es el nombre legendario de una gama que es conocida por su calidad superior e inigualable. Se ha desarrollado a través de pura habilidad y visión artística y se basa en las mejores materias primas.-r-nContenido:-r-n-22 sartenes (108- 224- 254- 268- 270- 336- 366- 370- 371- 409- 411- 416- 506- 508- 532- 535- 615- 620- 623- 662- 702- 708)-r-n-1 cepillo serie 110 no. 4 (cabello puro rojo sable)-r-n-Bandeja mezcladora de porcelana',5,NULL,'2020-11-12 02:04:54'),(27,'ATRIL A MORZA REGULABLE LUSTRADO SEURAT','6220','5','Atril a morza regulable lustrado Seurat',6,NULL,NULL),(28,'BARNIZ POLIURETANICO AL AGUA EUREKA X 250ML','324','8','Barniz poliuretanico al agua ofrece una variada gama de aplicación, es de secado rápido.-r-nLa pelicula protectora que forma no deja formar rayas de pincel, debido a su poder autonivelante. de terminación brillante, muy resistente y duradera.-r-nO AMARILLEA APTO PARA INTERIORES Y EXTERIORES SECADO AL TACTO 1 HORA, DOS MANOS DE 2 A 3 HORAS.-r-nSECADO TOTAL 24 HORAS.',16,NULL,'2020-10-16 02:30:25'),(29,'BASTIDOR SEURAT','703','5','50X65 CM TELA ESTUDIO GRANO FINO',21,NULL,NULL),(30,'BASTIDOR SEURAT 20X20 CM TELA ESTUDIO GRANO F','208','12','Bastidor Seurat-r-nTela Estudio-r-nGrano Fino',21,NULL,'2020-10-16 02:31:11'),(31,'BIBLIORATO AVIOS LOMO DE PAPEL LEGAL','208','5','Reforzado, la mejor calidad.',8,NULL,'2020-10-16 02:31:44'),(32,'CABALLETE VERTICAL A VARILLA LUSTRADO SEURAT','45960','5','-Caballete vertical a varilla roscada lustrado-r-n-Medidas cerrado: 99x92x222-r-n-Altura maxima Mastil 340 cm-r-n-Altura maxima de bastidor soportado  275cm',26,NULL,'2020-10-16 02:32:17'),(33,'CAJA PLASTICA UTIL-OF AMERICANA','781','5','COLOR AZUL 2,5 X 32,5 X 25,5 CM',20,NULL,NULL),(34,'CAJA UTIL-OF KRAFT','230','5','LOMO 4 CM 3 SOLAPAS PLASTIFICADA MARRON',20,NULL,NULL),(35,'ESTUCHE ALBA OLEO EXTRA FINO 10 POMOS DE 18ML','2372','5','Estuche Alba Oeo Profesional-r-nContiene 10 pomos de 18ml de óleos extra fino para uso profesional.',4,NULL,'2020-10-16 02:33:40'),(36,'Carpeta Mooving fortnite a4 2 anillos x40cm','350','10','Carpeta Mooving de fortnite a4 2 anillos x40 centimetros',11,NULL,'2020-10-16 02:34:11'),(37,'Cartuchera Mooving doble cierre fortnite, ref','735','5','Cartuchera Mooving doble cierre fortnite, reforzada',2,NULL,'2020-10-16 02:34:40'),(38,'CINTA UTIL-OF ADHESIVA 48 X 50 YDS TRANSPAREN','59','5','Cinta adhesiva de embalar transparente 48x50 METROS-r-nPrimera Marca, Primera Calidad',22,NULL,'2020-10-16 02:35:18'),(39,'COMPAS PLAN-TEC 9112 BIGOTERA AJUSTE RAPIDO','1450','10','Con dispositivo de ajuste rápido y regulador micrométrico. Para círculos de 1mm a 300mm Conjunto: compás, adaptador universar y portaminas',14,NULL,'2020-10-16 02:35:49'),(40,'CUADERNO EXITO TAPA DURA FORRADO UNIVERSO Nº3','195','5','CUADERNO TAPA DURA 19X24 48 HOJAS RAYADAS UNIVERSO EXITO E3-r-n* 10 COLORES A ELECCION-r-n*CUADERNO COCIDO-r-n*FORRADO EN VINILICO LAVABLE-r-n*PAPEL DE FIBRA DE CAÑA',15,NULL,'2020-10-16 02:36:38'),(41,'GOMA STABILO EXAM GRADE NEGRA','65','5','GOMA STABILO EXAM GRADE NEGRA',18,NULL,NULL),(42,'Lapices de colores Faber Castell Kit','665','5','Lápices de madera clásicos: lápices de color estándar con forma hexagonal.-r-nDestacan por sus colores intensos y por un especial proceso de encolado que hace que las minas sean súper resistentes a la rotura.-r-nLos lápices de color clásicos están disponibles en 60 colores diferentes.',3,NULL,'2020-10-16 02:37:25'),(43,'Sharpie Kit Lettering crea tus diseños 30 Pcs','4500','10','El Set Lettering Sharpie contiene:-r-n-10 Marcadores Permanentes Sharpie Punta Fina-r-n-4 Boligrafos Sharpie Pen-r-n-6 Boligrafos Sharpie Pen Brush-r-n-2 Marcadores Sharpie Paint-r-n-5 Sobres con Tarjeta-r-n-3 Tarjetas portanombres',10,NULL,'2020-10-16 02:38:24'),(44,'Resaltador Stabilo Swing Cool Paster x6, la m','95','5','Marca Nº1 en resaltadores. Colores pastel, punta biselada. Colores disponibles:-r-n-amarillo-r-n-celeste-r-n-lila-r-n-naranja-r-n-rosa-r-n-verde',10,NULL,'2020-10-16 02:39:06'),(45,'MARCADOR ALBA ACRYLIC 6MM (COLORES VARIOS)','290','5','-son de base acrilica-r-n-20 colores compatibles con Decoralba-r-n-multisuperficie (papel-carton-tela-vidrio-pared-macetas-mdf-etc...)-r-n-vienen 2 puntas (chisel y bullet)-r-n-colores brillantes-r-n-resistencia UV',10,NULL,'2020-10-16 02:39:52'),(46,'Valija Cresko Disney Spiderman 17','5240','6','Valija Cresko Disney Spiderman 17',1,NULL,NULL),(47,'PERFORADORA MIT CHICA PINTADA','485','5','Perforador metálico y zona de sujeción antideslizante.-r-nCuerpo metálico muy resistente. Practicidad y suavidad de funcionamiento con mecanismo de punzón sin fricción.',24,NULL,'2020-10-16 02:40:49'),(48,'Mini pincel Winsor & Newton','449','5','Pincel Winsor & Newton mini, pincel de bolsillo.-r-nEspecial para acuarelas, gouache, tinta.',13,NULL,'2020-10-16 02:41:26'),(49,'PIZARRA GALAXIA 80X120','2600','5','Pizarra blanca laminada Galaxia.-r-nDimensiones: 80x120-r-nMarco metálico color negro.',23,NULL,'2020-10-16 02:42:00'),(50,'EPUESTO EXITO Nº3 CAJA FAMILIAR POR 480 HOJAS','1200','5','REPUESTO EXITO Nº3 CAJA FAMILIAR POR 480 HOJAS RAYADO',27,NULL,'2020-10-16 02:43:09'),(51,'REPUESTO RIVADAVIA Nº 3 FAMILIAR 288 HOJAS','299','10','REPUESTO RIVADAVIA Nº 3 FAMILIAR POR 288 HOJAS',27,NULL,'2020-10-16 02:43:59'),(52,'SOBRE MEDORO CAJA 2781 OBRA 12.5X19 BOLSA 80G','123','10','Sobre tipo caja, varias medidas',25,NULL,'2020-10-16 02:44:32'),(53,'SOBRE MEDORO CAJA A1386 OFICIO CON VENTANA IN','112','0','Papel obre, la mejor calidad',25,NULL,'2020-10-29 14:46:15'),(54,'TIJERA PIZZINI SPAZIO ACERO 17 CM ACERO MANGO','150','10','TIJERA PIZZINI SPAZIO ACERO 17 CM ACERO MANGO PLASTICO',19,NULL,'2020-10-16 02:45:20'),(55,'TINTA ROTRING PARA ESTILOGRAFO 250ML. COLOR N','2588','10','Adecuada para papel vegetal, papel de dibujo, cartulina de dibujo y y tus proyectos. Tiene gran fluidez, es muy opaca y presenta buena adherencia. No mancha cuando se seca, imborrable , resistente a la luz, adecuada para todo tipo de reproducciones, admite la mezcla de tintas de distintos colores, gran pureza del color.',17,NULL,'2020-10-16 02:45:52');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `purchase_product`
--

LOCK TABLES `purchase_product` WRITE;
/*!40000 ALTER TABLE `purchase_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `purchase_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `purchases`
--

LOCK TABLES `purchases` WRITE;
/*!40000 ALTER TABLE `purchases` DISABLE KEYS */;
/*!40000 ALTER TABLE `purchases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `subcategories`
--

LOCK TABLES `subcategories` WRITE;
/*!40000 ALTER TABLE `subcategories` DISABLE KEYS */;
INSERT INTO `subcategories` VALUES (1,'Mochilas',1),(2,'Cartucheras',1),(3,'Lápices',1),(4,'Oleos',2),(5,'Acuarelas',2),(6,'Atriles',2),(8,'Biblioratos',3),(9,'Abrochadoras',3),(10,'Marcadores',2),(11,'Carpetas',1),(12,'Acrílicos',2),(13,'Pinceles',2),(14,'Compás',2),(15,'Cuadernos',1),(16,'Barniz',2),(17,'Tintas',2),(18,'Gomas',1),(19,'Tijeras',1),(20,'Cajas',3),(21,'Bastidores',2),(22,'Cintas Adhesivas',3),(23,'Pizarras',3),(24,'Perforadoras',3),(25,'Sobres',3),(26,'Caballetes y atriles',2),(27,'Repuestos',1);
/*!40000 ALTER TABLE `subcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Jonatan','Cespedes','retratos.jonatan@gmail.com','$2b$12$STa15bgHbWy.znewxZTp3u9zvnJPL8Ww.h5UoXzMDrJPLdWLKAvP.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL),(2,'Jonatan','Cespedes','kuramatattoo@gmail.com','$2b$12$STa15bgHbWy.znewxZTp3u9zvnJPL8Ww.h5UoXzMDrJPLdWLKAvP.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL),(3,'Maximo','De Michieli','maxidemichieli@gmail.com','$2b$12$7CjdOG2YBIoDJ1xNVBmKju8J882zLhDIoiC/zvxfXBEbtk996D5La','1121648374','Salerno',1180,'12','1663','Buenos Aires','SAN MIGUEL',1,NULL,'2020-11-11 18:16:47',NULL,NULL),(4,'Maximo','De Michieli','maxdemichieli@gmail.com','$2b$12$ZrroYMW.4.rh/Hdd7i5b1erUss9.kFqIMHISAsgpx7D0DHhcMCaiW',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'2020-10-16 01:21:00','2020-10-16 01:21:00',NULL,NULL),(16,'Maximo','De Michieli','maxidemichieli@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,'Ciudad Autónoma de Buenos Aires','NUÑEZ',0,'2020-11-12 02:11:00','2020-11-12 02:17:36','118144377900204033470','google');
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

-- Dump completed on 2020-11-11 23:28:49
