SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


CREATE TABLE IF NOT EXISTS `ai_unit` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `rate_up` int(10) NOT NULL,
  `rate_down` int(10) NOT NULL,
  `avatar_id` int(10) unsigned NOT NULL,
  `user_profile_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `user_profile_id` (`user_profile_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;


CREATE TABLE IF NOT EXISTS `connection` (
  `ai_unit_id` int(10) unsigned NOT NULL,
  `subject` varchar(100) NOT NULL,
  `verb` varchar(100) NOT NULL,
  `complement` varchar(100) NOT NULL,
  `is_true` tinyint(1) NOT NULL DEFAULT '1',
  `is_tautologic` tinyint(1) NOT NULL DEFAULT '0',
  UNIQUE KEY `ai_unit_id` (`ai_unit_id`,`subject`,`verb`,`complement`),
  KEY `complement_2` (`complement`,`verb`),
  KEY `subject_2` (`subject`,`verb`),
  KEY `complement` (`complement`),
  KEY `verb` (`verb`),
  KEY `subject` (`subject`),
  KEY `ai_unit_id_2` (`ai_unit_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `user_daily_rating` (
  `user_profile_rater_id` int(10) unsigned NOT NULL,
  `ai_unit_rated_id` int(10) unsigned NOT NULL,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_up` tinyint(1) NOT NULL,
  `ip` varchar(255) NOT NULL,
  UNIQUE KEY `user_profile_rater_id` (`user_profile_rater_id`,`ai_unit_rated_id`),
  KEY `user_profile_rater_id_2` (`user_profile_rater_id`,`ai_unit_rated_id`,`modified`),
  KEY `ip` (`ip`,`ai_unit_rated_id`,`modified`),
  KEY `ai_unit_rated_id` (`ai_unit_rated_id`,`modified`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `user_profile` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(248) NOT NULL,
  `password` varchar(40) NOT NULL,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name` (`name`),
  UNIQUE KEY `email` (`email`),
  KEY `user_name_and_password` (`name`,`password`,`is_active`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;