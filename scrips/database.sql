CREATE DATABASE  IF NOT EXISTS `mathtests` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `mathtests`;
-- MySQL dump 10.13  Distrib 5.7.21, for Linux (x86_64)
--
-- Host: localhost    Database: mathtests
-- ------------------------------------------------------
-- Server version	5.7.21-0ubuntu0.16.04.1

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
-- Table structure for table `M_AUTHORITY`
--

DROP TABLE IF EXISTS `M_AUTHORITY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `M_AUTHORITY` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(45) NOT NULL DEFAULT 'N/A',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `NAME_UNIQUE` (`NAME`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `M_AUTHORITY`
--

LOCK TABLES `M_AUTHORITY` WRITE;
/*!40000 ALTER TABLE `M_AUTHORITY` DISABLE KEYS */;
INSERT INTO `M_AUTHORITY` VALUES (2,'ROLE_ADMIN'),(1,'ROLE_SUPERADMIN'),(3,'ROLE_SUPERVISOR'),(4,'ROLE_USER');
/*!40000 ALTER TABLE `M_AUTHORITY` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `M_EXAM`
--

DROP TABLE IF EXISTS `M_EXAM`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `M_EXAM` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `TITLE` varchar(45) DEFAULT NULL,
  `TIME_LEFT` tinyint(11) DEFAULT NULL,
  `DATE_IN` datetime DEFAULT NULL,
  `SUBJECT_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_EXAM_1_idx` (`SUBJECT_ID`),
  CONSTRAINT `fk_EXAM_1` FOREIGN KEY (`SUBJECT_ID`) REFERENCES `M_SUBJECT` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `M_EXAM`
--

LOCK TABLES `M_EXAM` WRITE;
/*!40000 ALTER TABLE `M_EXAM` DISABLE KEYS */;
INSERT INTO `M_EXAM` VALUES (1,'Bài 01-Update',60,'2018-04-15 12:49:08',1);
/*!40000 ALTER TABLE `M_EXAM` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `M_EXAM_QUESTION`
--

DROP TABLE IF EXISTS `M_EXAM_QUESTION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `M_EXAM_QUESTION` (
  `EXAM_ID` int(11) NOT NULL,
  `QUESTION_ID` int(11) NOT NULL,
  PRIMARY KEY (`EXAM_ID`,`QUESTION_ID`),
  KEY `fk_EXAM_QUESTION_2_idx` (`QUESTION_ID`),
  CONSTRAINT `fk_EXAM_QUESTION_1` FOREIGN KEY (`EXAM_ID`) REFERENCES `M_EXAM` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_EXAM_QUESTION_2` FOREIGN KEY (`QUESTION_ID`) REFERENCES `M_QUESTION` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `M_EXAM_QUESTION`
--

LOCK TABLES `M_EXAM_QUESTION` WRITE;
/*!40000 ALTER TABLE `M_EXAM_QUESTION` DISABLE KEYS */;
INSERT INTO `M_EXAM_QUESTION` VALUES (1,1),(1,2),(1,3),(1,4);
/*!40000 ALTER TABLE `M_EXAM_QUESTION` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `M_GROUP`
--

DROP TABLE IF EXISTS `M_GROUP`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `M_GROUP` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(45) DEFAULT NULL,
  `TEACHER` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `NAME_UNIQUE` (`NAME`),
  KEY `fk_GROUP_1_idx` (`TEACHER`),
  CONSTRAINT `fk_GROUP_1` FOREIGN KEY (`TEACHER`) REFERENCES `M_USERS` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `M_GROUP`
--

LOCK TABLES `M_GROUP` WRITE;
/*!40000 ALTER TABLE `M_GROUP` DISABLE KEYS */;
INSERT INTO `M_GROUP` VALUES (1,'SXTK_N1_T1',4),(2,'SXTK_N2_T2',5),(3,'Toán Update',2),(4,'Toán Tổ Hợp After Update',2);
/*!40000 ALTER TABLE `M_GROUP` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `M_QUESTION`
--

DROP TABLE IF EXISTS `M_QUESTION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `M_QUESTION` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `CONTENT` longtext NOT NULL,
  `ANSWER_A` longtext,
  `ANSWER_B` longtext,
  `ANSWER_C` longtext,
  `ANSWER_D` longtext,
  `ANSWER_CORRECT` tinyint(10) NOT NULL,
  `ANSWER_CORRECT_CONTENT` longtext,
  `ID_USER` int(11) DEFAULT NULL,
  `IS_PUBLIC` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`ID`),
  KEY `fk_QUESTION_USER_idx` (`ID_USER`),
  CONSTRAINT `fk_QUESTION_USER` FOREIGN KEY (`ID_USER`) REFERENCES `M_USERS` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `M_QUESTION`
