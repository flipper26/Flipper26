<?php
	$con = mysql_connect("localhost","elie","123123123");
	if (!$con) {
	  die('Could not connect: ' . mysql_error());
	}

	mysql_select_db("companydb", $con);
	$selectedTable = $_POST['myTable']; 
	$selectedAttribute = $_POST['myAttribute']; 


	//$result = mysql_query("select distinct DNO FROM employee");
	$result = mysql_query("select distinct ".$selectedAttribute." FROM ".$selectedTable."");
	$num = mysql_num_rows($result);
	echo $num;

	mysql_close($con);


?>