-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 02, 2017 at 12:24 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `companydb`
--

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE IF NOT EXISTS `department` (
  `DNAME` text NOT NULL,
  `DNUMBER` int(11) NOT NULL,
  `MGRSSN` int(11) NOT NULL,
  `MGRSTARTDATE` date NOT NULL,
  UNIQUE KEY `DNUMBER` (`DNUMBER`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`DNAME`, `DNUMBER`, `MGRSSN`, `MGRSTARTDATE`) VALUES
('Financial', 1, 459123578, '1996-11-23'),
('Human Resources', 2, 175932459, '2001-01-15'),
('Customer service', 3, 147852369, '2013-10-03'),
('Purchasing', 4, 469875236, '2017-01-01'),
('Maintenance', 5, 265470145, '1999-04-20'),
('Marketing', 6, 589134793, '1996-11-23'),
('Public Relations', 7, 175932459, '2007-06-30');

-- --------------------------------------------------------

--
-- Table structure for table `dept_locations`
--

CREATE TABLE IF NOT EXISTS `dept_locations` (
  `DNUMBER` int(11) NOT NULL,
  `DLOCATION` varchar(200) CHARACTER SET utf8 COLLATE utf8_czech_ci NOT NULL,
  UNIQUE KEY `DNUMBER` (`DNUMBER`,`DLOCATION`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dept_locations`
--

INSERT INTO `dept_locations` (`DNUMBER`, `DLOCATION`) VALUES
(1, 'second floor'),
(2, 'second floor'),
(3, 'fourth floor'),
(4, 'second floor'),
(5, 'fourth floor'),
(6, 'sixth floor'),
(7, 'sixth floor');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE IF NOT EXISTS `employee` (
  `FNAME` text NOT NULL,
  `LNAME` text NOT NULL,
  `SSN` int(11) NOT NULL,
  `BDATE` date NOT NULL,
  `ADRESS` text NOT NULL,
  `SEX` varchar(1) NOT NULL,
  `SALARY` int(11) NOT NULL,
  `SUPERSSN` int(11) NOT NULL,
  `DNO` int(11) NOT NULL,
  UNIQUE KEY `SSN` (`SSN`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`FNAME`, `LNAME`, `SSN`, `BDATE`, `ADRESS`, `SEX`, `SALARY`, `SUPERSSN`, `DNO`) VALUES
('Elsy', 'Saade', 13630780, '1988-04-17', 'Jeita', 'F', 1200, 589134793, 3),
('Vahe', 'derekmanjian', 102034569, '1960-07-10', 'Antelias', 'M', 1000, 147852369, 4),
('Michel', 'Nasr', 117863219, '1990-07-11', 'Antelias', 'M', 2900, 0, 7),
('Roy', 'Kassouf', 140523096, '1987-03-07', 'Ghazir', 'M', 1350, 589134793, 6),
('Zahra', 'Al-Ali', 147852369, '1972-04-09', 'Khalde', 'F', 2100, 0, 3),
('Paul', 'Issa', 147856931, '1965-11-23', 'Dora-Beirut', 'M', 700, 268189772, 5),
('Peter', 'Selman', 175932459, '1986-12-01', 'Achrafieh-Beiut', 'M', 2700, 0, 2),
('Sarah', 'Khoury', 201478963, '1990-04-06', 'Bourj Hammoud', 'F', 1700, 175932459, 2),
('Samia', 'Fadlallah', 203045697, '1988-10-10', 'Badaro', 'F', 1000, 147852369, 4),
('Viviane ', 'Tannous', 258654103, '1978-10-02', 'Dekwane', 'F', 1150, 117863219, 7),
('Mohamad', 'Al-Abdallah', 265470145, '1955-12-07', 'Saida', 'M', 1500, 0, 5),
('wael', 'Maalouf', 306450489, '1991-06-25', 'zalka', 'M', 800, 469875236, 4),
('Elie', 'Sayyah', 326478921, '1980-03-02', 'Dbayeh', 'M', 1500, 459123578, 1),
('johnny', 'al_khoury', 326589014, '1980-04-02', 'shaile', 'M', 500, 268189772, 5),
('pia', 'Chamloun', 405063214, '1993-12-12', 'Bekfaya', 'F', 1100, 147852369, 3),
('Patina', 'Khater', 459123578, '1989-06-20', 'Jbeil', 'F', 2850, 0, 1),
('Michel', 'Safi', 469875236, '1982-01-29', 'Naccache', 'M', 2200, 0, 4),
('bahaa', 'safian', 506147360, '1993-07-14', 'hazmieh', 'M', 600, 268193772, 5),
('Patil', 'Baboyan', 508040122, '1994-02-28', 'Bourj Hammoud', 'F', 850, 469875236, 4),
('gaby', 'maroun', 520147963, '1989-11-11', 'Adonis', 'M', 1100, 175932459, 7),
('Veronique', 'Moukarzel', 564789123, '1996-03-10', 'Batroun', 'F', 1250, 459123578, 1),
('Bruna', 'Aoun', 589134793, '1995-01-22', 'Douar', 'F', 3000, 0, 6),
('Marie-Noelle', 'Milane', 630405789, '1992-10-16', 'Dahr Al-souane', 'F', 1500, 175932459, 2),
('Walid', 'Baroud', 654021987, '1970-10-30', 'Adonis', 'M', 800, 147852369, 3),
('Samer', 'Faddoul', 654782130, '1977-12-11', 'Zouk-Mikael', 'M', 1600, 459123578, 1);

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE IF NOT EXISTS `project` (
  `PNAME` text NOT NULL,
  `PNUMBER` int(11) NOT NULL,
  `PLOCATION` text NOT NULL,
  `DNUM` int(11) NOT NULL,
  UNIQUE KEY `PNUMBER` (`PNUMBER`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`PNAME`, `PNUMBER`, `PLOCATION`, `DNUM`) VALUES
('budget proposal', 1, 'local', 1),
('Tv-Interview', 2, 'Naccach', 7),
('Elevator fix', 3, 'local', 5),
('Sationary purshase', 4, 'local', 4);

-- --------------------------------------------------------

--
-- Table structure for table `works-on`
--

CREATE TABLE IF NOT EXISTS `works-on` (
  `ESSN` int(11) DEFAULT NULL,
  `PNO` int(11) DEFAULT NULL,
  `HOURS` int(11) DEFAULT NULL,
  UNIQUE KEY `ESSN` (`ESSN`,`PNO`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `works-on`
--

INSERT INTO `works-on` (`ESSN`, `PNO`, `HOURS`) VALUES
(459123578, 1, 20),
(326478921, 1, 10),
(564789123, 1, 5),
(117863219, 2, 20),
(258654103, 2, 30),
(520147963, 2, 10),
(265470145, 3, 10),
(147856931, 3, 9),
(326589014, 3, 2),
(203045697, 4, 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
