CREATE TABLE IF NOT EXISTS `huge`.`reservas` (
  `reserva_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `reserva_rut` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `reserva_nombre` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `reserva_apellido` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `reserva_dia` date NOT NULL,
  `reserva_hora` int(11) NOT NULL,
  `reserva_minutos` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `reserva_visible` int(11) DEFAULT '1',
  `institucion_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`reserva_id`),
  UNIQUE KEY `reserva_id_UNIQUE` (`reserva_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;