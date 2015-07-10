-- phpMyAdmin SQL Dump
-- version 4.4.6.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 10, 2015 at 02:30 AM
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
-- Table structure for table `artist_library`
--

CREATE TABLE IF NOT EXISTS `artist_library` (
  `artist_id` int(11) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `artist_library`
--

INSERT INTO `artist_library` (`artist_id`, `name`) VALUES
(1, 'Culprate'),
(2, '16 &#194;it'),
(3, '16 Bit'),
(4, '501');

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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

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
(13, 'Incognito', 'Dubstep Collection 11', '501', '5:00', 'bcafe70c1cad10714710c449f1217ef3', '/Users/ings0c/Documents/Websites/musicaro/library/Dubstep Collection 11 (ÐÐ¿Ñ€ÐµÐ»ÑŒ 2010)/501 - Incognito.mp3');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `artist_library`
--
ALTER TABLE `artist_library`
  ADD PRIMARY KEY (`artist_id`);

--
-- Indexes for table `track_library`
--
ALTER TABLE `track_library`
  ADD PRIMARY KEY (`track_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `artist_library`
--
ALTER TABLE `artist_library`
  MODIFY `artist_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `track_library`
--
ALTER TABLE `track_library`
  MODIFY `track_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=14;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
