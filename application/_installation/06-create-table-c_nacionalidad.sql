CREATE TABLE IF NOT EXISTS `huge`.`c_nacionalidad` (
  `nacionalidad_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `nacionalidad_name` longtext COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`nacionalidad_id`),
  UNIQUE KEY `nacionalidad_id_UNIQUE` (`nacionalidad_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;