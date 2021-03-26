<?php
	global $dbname, $link, $user_question;	


	if (isset($_POST['question'])) {
		$user_question = $_POST['question']; 
	}
	$dbname = 'chatbotdb';
	$link = mysqli_connect('localhost', 'root', '', 'chatbotdb');

	if (!$link) {
		echo 'Could not connect to mysql';
		exit;
	}
	
	$sql="SELECT botreply FROM bottable where UserText='".$user_question."'" ;
	$result = mysqli_query($link, $sql);
	$row = mysqli_fetch_row($result);

	echo $row[0]; 

?>