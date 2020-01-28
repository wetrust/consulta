CREATE TABLE IF NOT EXISTS `huge`.`pre_examen` (
  `pre_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `paciente_rut` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `pre_fecha` date NOT NULL,
  `pre_examen` int(11) NOT NULL,
  `pre_motivo` longtext COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`pre_id`),
  UNIQUE KEY `pre_id_UNIQUE` (`pre_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;