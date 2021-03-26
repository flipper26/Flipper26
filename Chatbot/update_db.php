<?php
	global $dbname, $link, $user_question;	

	$dbname = 'chatbotdb';
	$link = mysqli_connect('localhost', 'root', '', 'chatbotdb');

	if (isset($_POST['bot'])) {
		$bot = $_POST['bot']; 
	}
	if (isset($_POST['user'])) {
		$user = $_POST['user']; 
	}

		if (isset($_POST['score'])) {
		$score = $_POST['score']; 
	}

	if (!$link) {
		echo 'Could not connect to mysql';
		exit;
	}
	
	$sql = "UPDATE bottable SET botreply='".$bot."' WHERE UserText='".$user."'";
	mysqli_query($link, $sql);

	$sql2 = "UPDATE bottable SET Score ='".$score."' WHERE UserText='".$user."'";
	mysqli_query($link, $sql2);


?>