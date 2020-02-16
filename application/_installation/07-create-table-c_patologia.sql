CREATE TABLE IF NOT EXISTS `huge`.`c_patologia` (
  `patologia_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `patologia_name` longtext COLLATE utf8_unicode_ci NOT NULL,
  `institucion_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`patologia_id`),
  UNIQUE KEY `patologia_id_UNIQUE` (`patologia_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;