CREATE TABLE IF NOT EXISTS `huge`.`c_agenda` (
  `agenda_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `agenda_name` longtext COLLATE utf8_unicode_ci NOT NULL,
  `agenda_email` longtext COLLATE utf8_unicode_ci NOT NULL,
  `agenda_profesion` longtext COLLATE utf8_unicode_ci NOT NULL,
  `agenda_ciudad` int(11) NOT NULL,
  `institucion_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`agenda_id`),
  UNIQUE KEY `agenda_id_UNIQUE` (`agenda_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;