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
	
	$sql = "INSERT INTO bottable (BotReply, UserText, Score) VALUES ('".$bot."', '".$user."', '".$score."')";
	mysqli_query($link, $sql);


?>