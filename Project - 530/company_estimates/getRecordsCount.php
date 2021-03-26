<?php
	$con = mysql_connect("localhost","elie","123123123");
	if (!$con) {
	  die('Could not connect: ' . mysql_error());
	}

	mysql_select_db("companydb", $con);
	$selectedTable = $_POST['myVar']; 

	$result = mysql_query("select * FROM ".$selectedTable."");
	$num = mysql_num_rows($result);
	echo $num;

	mysql_close($con);

	
?>