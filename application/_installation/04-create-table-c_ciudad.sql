CREATE TABLE IF NOT EXISTS `huge`.`c_ciudad` (
  `ciudad_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `ciudad_name` longtext COLLATE utf8_unicode_ci NOT NULL,
  `institucion_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`ciudad_id`),
  UNIQUE KEY `ciudad_id_UNIQUE` (`ciudad_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
