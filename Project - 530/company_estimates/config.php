<?php
	global $dbname, $link;
	
function get_tables_names(){
	$dbname = 'companydb';
	$link = mysqli_connect('localhost', 'elie', '123123123');

	if (!$link) {
		echo 'Could not connect to mysql';
		exit;
	}

	$sql = "SHOW TABLES FROM $dbname";
	$result = mysqli_query($link, $sql);

	if (!$result) {
		echo "DB Error, could not list tables\n";
		echo 'MySQL Error: ' . mysql_error();
		exit;
	}

	$table_names = array();
	while ($row = mysqli_fetch_row($result)) {
		array_push($table_names, $row[0]);
	}
 	mysqli_free_result($result);
 	return $table_names;
}

?>
<html>
	<head>
		<link rel="stylesheet" type="text/css" href="css/style.css">
		<script type="text/javascript" src="js/jquery-1.12.0.min.js"></script>
		<script type="text/javascript" src="js/main.js"></script>
	</head>
	<body>
		<div id="main_wrapper" class="form-style-8">
			<h2>Company Query Cost Estimates</h2>
			<form>
				<div class="input_row">
					<div class="input_third">
						<input data-name="rd_select" id="query_type_select" type="radio" name="query_type" checked="checked" value="select"><label for="query_type_select">Select</label>
					</div>
					<div class="input_third">
						<input data-name="rd_join" id="query_type_join" type="radio" name="query_type" value="join"><label for="query_type_join">Join</label>
					</div>
				</div>




<!-- ===================================================================================================== -->
<!-- ===================================================================================================== -->
<!-- ============================================= SELECT ================================================ -->

				<div id="query_type_select_container" class="conditional_row">
					<div class="input_row">
						<div class="input_third">
							<select data-name="list_tables_inSelect" id="table_names">
								<option value="" disabled selected>Select Table</option>
								<?php 
									$tables_names = get_tables_names();
									foreach($tables_names as $value) {?>
										<option value="<?php echo $value;?>"><?php echo $value;?></option>
							<?php	}
								?>
							</select>
						</div>
						<div id="rows_from_table" class="input_third">
							<select  data-name="list_attributes_inSelect" id="attributes">
								<option value="" disabled selected>Select Attribute</option>
							</select>
						</div>
					</div>
					

					<div class="input_row">
						<div class="input_third">
							<select data-name="list_typeOfIndex_inSelect">
								<option value="" disabled selected>Index Type</option>
								<option value="primary">Primary</option>
								<option value="hash_key">Hash Key</option>
								<option value="ordering">Ordering</option>
								<option value="clustering">Clustering</option>
								<option value="secondary">Secondary</option>
								<option value="binary_search">Binary Search</option>
							</select>
						</div>
						<div class="input_third">
							<select data-name="list_condition_inSelect" id="condition_select">
								<option value="" disabled selected>Condition</option>
								<option value="="> = </option>
								<option value="else"> <, >, <=, >= </option>
							</select>
						</div>
						<div id="on_a_key_container_inSelect" class="input_third on_key_class">
							<input data-name="cb_onAkey_inSelect_equal" id="on_a_key" type="checkbox" name="cb_onAkey"><label for="on_a_key">On a key</label>
						</div>
						<div id="on_a_key_container_inSelect2" class="input_third on_key_class">
							<input data-name="cb_onAkey_inSelect_range" id="on_a_key2" type="checkbox" name="cb_onAkey2"><label for="on_a_key">On a key</label>
						</div>
					</div>
					<div class="input_row">
						<div class="input_third">
							<input data-name="input_b_inSelect" placeholder="Blocks" type="number" name="num_blocks" min="1" pattern="\d+" >
						</div>
						<div class="input_third">
							<input data-name="input_r_inSelect" class="number_of_record_field" placeholder="Records" type="number" name="num_records" min="1" step="1">
						</div>
						<div data-name="cb_recordsFromDb_inSelect" class="input_third">
							<input  data-name="fromDB_checkbox" class="records_checkbox_class" id="records_checkbox5" type="checkbox" name="db_records" ><label for="records_checkbox5">From database</label>
						</div>
					</div>
					<div class="input_row">
						<div class="input_third">
							<input data-name="input_d_inSelect" type="number" name="" placeholder="Distinct Values" min="1" step="1">
						</div>
						<div class="input_third">
							<input data-name="input_X_inSelect" type="number" name="" placeholder="Level of Index" min="1" step="1">
						</div>
						<div class="input_third">
							<input data-name="input_Bi1_inSelect" type="number" name="" placeholder="First Block Index" min="1" step="1">
						</div>
					</div>
				</div>

