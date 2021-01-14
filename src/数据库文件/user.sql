# Host: localhost  (Version: 5.5.53)
# Date: 2021-01-14 10:57:33
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "user"
#

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COMMENT='用户表';

#
# Data for table "user"
#

/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','123456','admin'),(2,'houshuxiang','111111','hsx'),(3,'hsxhsx','hsxhsx','121212'),(12,'adminadmin','111111','admin'),(13,'hsxhsx','111111','pikacar');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
