<?php

	$dbname = 'companydb';
	$link = mysqli_connect('localhost', 'elie', '123123123');

	if (!$link) {
		echo 'Could not connect to mysql';
		exit;
	}

	$selectedTable = $_POST['myVar']; 
	$sql=	"SELECT `COLUMN_NAME` 
			FROM `INFORMATION_SCHEMA`.`COLUMNS` 
			WHERE `TABLE_SCHEMA`='companydb' 
   			AND `TABLE_NAME`='".$selectedTable."';" ;
	$result = mysqli_query($link, $sql);
	
	if (!$result) {
		echo "DB Error, could not list attributes\n";
		echo 'MySQL Error: ' . mysql_error();
		exit;
	}

	$attributes = array();
	while ($row = mysqli_fetch_row($result)) {
		array_push($attributes, $row[0]);
	}
	foreach ($attributes as $value) {
		echo "<option value='" . $value . "'>" . $value . "</option> ";
	}
	// echo json_encode($attributes);  // pass array in json_encode

?>