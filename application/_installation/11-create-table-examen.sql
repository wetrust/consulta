CREATE TABLE IF NOT EXISTS `huge`.`examen` (
  `examen_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `pre_id` int(11) unsigned NOT NULL,
  `paciente_rut` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `examen_tipo` int(11) NOT NULL,
  `examen_fecha` date NOT NULL,
  `examen_eg` int(11) NOT NULL,
  `examen_data` longtext COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`examen_id`),
  UNIQUE KEY `examen_id_UNIQUE` (`examen_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;