<!-- ===================================================================================================== -->
<!-- ===================================================================================================== -->
<!-- ============================================= JOIN =================================================== -->


				<div id="query_type_join_container" class="conditional_row">
					<div class="table_wrapper">
						<div class="input_row">
							<div class="input_third">
								<select data-name="list_tables_inJoin" id="table_names">
									<option value="" disabled selected>Select Table</option>
									<?php 
										$tables_names = get_tables_names();
										foreach($tables_names as $value) {?>
											<option value="<?php echo $value;?>"><?php echo $value;?></option>
								<?php	}
									?>
								</select>
							</div>
							<div id="rows_from_table" class="input_third">
								<select data-name="list_attributes_inJoin" id="attributes1">
									<option value="" disabled selected>Select Attribute</option>
								</select>
							</div>
							<div class="input_third">
								<input data-name="cb_sorted" class="records_checkbox_class" id="sorted_records_checkbox1" type="checkbox" name="db_records" ><label for="sorted_records_checkbox1">Sorted</label>
							</div>
						</div>
						<div class="input_row">
							<div class="input_third">
								<input data-name="input_b_inJoin" placeholder="Blocks" type="number" name="num_blocks" min="1" step="1">
							</div>
							<div class="input_third">
								<input data-name="input_r_inJoin" class="number_of_record_field" placeholder="Records" type="number" name="num_records" min="1" step="1">
							</div>
							<div class="input_third">
								<input data-name="cb_recordsFromDb_inJoin" class="records_checkbox_class" id="sorted_records_checkbox2" type="checkbox" name="db_records" ><label for="sorted_records_checkbox2">From database</label>
							</div>
						</div>
						<div class="input_row">
							<div class="input_third">
								<select data-name="list_typeOfIndex_inJoin">
									<option value="" disabled selected>Index Type - None</option>
									<option value="primary">Primary</option>
									<option value="hash_key">Hash Key</option>
									<option value="clustering">Clustering</option>
									<option value="secondary">Secondary</option>
								</select>
							</div>
							<div class="input_third">
								<input data-name="input_d_inJoin" type="number" name="" placeholder="Distinct Values" min="1" step="1">
							</div>
						</div>
						<div class="input_row">
							<div class="input_third">
								<input data-name="input_X_inJoin" type="number" name="" placeholder="Level of Index" min="1" step="1">
							</div>
							<div class="input_third">
								<input data-name="input_H_inJoin" type="number" name="" placeholder="Hash" min="1" step="1">
							</div>
						</div>
					</div>
					<div class="table_wrapper">
						<div class="input_row">
							<div class="input_third">
								<select data-name="list_tables2_inJoin" id="table_names">
									<option value="" disabled selected>Select Table 2</option>
									<?php 
										$tables_names = get_tables_names();
										foreach($tables_names as $value) {?>
											<option value="<?php echo $value;?>"><?php echo $value;?></option>
								<?php	}
									?>
								</select>
							</div>
							<div id="rows_from_table" class="input_third">
								<select data-name="list_attributes2_inJoin" id="attributes2">
									<option value="" disabled selected>Select Attribute</option>
								</select>
							</div>
							<div class="input_third">
								<input data-name="cb_sorted2" class="records_checkbox_class" id="records_checkbox3" type="checkbox" name="db_records" ><label for="records_checkbox3">Sorted</label>
							</div>
						</div>
						<div class="input_row">
							<div class="input_third">
								<input data-name="input_b2_inJoin" placeholder="Blocks" type="number" name="num_blocks" min="1" step="1">
							</div>
							<div class="input_third">
								<input data-name="input_r2_inJoin" class="number_of_record_field" placeholder="Records" type="number" name="num_records" min="1" step="1">
							</div>
							<div class="input_third">
								<input data-name="cb_recordsFromDb2_inJoin" class="records_checkbox_class" id="records_checkbox4" type="checkbox" name="db_records" ><label for="records_checkbox4">From database</label>
							</div>
						</div>
						<div class="input_row">
							<div class="input_third">
								<select data-name="list_typeOfIndex2_inJoin">
									<option value="" disabled selected>Index Type - None</option>
									<option value="primary">Primary</option>
									<option value="hash_key">Hash Key</option>
									<option value="clustering">Clustering</option>
									<option value="secondary">Secondary</option>
								</select>
							</div>
							<div class="input_third">
								<input data-name="input_d2_inJoin" type="number" name="" placeholder="Distinct Values" min="1" step="1">
							</div>
						</div>
						<div class="input_row">
							<div class="input_third">
								<input data-name="input_X2_inJoin" type="number" name="" placeholder="Level of Index" min="1" step="1">
							</div>
							<div class="input_third">
								<input data-name="input_H2_inJoin" type="number" name="" placeholder="Hash" min="1" step="1">
							</div>
						</div>
					</div>
				

					<div class="input_row">
						<div class="input_third">
								<input data-name="input_bfr_inJoin" type="number" name="" placeholder="Blocking Factor (2 tables)" min="1" step="1">
						</div>
						<div class="input_third">
							<input data-name="input_Js_inJoin" type="number" name="" placeholder="Join Selectivity" min="1" step="1"> 
						</div>
						
					</div>
				</div>
<!-- ===================================================================================================== -->
<!-- ===================================================================================================== -->
<!-- ============================================= BUTTONS =================================================== -->
				
				<div class="input_row">
					<button type="button" id = "calculate_button" onclick="calculate();" class="myButton">Calculate</button>
					<button type="reset" id = "reset_button" onclick="reload();" class="myButton">Reset</button>
				</div>
			</form>
			<div id="results_container">
				<h2>Results</h2>
				<div class="input_row">
					<div class="input_third">
						<div id="result_column1" class="result_inner_cont">
							<h4 class="first"></h4>
							<h5 class="first"></h5>
							<h4 class="second"></h4>
							<h5 class="second"></h5>
						</div>
						
					</div>
					<div class="input_third">
						<div id="result_column2" class="result_inner_cont">
							<h4 class="first"></h4>
							<h5 class="first"></h5>
							<h4 class="second"></h4>
							<h5 class="second"></h5>
						</div>
					</div>
					<div class="input_third">
						<div id="result_column3" class="result_inner_cont">
							<h4 class="first"></h4>
							<h5 class="first"></h5>
							<h4 class="second"></h4>
							<h5 class="second"></h5>
						</div>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>