--

LOCK TABLES `M_QUESTION` WRITE;
/*!40000 ALTER TABLE `M_QUESTION` DISABLE KEYS */;
INSERT INTO `M_QUESTION` VALUES (1,'Tính đạo hàm cấp 2 của hàm số \\(y={{10}^{x}}\\).','\\({{y}^{\'\'}}={{10}^{x}}\\).','\\({{y}^{\'\'}}={{10}^{x}}\\ln {{10}^{2}}\\).','\\({{y}^{\'\'}}={{10}^{x}}{{\\ln }^{2}}10\\).','\\({{y}^{\'\'}}=\\frac{{{10}^{x}}}{{{\\ln }^{2}}10}\\). ',3,NULL,4,''),(2,'Cho hình lập phương\\(ABCD{{A}^{\'}}{{B}^{\'}}{{C}^{\'}}{{D}^{\'}}\\) cạnh \\(a\\). Tính diện tích xung quanh\\({{S}_{xq}}\\)của khối nón có đỉnh là tâm hình vuông\\({{A}^{\'}}{{B}^{\'}}{{C}^{\'}}{{D}^{\'}}\\)và có đường tròn đáy ngoại tiếp hình vuông\\(ABCD\\).','\\({{S}_{xq}}=\\frac{\\pi {{a}^{2}}\\sqrt{3}}{3}\\).','\\({{S}_{xq}}=\\frac{\\pi {{a}^{2}}\\sqrt{2}}{2}\\).','\\({{S}_{xq}}=\\frac{\\pi {{a}^{2}}\\sqrt{3}}{2}\\).','\\({{S}_{xq}}=\\frac{\\pi {{a}^{2}}\\sqrt{6}}{2}\\). ',3,NULL,4,'\0'),(3,'Tìm tất cả các giá trị thực của tham số\\(m\\) để sao cho đồ thị của hàm số \\(y={{x}^{4}}+2m{{x}^{2}}+{{m}^{2}}+2m\\) có ba điểm cực trị và khoảng cách giữa hai điểm cực tiểu bằng 4.','\\(m=-4\\).','\\(m=5\\).','\\(m=\\frac{1}{2}\\).','\\(m=3\\).',1,NULL,4,''),(4,'Trong không gian với hệ tọa độ \\[Oxyz\\], cho tứ diện\\[ABCD\\] với\\[A(1;2;1)\\],<br />\n \\[B(-2;1;3)\\],\\[C(2;-1;1),\\ D(0;3;1)\\]. Viết phương trình mặt phẳng\\[(P)\\]chứa hai điểm\\[A,B\\]sao cho \\[C,\\ D\\]nằm về hai phía khác nhau của\\[(P)\\] đồng thời\\[C,\\ D\\]cách đều\\[(P)\\].','\\[(P): 2x+3z-5=0\\].','\\[(P): 4x+2y+7z-15=0\\].','\\[(P): 3y+z-1=0\\].','\\[(P): x-y+z-5=0\\].',1,NULL,4,'\0'),(5,'Một vật chuyển động theo quy luật \\(S=-\\frac{1}{2}{{t}^{3}}+9{{t}^{2}}+5\\) với \\(t\\) (giây) là khoảng thời gian tính từ khi vật bắt đầu chuyển động và \\(S\\) (mét) là quãng đường vật di chuyển được trong khoảng thời gian đó. Hỏi trong khoảng thời gian \\(8\\) giây, kể từ khi vật bắt đầu chuyển động, vận tốc lớn nhất của vật đạt được bằng bao nhiêu ?',' $$84\\ (m/s)$$.','$$48\\ (m/s)$$.','$$54\\ (m/s)$$.','$$104\\ (m/s)$$.',3,NULL,4,''),(6,'Cho số phức \\(z=1-2i\\). Tính \\(\\left| z \\right|\\).','\\(\\left| z \\right|=5\\).','\\(\\left| z \\right|=\\sqrt{5}\\).','\\(\\left| z \\right|=3\\).','\\(\\left| z \\right|=2\\). ',2,NULL,5,''),(7,'Tìm nghiệm của phương trình \\(\\sin 5x+c\\text{o}{{\\text{s}}^{2}}x-{{\\sin }^{2}}x=0\\).','\\(\\left[ \\begin{array}{l}&lt;br /&gt; x=-\\frac{\\pi }{6}+k\\frac{\\pi }{3} \\\\&lt;br /&gt; x=-\\frac{\\pi }{14}+k\\frac{\\pi }{7} &lt;br /&gt; \\end{array} \\right. \\).','\\[\\left[ \\begin{array}{l}&lt;br /&gt; x=-\\frac{\\pi }{6}+k\\frac{2\\pi }{3} \\\\&lt;br /&gt; x=-\\frac{\\pi }{14}+k\\frac{2\\pi }{7} &lt;br /&gt; \\end{array} \\right. \\).','\\(\\left[ \\begin{array}{l}&lt;br /&gt; x=\\frac{\\pi }{6}+k2\\pi&lt;br /&gt; \\\\&lt;br /&gt; x=\\frac{\\pi }{14}+k2\\pi&lt;br /&gt; \\end{array} \\right. \\).','\\(\\left[ \\begin{array}{l}&lt;br /&gt; x=-\\frac{\\pi }{6}+k2\\pi&lt;br /&gt; \\\\&lt;br /&gt; x=-\\frac{\\pi }{14}+k2\\pi&lt;br /&gt; \\end{array} \\right. \\).',2,NULL,5,'\0'),(8,'Cho một khối lăng trụ có thể tích là\\(\\sqrt{3}. {{a}^{3}}\\), đáy là tam giác đều cạnh \\(a\\). Tính chiều cao \\(h\\) của khối lăng trụ.','\\(h=4a\\).','\\(h=3a\\).','\\(h=2a\\).','\\(h=12a\\).',1,NULL,5,''),(9,'1+1=?','2','3','4','5',1,'1+1=2',4,'\0'),(10,'1+1=?','2','3','4','5',1,'1+1=2',4,'\0'),(11,'1+1=?','2','3','4','5',1,'1+1=2',4,'\0'),(12,'1+1=?','2','3','4','5',1,'1+1=2',4,'\0'),(13,'1+1=?','2','3','4','5',1,'1+1=2',4,'\0'),(14,'1+1=?','2','3','4','5',1,'1+1=2',4,'\0'),(15,'1+1=?','2','3','4','5',1,'1+1=2',4,'\0'),(16,'1+1=?','2','3','4','5',1,'1+1=2',4,'\0'),(17,'1+1=','2','3','4','5',1,'1+1=2',4,'\0'),(18,'1+1=','2','3','4','5',1,'1+1=2',4,'\0'),(19,'1+1=','2','3','4','5',1,'1+1=2',4,'\0'),(20,'1+1=','2','3','4','5',1,'1+1=2',4,'\0'),(21,'2+2=','2','3','4','5',3,'2+2=4',4,'');
/*!40000 ALTER TABLE `M_QUESTION` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `M_SUBJECT`
--

DROP TABLE IF EXISTS `M_SUBJECT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `M_SUBJECT` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(45) DEFAULT NULL,
  `GROUP_ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_SUBJECT_1_idx` (`GROUP_ID`),
  CONSTRAINT `fk_SUBJECT_1` FOREIGN KEY (`GROUP_ID`) REFERENCES `M_GROUP` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `M_SUBJECT`
--

LOCK TABLES `M_SUBJECT` WRITE;
/*!40000 ALTER TABLE `M_SUBJECT` DISABLE KEYS */;
INSERT INTO `M_SUBJECT` VALUES (1,'Bài tập về nhà',1),(2,'Kiễm Tra 1 Tiết',1),(3,'KT 1 Tiết-2',3);
/*!40000 ALTER TABLE `M_SUBJECT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `M_TASKS`
--

DROP TABLE IF EXISTS `M_TASKS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `M_TASKS` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `USER_ID` int(11) DEFAULT NULL,
  `EXAM_ID` int(11) DEFAULT NULL,
  `TIME_IN` datetime DEFAULT NULL,
  `TIME_UT` datetime DEFAULT NULL,
  `SCORE` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `fk_TASKS_1_idx` (`EXAM_ID`),
  KEY `fk_TASKS_2_idx` (`USER_ID`),
  CONSTRAINT `fk_TASKS_1` FOREIGN KEY (`EXAM_ID`) REFERENCES `M_EXAM` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_TASKS_2` FOREIGN KEY (`USER_ID`) REFERENCES `M_USERS` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `M_TASKS`
--

LOCK TABLES `M_TASKS` WRITE;
/*!40000 ALTER TABLE `M_TASKS` DISABLE KEYS */;
INSERT INTO `M_TASKS` VALUES (1,4,1,'2018-04-15 21:30:12','2018-04-15 21:30:16',0),(2,4,1,'2018-04-15 21:32:58','2018-04-15 21:33:01',0);
/*!40000 ALTER TABLE `M_TASKS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `M_TASK_DETAIL`
--

DROP TABLE IF EXISTS `M_TASK_DETAIL`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `M_TASK_DETAIL` (
  `TASK_ID` int(11) NOT NULL,
  `QUESTION_ID` int(11) NOT NULL,
  `ANSWER` int(11) DEFAULT NULL,
  PRIMARY KEY (`TASK_ID`,`QUESTION_ID`),
  KEY `fk_TASK_DETAIL_2_idx` (`QUESTION_ID`),
  CONSTRAINT `fk_TASK_DETAIL_1` FOREIGN KEY (`TASK_ID`) REFERENCES `M_TASKS` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_TASK_DETAIL_2` FOREIGN KEY (`QUESTION_ID`) REFERENCES `M_QUESTION` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `M_TASK_DETAIL`
--

LOCK TABLES `M_TASK_DETAIL` WRITE;
/*!40000 ALTER TABLE `M_TASK_DETAIL` DISABLE KEYS */;
/*!40000 ALTER TABLE `M_TASK_DETAIL` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `M_USERS`
--

DROP TABLE IF EXISTS `M_USERS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `M_USERS` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `USER_NAME` varchar(45) NOT NULL DEFAULT 'N/A',
  `PASSWORD` varchar(70) NOT NULL DEFAULT 'N/A',
  `FIRST_NAME` varchar(70) NOT NULL DEFAULT 'N/A',
  `LAST_NAME` varchar(45) NOT NULL DEFAULT 'N/A',
  `BIRTH_DATE` date NOT NULL,
  `EMAIL` text NOT NULL,
  `ENABLED` bit(1) NOT NULL DEFAULT b'1',
  `LAST_PASSWORD_RESET_DATE` datetime NOT NULL,
  `LAST_ACCESS` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `USER_NAME_UNIQUE` (`USER_NAME`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `M_USERS`
--

LOCK TABLES `M_USERS` WRITE;
/*!40000 ALTER TABLE `M_USERS` DISABLE KEYS */;
INSERT INTO `M_USERS` VALUES (1,'superadmin','$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra','Tú','Nguyễn','1996-10-06','nguyenthanhtuba96@gmail.com','','2018-03-25 00:00:00','2018-04-08 22:08:08'),(2,'admin00','$2a$10$KvjGyhYFzF8V3gp6NjtOwepUlTzGsclIf/RIW5f0BSZzzx4DcwlBm','Tony','Tèo','2017-09-22','tuilateo@gmail.com','','2018-04-12 20:51:09','2018-04-15 16:31:36'),(3,'admin01','$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra','Quang','Trần','1996-10-06','nguyenthanhtuba96@gmail.com','','2018-03-25 00:00:00','2018-03-27 07:16:36'),(4,'teacher00','$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra','Tú','Nguyễn Thanh','1997-11-13','nguyenthanhtuba96@gmail.com','','2018-03-25 00:00:00','2018-04-15 22:01:53'),(5,'teacher01','$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra','Toàn','Nguyễn Duy','1996-10-26','nguyenthanhtuba96@gmail.com','','2018-03-25 00:00:00','2018-04-01 10:14:04'),(6,'user00','$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra','Quang','Trần Dương','1996-10-15','nguyenthanhtuba96@gmail.com','','2018-03-25 00:00:00','2018-03-27 12:38:09'),(7,'user01','$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra','Tú','Nguyễn Thanh','1996-10-06','nguyenthanhtuba96@gmail.com','','2018-03-25 00:00:00','2018-03-25 00:00:00'),(8,'thanhtu','$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra','Tú','Nguyễn Thanh','1996-10-30','Nguyenthanhtubassad','\0','2018-03-27 10:07:10',NULL),(9,'thanhtu02','$2a$10$iwuqj/gxfRpib3zAOMYoQ.6qvrjVP1nXehqoq8JJ3BYciUVg.EwIu','Tú','Nguyễn Thanh','1996-10-06','Nguyenthanhtubassad','','2018-03-27 12:40:00',NULL),(10,'thanhtu03','$2a$10$M3xJefB3Tw/.5J8A49jigelxZOgSOf70BYuOkHM1A2Nlmx3MoOSsi','Tú','Nguyễn','1996-10-06','Nguyenthanhtubassad','','2018-04-12 20:40:40',NULL);
/*!40000 ALTER TABLE `M_USERS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `M_USER_AUTHORITY`
--

DROP TABLE IF EXISTS `M_USER_AUTHORITY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `M_USER_AUTHORITY` (
  `USER_ID` int(11) NOT NULL,
  `AUTHORITY_ID` int(11) NOT NULL,
  PRIMARY KEY (`USER_ID`,`AUTHORITY_ID`),
  KEY `fk_user_authority_idx` (`AUTHORITY_ID`),
  CONSTRAINT `fk_user_authority_1` FOREIGN KEY (`AUTHORITY_ID`) REFERENCES `M_AUTHORITY` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_authority_2` FOREIGN KEY (`USER_ID`) REFERENCES `M_USERS` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `M_USER_AUTHORITY`
--

LOCK TABLES `M_USER_AUTHORITY` WRITE;
/*!40000 ALTER TABLE `M_USER_AUTHORITY` DISABLE KEYS */;
INSERT INTO `M_USER_AUTHORITY` VALUES (1,1),(1,2),(2,2),(3,2),(1,3),(2,3),(3,3),(4,3),(5,3),(9,3),(10,3),(1,4),(2,4),(3,4),(4,4),(5,4),(6,4),(7,4),(8,4),(9,4),(10,4);
/*!40000 ALTER TABLE `M_USER_AUTHORITY` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-15 22:24:14
