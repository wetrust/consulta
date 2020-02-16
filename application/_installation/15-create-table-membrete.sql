CREATE TABLE IF NOT EXISTS `huge`.`membrete` (
 `membrete_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
 `membrete_text` longtext NOT NULL,
 `institucion_id` int(11) unsigned NOT NULL,
 PRIMARY KEY (`membrete_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='user notes';
