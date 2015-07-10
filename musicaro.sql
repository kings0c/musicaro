-- phpMyAdmin SQL Dump
-- version 4.4.6.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 10, 2015 at 01:36 AM
-- Server version: 5.6.24
-- PHP Version: 5.6.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `musicaro`
--

-- --------------------------------------------------------

--
-- Table structure for table `track_library`
--

CREATE TABLE IF NOT EXISTS `track_library` (
  `track_id` int(11) NOT NULL,
  `title` text NOT NULL,
  `album` text NOT NULL,
  `artist` text NOT NULL,
  `duration` text NOT NULL,
  `md5` text NOT NULL,
  `path` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `track_library`
--

INSERT INTO `track_library` (`track_id`, `title`, `album`, `artist`, `duration`, `md5`, `path`) VALUES
(1, 'Whispers (Part I)', 'Deliverance', 'Culprate', '6:05', '6934bf2a534b3a6113c534f191e6b699', '/Users/ings0c/Documents/Websites/musicaro/library/Culprate - Deliverance [2014]/01 Whispers (Part I).mp3'),
(2, 'Florn', 'Deliverance', 'Culprate', '4:02', 'de52c5f2ce7a4e4f26206f3283f81b83', '/Users/ings0c/Documents/Websites/musicaro/library/Culprate - Deliverance [2014]/02 Florn.mp3'),
(3, 'The Memoirs Of Gregory Otterman', 'Deliverance', 'Culprate', '3:45', '4298a4ad40327d7182f2aecab3af73cd', '/Users/ings0c/Documents/Websites/musicaro/library/Culprate - Deliverance [2014]/03 The Memoirs Of Gregory Otterman.mp3'),
(4, 'Acid Rain', 'Deliverance', 'Culprate', '4:14', 'b2c9ad22f646716bc689e72b73e082ae', '/Users/ings0c/Documents/Websites/musicaro/library/Culprate - Deliverance [2014]/04 Acid Rain.mp3'),
(5, 'In The End', 'Deliverance', 'Culprate', '5:08', 'c5d82c247446a6802e570bcbf7d56c43', '/Users/ings0c/Documents/Websites/musicaro/library/Culprate - Deliverance [2014]/05 In The End.mp3'),
(6, 'Void', 'Deliverance', 'Culprate', '3:15', '5e0f0645fae15f58ed548a1e726f3da6', '/Users/ings0c/Documents/Websites/musicaro/library/Culprate - Deliverance [2014]/06 Void.mp3'),
(7, 'Without', 'Deliverance', 'Culprate', '4:10', 'ca556dc061fd65079efb29bbd962b72a', '/Users/ings0c/Documents/Websites/musicaro/library/Culprate - Deliverance [2014]/07 Without.mp3'),
(8, 'Within', 'Deliverance', 'Culprate', '4:18', '9b9bd134b103233ddaff28027b3b7526', '/Users/ings0c/Documents/Websites/musicaro/library/Culprate - Deliverance [2014]/08 Within.mp3'),
(9, 'Yin', 'Deliverance', 'Culprate', '8:24', '446abc01ee02e494ca1ed58128756e88', '/Users/ings0c/Documents/Websites/musicaro/library/Culprate - Deliverance [2014]/09 Yin.mp3'),
(10, 'Whispers (Part II)', 'Deliverance', 'Culprate', '5:35', '3a916c1805bf48c127a95725fb67461f', '/Users/ings0c/Documents/Websites/musicaro/library/Culprate - Deliverance [2014]/10 Whispers (Part II).mp3'),
(11, 'Chainsaw Calligraphy (Jakes Remix)', 'Dubstep Collection 11', '16 &#194;it', '5:30', 'af1d3b986bfc018b36d44ec095da6bc3', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/16 Bit - Chainsaw Calligraphy (Jakes Remix).mp3'),
(12, 'M Dot Mosley', 'Dubstep Collection 11', '16 Bit', '4:21', '93e75ba520244c9a8d8b6bb695c73339', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/16 Bit - M Dot Mosley.mp3'),
(13, 'Incognito', 'Dubstep Collection 11', '501', '5:00', 'bcafe70c1cad10714710c449f1217ef3', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/501 - Incognito.mp3'),
(14, 'Solitaire', 'Dubstep Collection 11', '501', '4:53', '628d1080547d7a5ec28fd794c6b2fb85', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/501 - Solitaire.mp3'),
(15, 'Rambo Style', 'Dubstep Collection 11', 'Antiserum', '4:05', 'fb51d84efa6c149d46b550d4b9dcf69a', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/Antiserum - Rambo Style.mp3'),
(16, 'You Know We Do It Big Girl (Tonka Remix)', 'Dubstep Collection 11', 'Aquasky Ft Slips &amp; Dapz', '4:31', 'fdfd63028bb9c2cabc700a252b0b85b8', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/Aquasky Ft Slips and Dapz - U Know We Do It Big Girl (Tonka Nu Rave RMX).mp3'),
(17, 'Midnight', 'Dubstep Collection 11', 'Bar 9', '4:52', '8f7f4dfb8cd74487f953d1aa068cad47', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/Bar9 - Midnight.mp3'),
(18, 'Cozza Frenzy (Bassnectar Mega-Bass Remix)', 'Dubstep Collection 11', 'Bassnectar', '6:40', '3a128f2178f622e33102b139251914bd', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/Bassnectar - Cozza Frenzy (Bassnectar Dubstep Remix).mp3'),
(19, 'Blast Off', 'Dubstep Collection 11', 'Bassnectar and Jantsen', '6:11', 'c28a2a65f178f1b3002dcf94add7fe56', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/Bassnectar and Jantsen - Blast Off.mp3'),
(20, 'Smash the Empire', 'Dubstep Collection 11', 'Ben Sage', '6:28', '4ff50564876b019b15ad33c67c1d4390', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/Ben Sage - Smash the Empire.mp3'),
(21, 'Foes (16 Bit Fuck Hoes Remix)', 'Dubstep Collection 11', 'Borgore', '4:35', '38c849b0f8eb9900c9bec1a54eed53d4', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/Borgore - Foes (16 Bit Fuck Hoes Remix).mp3'),
(22, 'Ice Cream', 'Dubstep Collection 11', 'Borgore', '3:58', 'e09078355b2366ea251938ed0bcdb144', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/Borgore - Ice Cream.mp3'),
(23, 'Painkillers', 'Dubstep Collection 11', 'Brown, Gammon', '6:30', '46971c487d1181c88dbd3d79a55ff428', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/Brown, Gammon - Painkillers.mp3'),
(24, 'Unite', 'Dubstep Collection 11', 'Burial', '5:01', '97704e48f5de307ea713cfc64dffd554', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/Burial - Unite.mp3'),
(25, 'A. The Terminator', 'Dubstep Collection 11', 'Caspa', '4:19', 'c09bab9f666142be8e16e8b6af3d6fcc', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/Caspa - The Terminator.mp3'),
(26, 'Cracks in the Organ', 'Dubstep Collection 11', 'Daladubz', '4:20', '3f303be3e038d0c22586a6c2db4f2e6a', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/Daladubz - Cracks in the Organ.mp3'),
(27, 'Game Over (Original Mix)', 'Dubstep Collection 11', 'Datsik, Flux Pavillion', '5:09', '7805f11d691ac40c5e575091d4e1f907', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/Datsik, Flux Pavillion - Game Over (Original Mix).mp3'),
(28, 'Hypercaine (Nero Dubstep Mix)', 'Dubstep Collection 11', 'DJ Fresh feat Stamina MC &amp; Koko', '5:37', '4215c7645ed89b3b6f46416079c3c707', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/DJ Fresh feat Stamina MC and Koko - Hypercaine (Nero Dubstep Mix).mp3'),
(29, 'Badman Sound', 'Dubstep Collection 11', 'Doctor P', '4:37', '5a10506450627951a2c469106ca36803', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/Doctor P - Badman Sound.mp3'),
(30, 'Sweet Shop', 'Dubstep Collection 11', 'Doctor P', '4:34', 'cc59a4c490718facda6bf88dbc5873d9', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/Doctor P - Sweet Shop.mp3'),
(31, 'Hooligans (Doorly''s Dubstep Remix)', 'Dubstep Collection 11', 'Don Diablo  &amp; Example', '4:25', '5ca46fa5c4dacc3912b405529df672ac', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/Don Diablo and Example - Hooligans (Doorlys Remix).mp3'),
(32, 'Oooh', 'Dubstep Collection 11', 'DZ', '5:34', 'bbc446807e7610a5f34144b3474ff395', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/DZ - Oooh.mp3'),
(33, 'Overshine', 'Dubstep Collection 11', 'Emalkay And Afterdark', '6:26', 'ccb7ce8be2d9326985fc8b28caacd0e8', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/Emalkay And Afterdark - Overshine.mp3'),
(34, 'Bodywrap', 'Dubstep Collection 11', 'F-One', '4:57', '249c124e080e8b699272baafd55d52fe', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/F-One - Bodywrap.mp3'),
(35, 'Voscillate (Roksonix Remix)', 'Dubstep Collection 11', 'Flux Pavilion', '6:05', '7e8f34e1e7a3c092eee7cdd7b22809b9', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/Flux Pavilion - Voscillate (Roksonix Remix).mp3'),
(36, 'Night Goes On', 'Dubstep Collection 11', 'Flux Pavillion', '5:44', '8c72b997c02436788d76fb6c76617fed', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/Flux Pavillion - Night Goes On.mp3'),
(37, 'Youth Blood (12th Planet &amp; Fli&#1089;h)', 'Dubstep Collection 11', 'Jinder', '4:21', 'a9f267dcb05bc7e7c4ab4ce2bba006dd', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/Jinder - Youth Blood (12th Planet and Flinch Remix).mp3'),
(38, 'Badman Riddim', 'Dubstep Collection 11', 'JSL', '4:52', '065223e7d23870d9d82fe190d748e612', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/JSL - Badman Riddim.mp3'),
(39, 'Skin Out', 'Dubstep Collection 11', 'JSL', '3:59', '35e62bb0309fcf3b827b1a6defff33d6', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/JSL - Skin Out.mp3'),
(40, 'Matrix', 'Dubstep Collection 11', 'Kromestar', '4:08', 'aa2f5a651e99fb65cf617db7c84f1cc7', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/Kromestar - Matrix.mp3'),
(41, 'Bulletproof (Foamo''s Dubstep Remix)', 'Dubstep Collection 11', 'La Roux', '5:10', '4edfbe700df32cf5a8ee6532623322cd', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/La Roux - Bulletproof (Foamos Dubstep Remix).mp3'),
(42, 'Tigerlily (B. Rich Remix)', 'Dubstep Collection 11', 'La Roux', '4:13', '9ff681f2ceb10d06e53299bde4df6aa6', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/La Roux - Tigerlily (B. Rich Remix).mp3'),
(43, 'Heartbreak (Bare Noize Remix)', 'Dubstep Collection 11', 'M''Black', '4:00', '114c45252aca26dd4fe05e37ef956475', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/M''Black - Heartbreak (Bare Noize Remix).mp3'),
(44, 'Indisco (Bar9 Mix)', 'Dubstep Collection 11', 'Nick Correlli And Tom Piper', '4:46', '3edab8215ca669c872283472d3907894', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/Nick Correlli and Tom Piper - Indisco (Bar9 Remix).mp3'),
(45, 'Heartbeat (Chase &amp; Status Remix)', 'Dubstep Collection 11', 'Nneka', '3:56', '3ceb394a2aeec0ff63e3bbdbb8df1e44', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/Nneka - Heartbeat (Chase & Status Remix).mp3'),
(46, 'Watercolour (Emalkay Remix)', 'Dubstep Collection 11', 'Pendulum', '5:08', '24de26e709e2547cb92767abb182f25b', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/Pendulum - Watercolour (Emalkay Remix).mp3'),
(47, 'I Know You Want Me (Evol Intent Remix)', 'Dubstep Collection 11', 'Pitbull', '5:06', '37a1c5bd2460e62d23b7378cf7d3ccf0', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/Pitbull - I Know You Want Me (Evol Intent Remix).mp3'),
(48, 'Warning (Eddie K Dubstep Remix)', 'Dubstep Collection 11', 'Prime Cuts and Dynamite MC', '4:09', '5106661e1d78a8bec38d160c21c23196', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/Prime Cuts and Dynamite MC - Warning (Eddie K Dubstep Remix).mp3'),
(49, 'Deep Inside', 'Dubstep Collection 11', 'Quest', '6:05', '1dc6d641dfdc9d2cc42e69bd3920466f', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/Quest - Deep Inside.mp3'),
(50, 'What U Gonna Do ft. Zurcon (NumberNin6 Remix)', 'Dubstep Collection 11', 'Rob Sparx', '5:10', '77d39c238503cf93d3c878a90a541a1d', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/Rob Sparx - What U Gonna Do ft. Zurcon (NumberNin6 Remix).mp3'),
(51, 'Mr Chips (Original Mix)', 'Dubstep Collection 11', 'Rusko', '4:39', 'd9058338e4e9773ffe992d16bc05df33', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/Rusko - Mr Chips (Original Mix).mp3'),
(52, 'Cruel Intentions (feat. Beth Ditto) (Joker Remix)', 'Dubstep Collection 11', 'Simian Mobile Disco', '4:12', 'f368f0b3c9a546ae6faca3abafe3330d', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/Simian Mobile Disco - Cruel Intentions (feat. Beth Ditto) (Joker Remix).mp3'),
(53, 'The Blank (16 Bit Remix)', 'Dubstep Collection 11', 'Skism', '4:34', '7e3db347de3906bab8fa5ecb17e67be5', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/Skism - The Blank (16 Bit Remix).mp3'),
(54, 'Sandsnake (Gothtrad Remix)', 'Dubstep Collection 11', 'Skream &amp; Cluekid', '5:37', 'aed12a8205030027091b0bf4b6fbaf40', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/Skream and Cluekid - Sandsnake (Gothtrad Remix).mp3'),
(55, 'Coming Closer (feat Takura)', 'Dubstep Collection 11', 'Sub Focus', '3:36', '515918adc27c62de23a24577da19d8a4', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/Sub Focus - Coming Closer (feat. Takura).mp3'),
(56, 'Broken String', 'Dubstep Collection 11', 'Tek-One', '4:05', '0ba7db6734a99570ff3b70e93acec4f9', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/Tek-One - Broken String.mp3'),
(57, 'Breathe (NumberNin6 Dubstep mix)', 'Dubstep Collection 11', 'The Prodigy', '6:05', 'e7e5bfa0c115b484a34af41889ca0bea', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/The Prodigy - Breathe (NumberNin6 Dubstep mix).mp3'),
(58, 'Voodoo People (Wonder Remix)', 'Dubstep Collection 11', 'The Prodigy', '4:15', '50a9eb3bc1f13d951530310fc0aabc47', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/The Prodigy - Voodoo People (Wonder Remix).mp3'),
(59, 'Warrior''s Dance (Benga Remix)', 'Dubstep Collection 11', 'The Prodigy', '4:46', 'c3ec3ed6b7ddceee29248d3585d7c563', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/The Prodigy - Warriors Dance (Benga Remix).mp3'),
(60, 'We Rock The Forest', 'Dubstep Collection 11', 'Trolley Snatcha', '4:21', 'c2935c937cafee456a67f1f88e6538af', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/Trolley Snatcha - We Rock The Forest.mp3'),
(61, 'Strike', 'Forgotten Myths', 'KOAN Sound', '5:24', '1036e0b655ea6667ba2f1a2e01e0a908', '/Users/ings0c/Documents/Websites/musicaro/library/KOAN Sound - Forgotten Myths/KOAN Sound - Forgotten Myths - 01 Strike.flac'),
(62, 'Sentient', 'Forgotten Myths', 'KOAN Sound', '4:08', '64998b69a9580b625e0389c4d953cc61', '/Users/ings0c/Documents/Websites/musicaro/library/KOAN Sound - Forgotten Myths/KOAN Sound - Forgotten Myths - 02 Sentient.flac'),
(63, 'Forgotten Myths', 'Forgotten Myths', 'KOAN Sound', '4:31', 'bc7933f58263e796c5ffb450155f6ee1', '/Users/ings0c/Documents/Websites/musicaro/library/KOAN Sound - Forgotten Myths/KOAN Sound - Forgotten Myths - 03 Forgotten Myths.flac'),
(64, 'View From Above', 'Forgotten Myths', 'KOAN Sound', '5:37', '3026f67b1e1b979f7c84e89d6549d08c', '/Users/ings0c/Documents/Websites/musicaro/library/KOAN Sound - Forgotten Myths/KOAN Sound - Forgotten Myths - 04 View From Above.flac'),
(65, 'Holy Wars... The Punishment Due', 'Rust In Peace', 'Megadeth', '6:36', '10cc2e881fae7f1afb8e4c2e4626cd5a', '/Users/ings0c/Documents/Websites/musicaro/library/Megadeth - 1990 - Rust In Peace/CD/01. Holy Wars... The Punishment Due.mp3'),
(66, 'Hangar 18', 'Rust In Peace', 'Megadeth', '5:15', '84737a30a1a0a25561e3a1a9a57bf473', '/Users/ings0c/Documents/Websites/musicaro/library/Megadeth - 1990 - Rust In Peace/CD/02. Hangar 18.mp3'),
(67, 'Take No Prisoners', 'Rust In Peace', 'Megadeth', '3:29', '14b771b3cfc2479a7a13538ea1447b24', '/Users/ings0c/Documents/Websites/musicaro/library/Megadeth - 1990 - Rust In Peace/CD/03. Take No Prisoners.mp3'),
(68, 'Five Magics', 'Rust In Peace', 'Megadeth', '5:43', '64fce86d4ea3c3945192a1fbe8c68fee', '/Users/ings0c/Documents/Websites/musicaro/library/Megadeth - 1990 - Rust In Peace/CD/04. Five Magics.mp3'),
(69, 'Poison Was The Cure', 'Rust In Peace', 'Megadeth', '2:59', '88f0302b3bb5180183246167deb1b34f', '/Users/ings0c/Documents/Websites/musicaro/library/Megadeth - 1990 - Rust In Peace/CD/05. Poison Was The Cure.mp3'),
(70, 'Lucretia', 'Rust In Peace', 'Megadeth', '3:58', 'ee479f6faae6c14382d0557eddbcd9ab', '/Users/ings0c/Documents/Websites/musicaro/library/Megadeth - 1990 - Rust In Peace/CD/06. Lucretia.mp3'),
(71, 'Tornado Of Souls', 'Rust In Peace', 'Megadeth', '5:23', 'ab79ff0f1e78c55f23e46b3c6abf391e', '/Users/ings0c/Documents/Websites/musicaro/library/Megadeth - 1990 - Rust In Peace/CD/07. Tornado Of Souls.mp3'),
(72, 'Dawn Patrol', 'Rust In Peace', 'Megadeth', '1:51', '6d9bc4005dd28e5ffbed60be222e9319', '/Users/ings0c/Documents/Websites/musicaro/library/Megadeth - 1990 - Rust In Peace/CD/08. Dawn Patrol.mp3'),
(73, 'Rust In Peace... Polaris', 'Rust In Peace', 'Megadeth', '5:37', '4c89a96b1963c8f6e3ac5f37c806055b', '/Users/ings0c/Documents/Websites/musicaro/library/Megadeth - 1990 - Rust In Peace/CD/09. Rust In Peace... Polaris.mp3'),
(74, 'Jaws of Life', 'Suspended Animation', 'John Petrucci', '7:29', 'ac8db25826a34eae7f8338660c138e31', '/Users/ings0c/Documents/Websites/musicaro/library/Suspended Animation/01 - Jaws of Life.mp3'),
(75, 'Glasgow Kiss', 'Suspended Animation', 'John Petrucci', '7:49', '688f0956a4efc00abf96d73605f46fcb', '/Users/ings0c/Documents/Websites/musicaro/library/Suspended Animation/02 - Glasgow Kiss.mp3'),
(76, 'Tunnel Vision', 'Suspended Animation', 'John Petrucci', '6:35', 'afd550101dbbe726f06047d0887384ba', '/Users/ings0c/Documents/Websites/musicaro/library/Suspended Animation/03 - Tunnel Vision.mp3'),
(77, 'Wishful Thinking', 'Suspended Animation', 'John Petrucci', '7:29', '7a4519112e01188b95215cc0f2e71367', '/Users/ings0c/Documents/Websites/musicaro/library/Suspended Animation/04 - Wishful Thinking.mp3'),
(78, 'Damage Control', 'Suspended Animation', 'John Petrucci', '9:15', '13136a76b46d1e63c0c26834bc0443b5', '/Users/ings0c/Documents/Websites/musicaro/library/Suspended Animation/05 - Damage Control.mp3'),
(79, 'Curve', 'Suspended Animation', 'John Petrucci', '6:23', '47ab3584308ee6387bbb640fd09a4f90', '/Users/ings0c/Documents/Websites/musicaro/library/Suspended Animation/06 - Curve.mp3'),
(80, 'Lost Without You', 'Suspended Animation', 'John Petrucci', '4:56', '70ce7242a672d092348a0537b42c31cb', '/Users/ings0c/Documents/Websites/musicaro/library/Suspended Animation/07 - Lost Without You.mp3'),
(81, 'Animate-Inanimate', 'Suspended Animation', 'John Petrucci', '11:38', '9e31305b3e85c9aa4524cf5f8e04e0f2', '/Users/ings0c/Documents/Websites/musicaro/library/Suspended Animation/08 - Animate-Inanimate.mp3'),
(82, 'Ghost Town', 'Foul Play Dubstep Elite Forces EP', 'Suspicious Stench', '4:30', '0bd37427f8f65f0cf74acd44adbf02e2', '/Users/ings0c/Documents/Websites/musicaro/library/Suspicious Stench - Ghost Town.mp3'),
(83, 'Eon Blue apocalypse', 'Lateralus', 'Tool', '1:05', 'cf9e0218fb46e58bc0e05c5adb7c6c7b', '/Users/ings0c/Documents/Websites/musicaro/library/Tool/02 Eon Blue apocalypse.mp3'),
(84, 'The Patient', 'Lateralus', 'Tool', '7:14', 'b5838d6866c3b352efa4f3dce60c4935', '/Users/ings0c/Documents/Websites/musicaro/library/Tool/03 The Patient.mp3'),
(85, 'Mantra', 'Lateralus', 'Tool', '1:13', '5a981d3c1b53a155bc577f7dee5f0c39', '/Users/ings0c/Documents/Websites/musicaro/library/Tool/04 Mantra.mp3'),
(86, 'Schism', 'Lateralus', 'Tool', '6:47', 'f74265e9d48ae251a9bb839827244b72', '/Users/ings0c/Documents/Websites/musicaro/library/Tool/05 Schism.mp3'),
(87, 'Parabol', 'Lateralus', 'Tool', '3:04', 'fdf1f665004c1fad79c8d0af2eda0301', '/Users/ings0c/Documents/Websites/musicaro/library/Tool/06 Parabol.mp3'),
(88, 'Parabola', 'Lateralus', 'Tool', '6:03', '3413a9fae2f9a4bdcb1e762ba1cd1d37', '/Users/ings0c/Documents/Websites/musicaro/library/Tool/07 Parabola.mp3'),
(89, 'Ticks &amp; Leeches', 'Lateralus', 'Tool', '8:10', 'a59241aafd9e75e45db0a9ff7a078d80', '/Users/ings0c/Documents/Websites/musicaro/library/Tool/08 Ticks & Leeches.mp3'),
(90, 'Lateralus', 'Lateralus', 'Tool', '9:24', '78a1a0c3e51fdedbd7b9f085acda8dc4', '/Users/ings0c/Documents/Websites/musicaro/library/Tool/09 Lateralus.mp3'),
(91, 'Disposition', 'Lateralus', 'Tool', '4:46', '51ada95a0e03a2aad1d002e4c8848596', '/Users/ings0c/Documents/Websites/musicaro/library/Tool/10 Disposition.mp3'),
(92, 'Reflection', 'Lateralus', 'Tool', '11:07', 'e052bb2b0278f36750e650b8e806b016', '/Users/ings0c/Documents/Websites/musicaro/library/Tool/11 Reflection.mp3'),
(93, 'Triad', 'Lateralus', 'Tool', '8:46', '8db2c484f80b5c054c6f2d1573ba43e1', '/Users/ings0c/Documents/Websites/musicaro/library/Tool/12 Triad.mp3'),
(94, 'Faap de Oaid', 'Lateralus', 'Tool', '2:39', '31f808e2772dcc398323a3965a8cc7de', '/Users/ings0c/Documents/Websites/musicaro/library/Tool/13 Faap de Oaid.mp3'),
(95, 'Dark &amp; Long (Remastered)', 'Underworld &#150; Dubnobasswithmyhe', 'Underworld', '7:33', 'bda6f9d715cce4da801589b904887489', '/Users/ings0c/Documents/Websites/musicaro/library/Underworld - Dubnobasswithmyheadman (DeLuxe Remastered 2014)/CD1/01. Underworld - Dark & Long (Remastered).mp3'),
(96, 'Mmm... Skyscraper I Love You (Remastered)', 'Underworld &#150; Dubnobasswithmyhe', 'Underworld', '13:11', '646f7bbed411176a318529e0ac18aa5d', '/Users/ings0c/Documents/Websites/musicaro/library/Underworld - Dubnobasswithmyheadman (DeLuxe Remastered 2014)/CD1/02. Underworld - Mmm...Skyscraper I Love You (Remastered).mp3'),
(97, 'Surfboy (Remastered)', 'Underworld &#150; Dubnobasswithmyhe', 'Underworld', '7:42', 'b50ebbe6c4e732b358e47b2498385439', '/Users/ings0c/Documents/Websites/musicaro/library/Underworld - Dubnobasswithmyheadman (DeLuxe Remastered 2014)/CD1/03. Underworld - Surfboy (Remastered).mp3'),
(98, 'Spoonman (Remastered)', 'Underworld &#150; Dubnobasswithmyhe', 'Underworld', '7:35', 'b389ea9779409dae6bad0ae39ea2fbc4', '/Users/ings0c/Documents/Websites/musicaro/library/Underworld - Dubnobasswithmyheadman (DeLuxe Remastered 2014)/CD1/04. Underworld - Spoonman (Remastered).mp3'),
(99, 'Tongue (Remastered)', 'Underworld &#150; Dubnobasswithmyhe', 'Underworld', '4:49', '966d6c570e99e1e1e988e11775b74021', '/Users/ings0c/Documents/Websites/musicaro/library/Underworld - Dubnobasswithmyheadman (DeLuxe Remastered 2014)/CD1/05. Underworld - Tongue (Remastered).mp3'),
(100, 'Dirty Epic (Remastered)', 'Underworld &#150; Dubnobasswithmyhe', 'Underworld', '10:01', '5bcee955abfbacd635e8c9a0fb4e3a0b', '/Users/ings0c/Documents/Websites/musicaro/library/Underworld - Dubnobasswithmyheadman (DeLuxe Remastered 2014)/CD1/06. Underworld - Dirty Epic (Remastered).mp3'),
(101, 'Cowgirl (Remastered)', 'Underworld &#150; Dubnobasswithmyhe', 'Underworld', '8:24', '432117e30fde474ec0467372452d7c4d', '/Users/ings0c/Documents/Websites/musicaro/library/Underworld - Dubnobasswithmyheadman (DeLuxe Remastered 2014)/CD1/07. Underworld - Cowgirl (Remastered).mp3'),
(102, 'River of Bass (Remastered)', 'Underworld &#150; Dubnobasswithmyhe', 'Underworld', '6:27', '38a45d7646bdef252644f17bea6e776e', '/Users/ings0c/Documents/Websites/musicaro/library/Underworld - Dubnobasswithmyheadman (DeLuxe Remastered 2014)/CD1/08. Underworld - River Of Bass (Remastered).mp3'),
(103, 'M.E. (Remastered)', 'Underworld &#150; Dubnobasswithmyhe', 'Underworld', '7:10', '26aaf475eb82e5228d285bfc2c0b49bd', '/Users/ings0c/Documents/Websites/musicaro/library/Underworld - Dubnobasswithmyheadman (DeLuxe Remastered 2014)/CD1/09. Underworld - M.e. (Remastered).mp3'),
(104, 'Eclipse (Remastered)', 'Underworld &#150; Dubnobasswithmyhe', 'Underworld', '13:00', '46ae3395f286714e3a42db09edac0346', '/Users/ings0c/Documents/Websites/musicaro/library/Underworld - Dubnobasswithmyheadman (DeLuxe Remastered 2014)/CD2/01. Underworld - Eclipse (Remastered).mp3'),
(105, 'Rez (Remastered)', 'Underworld &#150; Dubnobasswithmyhe', 'Underworld', '9:58', '53c52f7a3edb8e87ac5ba1372290e59d', '/Users/ings0c/Documents/Websites/musicaro/library/Underworld - Dubnobasswithmyheadman (DeLuxe Remastered 2014)/CD2/02. Underworld - Rez (Remastered).mp3'),
(106, 'Dirty (Remastered)', 'Underworld &#150; Dubnobasswithmyhe', 'Underworld', '10:19', '087eec09425cc2f5d69bb1190a040d6d', '/Users/ings0c/Documents/Websites/musicaro/library/Underworld - Dubnobasswithmyheadman (DeLuxe Remastered 2014)/CD2/03. Underworld - Dirty (Remastered).mp3'),
(107, 'Dark &amp; Long (Dark Train / Remastered)', 'Underworld &#150; Dubnobasswithmyhe', 'Underworld', '9:55', 'a4b68a481ab75e761bf46d08be1e2ebc', '/Users/ings0c/Documents/Websites/musicaro/library/Underworld - Dubnobasswithmyheadman (DeLuxe Remastered 2014)/CD2/04. Underworld - Dark & Long (Dark Train  Remastered).mp3'),
(108, 'Spikee (Remastered)', 'Underworld &#150; Dubnobasswithmyhe', 'Underworld', '12:31', '21d69e213a24737b5305e8a45c9c3645', '/Users/ings0c/Documents/Websites/musicaro/library/Underworld - Dubnobasswithmyheadman (DeLuxe Remastered 2014)/CD2/05. Underworld - Spikee (Remastered).mp3'),
(109, 'Concord (Remastered)', 'Underworld &#150; Dubnobasswithmyhe', 'Underworld', '6:51', '1303eaa616337129532526bfd812833f', '/Users/ings0c/Documents/Websites/musicaro/library/Underworld - Dubnobasswithmyheadman (DeLuxe Remastered 2014)/CD2/06. Underworld - Concord (Remastered).mp3'),
(110, 'Can You Feel Me? (Remastered)', 'Underworld &#150; Dubnobasswithmyhe', 'Underworld', '4:30', '87e327b1a20e5621beaff12e3fae0a48', '/Users/ings0c/Documents/Websites/musicaro/library/Underworld - Dubnobasswithmyheadman (DeLuxe Remastered 2014)/CD2/07. Underworld - Can You Feel Me (Remastered).mp3'),
(111, 'Birdstar (Remastered)', 'Underworld &#150; Dubnobasswithmyhe', 'Underworld', '4:52', 'f35a075801f6ca91a9c6a086f123c667', '/Users/ings0c/Documents/Websites/musicaro/library/Underworld - Dubnobasswithmyheadman (DeLuxe Remastered 2014)/CD2/08. Underworld - Birdstar (Remastered).mp3');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `track_library`
--
ALTER TABLE `track_library`
  ADD PRIMARY KEY (`track_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `track_library`
--
ALTER TABLE `track_library`
  MODIFY `track_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=112;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
