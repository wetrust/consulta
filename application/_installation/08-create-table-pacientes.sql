CREATE TABLE IF NOT EXISTS `huge`.`pacientes` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `rut` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `fum` date NOT NULL,
  `user_id` int(11) NOT NULL,
  `apellido` varchar(255) CHARACTER SET utf8 NOT NULL,
  `ciudad` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `telefono` bigint(14) DEFAULT NULL,
  `lugar` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `nacionalidad` int(11) NOT NULL,
  `patologia` int(11) NOT NULL,
  `institucion_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;