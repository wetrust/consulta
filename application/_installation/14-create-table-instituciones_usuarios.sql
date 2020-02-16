CREATE TABLE IF NOT EXISTS `huge`.`instituciones_usuarios` (
 `iu_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
 `institucion_id` int(11) unsigned NOT NULL,
 `user_id` int(11) unsigned NOT NULL,
 PRIMARY KEY (`iu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='user notes';

INSERT INTO `huge`.`instituciones_usuarios` (`iu_id`, `institucion_id`, `user_id`) VALUES
  (1, 1, 1),
  (2, 1, 2);
