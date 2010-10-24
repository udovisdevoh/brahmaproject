SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

CREATE TABLE IF NOT EXISTS `ai_units` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `key_name` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `user_profile_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `key_name` (`key_name`),
  KEY `user_profile_id` (`user_profile_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;


CREATE TABLE IF NOT EXISTS `ai_unit_states` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `data` longblob NOT NULL,
  `modified` datetime NOT NULL,
  `ai_unit_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ai_unit_id` (`ai_unit_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;


CREATE TABLE IF NOT EXISTS `user_profiles` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `key_name` varchar(248) NOT NULL,
  `name` varchar(248) NOT NULL,
  `password` varchar(40) NOT NULL,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name` (`user_name`),
  UNIQUE KEY `key_name` (`key_name`),
  KEY `user_name_and_password` (`user_name`,`password`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;