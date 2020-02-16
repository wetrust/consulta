CREATE TABLE IF NOT EXISTS `huge`.`c_lugar` (
  `lugar_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `lugar_name` longtext COLLATE utf8_unicode_ci NOT NULL,
  `institucion_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`lugar_id`),
  UNIQUE KEY `lugar_id_UNIQUE` (`lugar_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;