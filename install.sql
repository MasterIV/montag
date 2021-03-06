-- phpMyAdmin SQL Dump
-- version 2.11.8.1deb5+lenny9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Erstellungszeit: 04. Mai 2012 um 14:57
-- Server Version: 5.0.51
-- PHP-Version: 5.2.6-1+lenny16

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Datenbank: `dev_montag`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `words`
--

CREATE TABLE IF NOT EXISTS `words` (
  `id` int(11) NOT NULL auto_increment,
  `word` varchar(32) NOT NULL,
  `game` int(10) unsigned NOT NULL,
  `occured` int(10) unsigned NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 ;

--
-- Daten für Tabelle `words`
--

INSERT INTO `words` (`id`, `word`, `game`, `occured`) VALUES
(1, 'Presslufthammer', 0, 3),
(2, 'Schaufelradbagger', 0, 4),
(3, 'Apfelkuchen', 0, 3),
(4, 'Palme', 0, 4),
(5, 'Kettensäge', 0, 4),
(6, 'Segelboot', 0, 3),
(7, 'Mast', 0, 4),
(8, 'Schiff', 0, 4),
(9, 'Strudel', 0, 4),
(10, 'Pfeiler', 0, 4),
(11, 'Zaun', 0, 4),
(12, 'Mauer', 0, 3),
(13, 'Ziegelstein', 0, 4),
(14, 'Dampfwalze', 0, 3),
(15, 'Atomkraftwerk', 0, 3),
(16, 'Gewitter', 0, 4),
(17, 'Blitz', 0, 4),
(18, 'Sturm', 0, 4),
(19, 'Wind', 0, 3),
(20, 'Kerze', 0, 4),
(21, 'Picknick', 0, 4),
(22, 'Unfall', 0, 3),
(23, 'Kaiser', 0, 3),
(24, 'Bischof', 0, 3),
(25, 'Nonne', 0, 4),
(26, 'Pinguin', 0, 4),
(27, 'Giraffe', 0, 4),
(28, 'Zebra', 0, 3),
(29, 'Löwe', 0, 3),
(30, 'Panter', 0, 3),
(31, 'Pionier', 0, 3),
(32, 'Forscher', 0, 4),
(33, 'Fahrrad', 0, 3),
(34, 'Postkarte', 0, 3),
(35, 'Briefträger', 0, 4),
(36, 'Adventskranz', 0, 3),
(37, 'Weihnachtsbaum', 0, 4),
(38, 'Dschungel', 0, 3),
(39, 'Biber', 0, 4),
(40, 'Computer', 0, 3),
(41, 'Tastatur', 0, 3),
(42, 'Schürze', 0, 4),
(43, 'Brecheisen', 0, 3),
(44, 'Fliege', 0, 4),
(45, 'Münze', 0, 3),
(46, 'Kühlschrank', 0, 4),
(47, 'Pizza', 0, 4),
(48, 'Pfannkuchen', 0, 3),
(49, 'Laubbaum', 0, 4),
(50, 'Kontinent', 0, 4),
(51, 'Polarlicht', 0, 3),
(52, 'Känguru', 0, 4),
(53, 'Monument', 0, 3),
(54, 'Ruine', 0, 4),
(55, 'Baustelle', 0, 3),
(56, 'Gerüst', 0, 4),
(57, 'Sandkasten', 0, 4),
(58, 'Schloss', 0, 3),
(59, 'Sonnenuntergang', 0, 4),
(60, 'Sonnenaufgang', 0, 4),
(61, 'Dämmerung', 0, 4),
(62, 'Feuerwehr', 0, 4),
(63, 'Krankenhaus', 0, 3),
(64, 'Polizei', 0, 3),
(65, 'Blaulicht', 0, 4),
(66, 'Panzer', 0, 4),
(67, 'Raumschiff', 0, 4),
(68, 'Flugzeug', 0, 3),
(69, 'Kuscheltier', 0, 4),
(70, 'Lattenrost', 0, 4),
(71, 'Rolladen', 0, 4),
(72, 'Explosion', 0, 3),
(73, 'Bunker', 0, 3),
(74, 'Bombe', 0, 4),
(75, 'Gewehr', 0, 4),
(76, 'Schusswaffe', 0, 4),
(77, 'Tennisschläger', 0, 4),
(78, 'Schwingschleifer', 0, 3),
(79, 'Schlange', 0, 4),
(80, 'Teller', 0, 4),
(81, 'Geschirr', 0, 3),
(82, 'Gabel', 0, 4),
(83, 'Messer', 0, 3),
(84, 'Besteck', 0, 3),
(85, 'Zylinder', 0, 4),
(86, 'Garage', 0, 3),
(87, 'Lastwagen', 0, 4),
(88, 'Sattel', 0, 3),
(89, 'Schraubenschlüssel', 0, 4),
(90, 'Turban', 0, 4),
(91, 'Krankenschwester', 0, 4),
(92, 'Infusion', 0, 4),
(93, 'Drucker', 0, 4),
(94, 'Netzwerk', 0, 4),
(95, 'Kutsche', 0, 3),
(96, 'Fallschirm', 0, 4),
(97, 'Hängebrücke', 0, 4),
(98, 'Wasserfall', 0, 4),
(99, 'Vulkan', 0, 3),
(100, 'Statue', 0, 3),
(101, 'Supermarkt', 0, 4),
(102, 'Einkaufswagen', 0, 3),
(103, 'Comic', 0, 4),
(104, 'Sprechblase', 0, 4),
(105, 'Zeitung', 0, 3),
(106, 'Kaffee', 0, 4),
(107, 'Eisenbahn', 0, 4),
(108, 'Güterzug', 0, 4),
(109, 'Marathon', 0, 4),
(110, 'Petersilie', 0, 3),
(111, 'Eisberg', 0, 4),
(112, 'Büroklammer', 0, 4),
(113, 'Locher', 0, 4),
(114, 'Lineal', 0, 3),
(115, 'Tacker', 0, 3),
(116, 'Telefon', 0, 3),
(117, 'Kamera', 0, 4),
(118, 'Drehbuch', 0, 3),
(119, 'Schauspieler', 0, 4),
(120, 'Lexikon', 0, 3),
(121, 'Ofen', 0, 4),
(122, 'Gemälde', 0, 4),
(123, 'Landschaft', 0, 4),
(124, 'Trampelpfad', 0, 4),
(125, 'Hochhaus', 0, 4),
(126, 'Baumhaus', 0, 4),
(127, 'Hubschrauber', 0, 4),
(128, 'Antenne', 0, 3),
(129, 'Fächer', 0, 3),
(130, 'Garderobe', 0, 3),
(131, 'Schwein', 0, 3),
(132, 'Nest', 0, 3),
(133, 'Nagel', 0, 4),
(134, 'Zange', 0, 3),
(135, 'Schwert', 0, 3),
(136, 'Schild', 0, 4),
(137, 'Wappen', 0, 4),
(138, 'Kettenhemd', 0, 3),
(139, 'Rüstung', 0, 3),
(140, 'Flaschenöffner', 0, 4),
(141, 'Dosenöffner', 0, 4),
(142, 'Mixer', 0, 4),
(143, 'Konzert', 0, 3),
(144, 'Geburtstag', 0, 4),
(145, 'Dunkelheit', 0, 4),
(146, 'Entsetzen', 0, 3),
(147, 'Flagge', 0, 3),
(148, 'Banner', 0, 3),
(149, 'Symbol', 0, 4),
(150, 'Nagetier', 0, 4),
(151, 'Seepferdchen', 0, 4),
(152, 'Eichhörnchen', 0, 4),
(153, 'Nasenbär', 0, 3),
(154, 'Kolibri', 0, 3),
(155, 'Virus', 0, 4),
(156, 'Bauer', 0, 3),
(157, 'Sense', 0, 4),
(158, 'Kettenraucher', 0, 4),
(159, 'Aschenbecher', 0, 3),
(160, 'Kindergarten', 0, 4),
(161, 'Paradies', 0, 3),
(162, 'Uhrzeiger', 0, 4),
(163, 'Gurkensalat', 0, 4),
(164, 'Mikrowelle', 0, 3),
(165, 'Ölscheich', 0, 4),
(166, 'Hausmeister', 0, 4),
(167, 'Schwarzarbeiter', 0, 3),
(168, 'Echo', 0, 4),
(169, 'Gletscher', 0, 4),
(170, 'Gladiator', 0, 4),
(171, 'Kuckucksuhr', 0, 4),
(172, 'Monsun', 0, 3),
(173, 'Eintrittskarte', 0, 3),
(174, 'Baumschule', 0, 3),
(175, 'Jetski', 0, 3),
(176, 'Kläranlage', 0, 3),
(177, 'Nudelholz', 0, 4),
(178, 'Lebertran', 0, 4),
(179, 'Netzhaut', 0, 4),
(180, 'Arbeitsspeicher', 0, 3),
(181, 'Bambus', 0, 3),
(182, 'Frühlingsrolle', 0, 3),
(183, 'Weihrauch', 0, 3),
(184, 'Heißluftballon', 0, 4),
(185, 'Bibliothek', 0, 4),
(186, 'Schluckauf', 0, 4),
(187, 'Ameisenhaufen', 0, 4),
(188, 'Pleitegeier', 0, 3),
(189, 'Firewall', 0, 4),
(190, 'Bushaltestelle', 0, 3),
(191, 'Radiomoderator', 0, 4),
(192, 'Sonnenfinsternis', 0, 3),
(193, 'Brieftaube', 0, 4),
(194, 'Heckenschere', 0, 4),
(195, 'Viagra', 0, 4),
(196, 'Dönertier', 0, 3),
(197, 'Pfefferkuchenhaus', 0, 4),
(198, 'Roboter', 0, 3),
(199, 'Anhänger', 0, 4),
(200, 'Gitarre', 0, 4),
(201, 'Diskette', 0, 4),
(202, 'Ampel', 0, 4),
(203, 'Tasse', 0, 4),
(204, 'Steckdose', 0, 4),
(205, 'Schokolade', 0, 4),
(206, 'Angel', 0, 3),
(207, 'Knochen', 0, 3),
(208, 'Anker', 0, 4),
(209, 'Riesenrad', 0, 4),
(210, 'Kamel', 0, 3),
(211, 'Zigarette', 0, 3),
(212, 'Löffel', 0, 3),
(213, 'Hosenträger', 0, 3),
(214, 'Apfel', 0, 4),
(215, 'Birne', 0, 4),
(216, 'Fußballplatz', 0, 4),
(217, 'Schraube', 0, 3),
(218, 'Telefon', 0, 4),
(219, 'Nadel', 0, 4),
(220, 'Streichholz', 0, 4),
(221, 'Dose', 0, 4),
(222, 'Herd', 0, 3),
(223, 'Bügeleisen', 0, 4),
(224, 'Fernbedienung', 0, 4),
(225, 'Pilz', 0, 4),
(226, 'Glocke', 0, 4),
(227, 'Sonnenblume', 0, 4),
(228, 'Hufeisen', 0, 4),
(229, 'Flöte', 0, 4),
(230, 'Thermometer', 0, 4),
(231, 'Tischdecke', 0, 4),
(232, 'Krawatte', 0, 3),
(233, 'Gießkanne', 0, 4),
(234, 'Drache', 0, 4),
(235, 'Fotoapparat', 0, 3),
(236, 'Sanduhr', 0, 3),
(237, 'Strohhalm', 0, 4),
(238, 'Raupe', 0, 4),
(239, 'Welle', 0, 4),
(240, 'Stacheldraht', 0, 3),
(241, 'Brücke', 0, 4),
(242, 'Pfeife', 0, 3),
(243, 'Kaktus', 0, 3),
(244, 'Pyramide', 0, 4),
(245, 'Telefonzelle', 0, 4),
(246, 'Schlüssel', 0, 4),
(247, 'Fernglas', 0, 3),
(248, 'Schnabel', 0, 4),
(249, 'Fernseher', 0, 3),
(250, 'Schnecke', 0, 4),
(251, 'Koffer', 0, 3),
(252, 'Achterbahn', 0, 3),
(253, 'Lutscher', 0, 4),
(254, 'Pistole', 0, 4),
(255, 'Lokomotive', 0, 4),
(256, 'Ohrring', 0, 4),
(257, 'Gürtel', 0, 4),
(258, 'Sonnenbrille', 0, 3),
(259, 'Hundehütte', 0, 3),
(260, 'Fön', 0, 4),
(261, 'Wurst', 0, 4),
(262, 'Toilettenpapier', 0, 3),
(263, 'Spinne', 0, 3),
(264, 'Füller', 0, 4),
(265, 'Bilderrahmen', 0, 4),
(266, 'Glühbirne', 0, 3),
(267, 'Kinderwagen', 0, 3),
(268, 'Schildkröte', 0, 4),
(269, 'Taschenlampe', 0, 3),
(270, 'Kirschbaum', 0, 3),
(271, 'Kleeblatt', 0, 4),
(272, 'Feuerzeug', 0, 4),
(273, 'Zunge', 0, 4),
(274, 'Kopfhörer', 0, 3),
(275, 'Sonnenschirm', 0, 4),
(276, 'Hundeleine', 0, 4),
(277, 'Kreissäge', 0, 4),
(278, 'Bleistift', 0, 4),
(279, 'Blumenvase', 0, 3),
(280, 'Zahn', 0, 3),
(281, 'Lenkrad', 0, 4),
(282, 'Stiefel', 0, 3),
(283, 'Schlittschuh', 0, 4),
(284, 'Note', 0, 4),
(285, 'Handschellen', 0, 4),
(286, 'Leuchtturm', 0, 3),
(287, 'Angelhaken', 0, 4),
(288, 'Bank', 0, 4),
(289, 'Taschenmesser', 0, 3),
(290, 'Luftballon', 0, 4),
(291, 'Querflöte', 0, 4),
(292, 'Cassette', 0, 4),
(293, 'Wäscheklammer', 0, 4),
(294, 'Laterne', 0, 3),
(295, 'Fingerhut', 0, 3),
(296, 'Pflaster', 0, 4),
(297, 'Kaffeemaschine', 0, 3),
(298, 'Wasserhahn', 0, 4),
(299, 'Torte', 0, 4),
(300, 'Kette', 0, 3),
(301, 'Türklinke', 0, 3),
(302, 'Blüte', 0, 4),
(303, 'Wohnwagen', 0, 3),
(304, 'Schmetterling', 0, 4),
(305, 'Handschuh', 0, 4),
(306, 'Zahnbürste', 0, 4),
(307, 'Regenbogen', 0, 3),
(308, 'Taschenrechner', 0, 4),
(309, 'Zahncreme', 0, 4),
(310, 'Mikrofon', 0, 3),
(311, 'Vorhang', 0, 3),
(312, 'Kerzenständer', 0, 3),
(313, 'Zebrastreifen', 0, 4),
(314, 'Geige', 0, 4),
(315, 'Fingernagel', 0, 4),
(316, 'Untertasse', 0, 3),
(317, 'Zollstock', 0, 4),
(318, 'Trecker', 0, 4),
(319, 'Sparschwein', 0, 4),
(320, 'Kirsche', 0, 3),
(321, 'Armbanduhr', 0, 3),
(322, 'Bratpfanne', 0, 3),
(323, 'Säge', 0, 3),
(324, 'Augenbrauen', 0, 4),
(325, 'Regenschirm', 0, 3),
(326, 'Schornstein', 0, 4),
(327, 'Ente', 0, 4),
(328, 'Regentropfen', 0, 4),
(329, 'Lineal', 0, 4),
(330, 'Telefonbuch', 0, 4),
(331, 'Schere', 0, 4),
(332, 'Geist', 0, 3),
(333, 'Tafel', 0, 4),
(334, 'Trommel', 0, 4),
(335, 'Spiegelei', 0, 4),
(336, 'Regentonne', 0, 3),
(337, 'Briefmarke', 0, 3),
(338, 'Trompete', 0, 4),
(339, 'Schubkarre', 0, 4),
(340, 'Pauke', 0, 4),
(341, 'Feder', 0, 4),
(342, 'Käfig', 0, 4),
(343, 'Bleifuß', 0, 4),
(344, 'Boxer', 0, 4),
(345, 'Burgfräulein', 0, 4),
(346, 'Detektiv', 0, 4),
(347, 'Dirigent', 0, 3),
(348, 'Dompteur', 0, 4),
(349, 'Drehwurm', 0, 4),
(350, 'Einbrecher', 0, 4),
(351, 'Elvis', 0, 4),
(352, 'Eskimo', 0, 4),
(353, 'Fahrradkette', 0, 4),
(354, 'Fee', 0, 3),
(355, 'Flaschenhals', 0, 4),
(356, 'Fliegenfänger', 0, 3),
(357, 'Flohzirkus', 0, 4),
(358, 'Folterkammer', 0, 3),
(359, 'Friseuse', 0, 3),
(360, 'Frosch', 0, 4),
(361, 'Gabelstapler', 0, 4),
(362, 'Gangschaltung', 0, 3),
(363, 'Hexe', 0, 4),
(364, 'Indianer', 0, 4),
(365, 'Klobrille', 0, 3),
(366, 'Lehrer', 0, 4),
(367, 'Gruft', 0, 3),
(368, 'Matrose', 0, 4),
(369, 'Maurer', 0, 3),
(370, 'Operation', 0, 4),
(371, 'Pfarrer', 0, 3),
(372, 'Autorennen', 0, 3),
(373, 'Riese', 0, 3),
(374, 'Kolosseum', 0, 4),
(375, 'Spion', 0, 4),
(376, 'Sumoringer', 0, 4),
(377, 'Tänzerin', 0, 4),
(378, 'Wagenheber', 0, 4),
(379, 'Zahnarzt', 0, 4),
(380, 'Zugbrücke', 0, 3),
(381, 'Zwerg', 0, 3),
(382, 'Baby', 0, 4),
(383, 'Axt', 0, 3),
(384, 'Elefant', 0, 4);


CREATE TABLE `user` (
`id` INT NOT NULL auto_increment,
`fb_uid` BIGINT NOT NULL ,
`score` INT NOT NULL ,
`name` VARCHAR( 64 ) NOT NULL ,
`last_seen` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY  (`id`)
) ENGINE = MYISAM DEFAULT CHARSET=utf8 ;


CREATE TABLE  `stats` (
`ip` VARCHAR( 16 ) NOT NULL ,
`time` INT NOT NULL ,
`count` INT NOT NULL
) ENGINE = MYISAM DEFAULT CHARSET=utf8 ;
ALTER TABLE  `stats` ADD INDEX (  `time` )