
// =========================================Calculate Function Start==============================================

var table_select, attribute_select, table_1, table_2, attribute_1, attribute_2, blocks_1, blocks_2, records_1, records_2; 
var levelOfIndex_1, levelOfIndex_2, distinctValues_1, distinctValues_2, bfr, Js, hashKey, hashKey2;

var calculate = function(){
	// Removing errors and reseting results to empty
	$('input, select, h4, p, label').removeClass('error');
	$('#results_container h4, #results_container h5').html('');
	$('#results_container').hide();
	
	//checking if select or join are choosen
	var isSelect = $('input[data-name="rd_select"]').is(':checked');
	var isJoin = $('input[data-name="rd_join"]').is(':checked');
	

	if(isSelect){

		table_select = getList("list_tables_inSelect");
		attribute_select = getList("list_attributes_inSelect");

		if(table_select == null || attribute_select == null){

			alert("Kindly select table and attribute");

		}else{
			//switch case to perform calculation functions for the selected type of index in select
			var brute_cost, second_cost;
			
			if($('select[data-name=list_typeOfIndex_inSelect]').val() != ''){
			var select_typeOfIndex = $('select[data-name="list_typeOfIndex_inSelect"]').val();

				switch(select_typeOfIndex) {
				case "primary":
					second_cost = calculate_primary_inSelect();
					display_result(second_cost, 'Primary Index:', 'empty', 'empty', 'Could not calculate using Primary Index', '2');
					break;

				case "hash_key":
					second_cost = calculate_hash_key_inSelect();
					display_result(second_cost, 'Hash Key:', 'empty', 'empty', 'Could not calculate using Hash Key', '2');
					break;

				case "ordering":
					second_cost = calculate_ordering_inSelect();
					display_result(second_cost, 'Ordering Index:', 'empty', 'empty', 'Could not calculate using an Ordering Index', '2');
					break;

				case "clustering":
					second_cost = calculate_clustering_inSelect();
					console.log("second_cost", second_cost);
					display_result(second_cost, 'Clustering Index:', 'empty', 'empty', 'Could not calculate using a Clustreing Index', '2');

					break;

				case "secondary":
					second_cost = calculate_secondary_inSelect();
					display_result(second_cost, 'Secondary Index:', 'empty', 'empty', 'Could not calculate using a Secondary Index', '2');
					break;	

				case "binary_search":
					second_cost = calculate_binary_search_inSelect();
					display_result(second_cost, 'Binary Search:', 'empty', 'empty', 'Could not calculate using a Binary Search', '2');
					break;

				default:

					$('select[data-name="list_typeOfIndex_inSelect"]').addClass('error');
					alert("Please select an Index Type");
					break;
				}
				if(select_typeOfIndex != undefined){
					brute_cost = calculate_linear_search();
					console.log("brute_cost", brute_cost);
					display_result(brute_cost, 'Linear Search:', 'empty', 'empty', 'Could not calculate using linear Search', '1');

				}
			}
			$('#results_container').slideDown();
			$('html,body').animate({scrollTop: $("#results_container").offset().top},'slow');
		}

		
	}

	if(isJoin){

		table_1 = getList("list_tables_inJoin");
		table_2 = getList("list_tables2_inJoin");
		attribute_1 = getList("list_attributes_inJoin");
		attribute_2 = getList("list_attributes2_inJoin");

		if(table_1 == null || table_2 == null || attribute_1 == null || attribute_2 == null){

			alert("Kindly select tables and attributes");

		}else{

			blocks_1 = getInput("input_b_inJoin");
			blocks_2 = getInput("input_b2_inJoin");
			if($('input[data-name="cb_recordsFromDb_inJoin"]').is(":checked")){
		
				getRecordsFromDB(table_1, function(ajax_result){
					records_1 = ajax_result;
					console.log("records FromDb", records_1);
				});

				getDistincValuesFromDB(table_1, attribute_1, function(ajax_result){
						distinctValues_1 = ajax_result;
						console.log("distinct FromDb", distinctValues_1);
				});

			}else{
				records_1 = getInput("input_r_inJoin");
				distinctValues_1 = getInput("input_d_inJoin");
			}

			if($('input[data-name="cb_recordsFromDb2_inJoin"]').is(":checked")){

				getRecordsFromDB(table_2, function(ajax_result){
					records_2 = ajax_result;
					console.log("records2 FromDb", records_2);
				});

				getDistincValuesFromDB(table_2, attribute_2, function(ajax_result){
					distinctValues_2 = ajax_result;
					console.log("distinct2 FromDb", distinctValues_2);
				});

			}else{
				records_2 = getInput("input_r2_inJoin");
				distinctValues_2 = getInput("input_d2_inJoin");
			}
			levelOfIndex_1 = getInput("input_X_inJoin");
			levelOfIndex_2 = getInput("input_X2_inJoin");
			hashKey = getInput("input_H_inJoin");
			hashKey2 = getInput("input_H2_inJoin");
			bfr = getInput("input_bfr_inJoin");
			Js = getInput("input_Js_inJoin");

			//switch case to perform calculation functions for the selected type of index in join
			var brute_cost, costFromIndex2;
			
			if($('select[data-name=list_typeOfIndex2_inJoin]').val() != ''){
			var Join_typeOfIndex2 = $('select[data-name="list_typeOfIndex2_inJoin"]').val();

				switch(Join_typeOfIndex2) {
				case "primary":
					costFromIndex2 = calculate_primary_inJoin('IndexTable2');
					console.log("costFromIndex2", costFromIndex2);
					display_result(costFromIndex2, 'Primary Index:', 'empty', 'empty', 'Could not calculate using Primary Index', '2');
					break;

				case "hash_key":
					costFromIndex2 = calculate_hash_key_inJoin('IndexTable2');
					console.log("costFromIndex2", costFromIndex2);
					display_result(costFromIndex2, 'Hash Key:', 'empty', 'empty', 'Could not calculate using Hash Key', '2');
					break;

				case "clustering":
					costFromIndex2 = calculate_clustering_inJoin('IndexTable2');
					console.log("costFromIndex2", costFromIndex2);
					display_result(costFromIndex2, 'Clustering Index:', 'empty', 'empty', 'Could not calculate using a Clustreing Index', '2');
					break;

				case "secondary":
					costFromIndex2 = calculate_secondary_inJoin('IndexTable2');
					console.log("costFromIndex2", costFromIndex2);
					display_result(costFromIndex2, 'Secondary Index:', 'empty', 'empty', 'Could not calculate using a Secondary Index', '2');
					break;	

				default:
			
					$('select[data-name="list_typeOfIndex2_inJoin"]').addClass('error');
					break;
				}

				if(Join_typeOfIndex2 != undefined){

					brute_cost = calculate_nested_loop('IndexTable2');
					console.log("brute_cost", brute_cost);
					display_result(brute_cost, 'Nested loop:', 'empty', 'empty','Could not calculate using Nested Loop', '1');
					sort_merge_cost = calculate_sortMerge()
					console.log("sort_merge_cost", sort_merge_cost);
					display_result(sort_merge_cost, 'Sort Merge', 'empty', 'empty','Could not calculate using Nested Loop', '3');
				}
			}

			if($('select[data-name=list_typeOfIndex_inJoin]').val() != ''){
			var Join_typeOfIndex = $('select[data-name="list_typeOfIndex_inJoin"]').val();

				switch(Join_typeOfIndex) {
				case "primary":
					costFromIndex = calculate_primary_inJoin('IndexTable1');
					console.log("costFromIndex", costFromIndex);
					display_result('empty', 'empty', costFromIndex, 'Primary Index:','Could not calculate using Primary Index', '2');
					break;

				case "hash_key":
					costFromIndex = calculate_hash_key_inJoin('IndexTable1');
					console.log("costFromIndex", costFromIndex);
					display_result('empty', 'empty', costFromIndex, 'Hash Key:','Could not calculate using Hash Key', '2');
					break;

				case "clustering":
					costFromIndex = calculate_clustering_inJoin('IndexTable1');
					console.log("costFromIndex", costFromIndex);
					display_result('empty', 'empty', costFromIndex, 'Clustering Index:','Could not calculate using a Clustreing Index', '2');
					break;

				case "secondary":
					costFromIndex = calculate_secondary_inJoin('IndexTable1');
					console.log("costFromIndex", costFromIndex);
					display_result('empty', 'empty', costFromIndex, 'Secondary Index:','Could not calculate using a Secondary Index', '2');
					break;	

				default:

					$('select[data-name="list_typeOfIndex_inJoin"]').addClass('error');
					break;
					
				}

				if(Join_typeOfIndex2 != undefined){
					brute_cost = calculate_nested_loop('IndexTable1');
					console.log("brute_cost flipped", brute_cost);
					display_result('empty', 'empty', brute_cost, 'Nested loop (flipped tables):','Could not calculate using Nested Loop when the tables are flipped', '1');
				}
			}

			$('#results_container').slideDown();
			$('html,body').animate({scrollTop: $("#results_container").offset().top},'slow');
		}
	}
	//$('#on_a_key, #on_a_key2').attr('checked', false);

}

// =========================================Calculate Function End==============================================


// =========================================Select Functions Start==============================================


var calculate_linear_search = function(){
	var input_numOfBlocks;

	// Getting the number of blocks and error display if invalid
	input_numOfBlocks = getInput("input_b_inSelect");
	console.log("input_numOfBlocks", input_numOfBlocks);
	
	// Checking if the on A key checkbox is checked
	if($('input[data-name="cb_onAkey_inSelect_equal"]').is(":checked")){
			
			if(input_numOfBlocks != undefined){
				return (input_numOfBlocks/2);				
			}else{
				return undefined;
			}
			
	}else{
			if(input_numOfBlocks != undefined){
				return input_numOfBlocks;				
			}else{
				return undefined;
			}
		}
}

var calculate_primary_inSelect = function(){

	// Getting the Level of Index and error display if invalid and calculating
	var input_lvlOfIndex = getInput("input_X_inSelect");

	var cost = parseFloat(input_lvlOfIndex) + 1;
	console.log("cost", cost);

	//Checking if the value returned is NaN and changing it to undefined
	if(isNaN(cost)){
		cost = undefined;
		console.log("cost", cost);
	}

	return cost
}

var calculate_hash_key_inSelect = function(){
	return 1;
}

var calculate_ordering_inSelect = function(){

	var input_lvlOfIndex, input_numOfBlocks;

	input_lvlOfIndex = getInput("input_X_inSelect");
	input_numOfBlocks = getInput("input_b_inSelect");

	// Adding the condition select feild to the error class if '=' is selected
	if($('select[data-name="list_condition_inSelect"]').val() != 'else'){
		$('select[data-name="list_condition_inSelect"]').addClass('error');
	}

	// Checking of the on a Key checkbox is selected if ' <, >, <=, >= ' is selected
	if($('input[data-name="cb_onAkey_inSelect_range"]').is(":checked")){
			
			return parseFloat(input_lvlOfIndex) + parseFloat(input_numOfBlocks/2);
	}else{
			$('input[data-name="cb_onAkey_inSelect_range"]').parents('.input_third').find('label').addClass('error');
			return undefined;	
		}
}

var calculate_clustering_inSelect = function(){

	var input_distinctValues, final_Cardinality, result; 
	var input_numOfRecords, input_numOfBlocks, input_lvlOfIndex, bfr;

	input_numOfBlocks = getInput("input_b_inSelect");

	if($('input[data-name="fromDB_checkbox"]').is(":checked")){
		
		getRecordsFromDB(table_select, function(ajax_result){
			
			input_numOfRecords = ajax_result;
			console.log("recordsFromDb", input_numOfRecords);
		});

		getDistincValuesFromDB(table_select, attribute_select, function(ajax_result){
					input_distinctValues = ajax_result;
					console.log("distinct FromDb", input_distinctValues);
				});

	}else{
		input_numOfRecords = getInput("input_r_inSelect");
		input_distinctValues = getInput("input_d_inSelect");
	}

	input_lvlOfIndex = getInput("input_X_inSelect");
	
	final_Cardinality = calculateSelectionCardinality(input_distinctValues, input_numOfRecords);
	console.log("final_Cardinality", final_Cardinality);

	//calculating the Blocking factor
	bfr = (input_numOfRecords/input_numOfBlocks);
	console.log("bfr", bfr);

	//return Final cost
	result =  parseFloat(input_lvlOfIndex) + parseFloat(final_Cardinality/bfr);
	console.log("result",  result);

	//Checking if the value returned is NaN and changing it to undefined
	if(isNaN(result)){
		result = undefined;
		console.log("result", result);
	}

	return result;

}

var calculate_secondary_inSelect = function(){

var input_distinctValues, final_Cardinality, comparison_type; 
var input_numOfRecords, input_lvlOfIndex, result, input_first_block_index;

input_numOfBlocks = getInput("input_b_inSelect");
if($('input[data-name="fromDB_checkbox"]').is(":checked")){
		
		getRecordsFromDB(table_select, function(ajax_result){
			
			input_numOfRecords = ajax_result;
			console.log("recordsFromDb", input_numOfRecords);
		});

		getDistincValuesFromDB(table_select, attribute_select, function(ajax_result){
					input_distinctValues = ajax_result;
					console.log("distinct FromDb", input_distinctValues);
				});

	}else{
		input_numOfRecords = getInput("input_r_inSelect");
		input_distinctValues = getInput("input_d_inSelect");
	}

input_lvlOfIndex = getInput("input_X_inSelect");
final_Cardinality = calculateSelectionCardinality(input_distinctValues, input_numOfRecords);
console.log("final_Cardinality", final_Cardinality);

var comparison_type = $('select[data-name=list_condition_inSelect]').val();

// Switch case to find out the type of the condition and return the appropriate result
switch(comparison_type) {
			case "=":
				result = parseFloat(final_Cardinality) + parseFloat(input_lvlOfIndex);
				//Checking if the value returned is NaN and changing it to undefined
				if(isNaN(result)){
					result = undefined;
					console.log("result", result);
				}
				return result;
				break;

			case "else":
				// Getting the First Block Index and error display if invalid
				input_first_block_index = getInput("input_Bi1_inSelect");
				result = parseFloat(input_lvlOfIndex) + parseFloat(input_first_block_index/2) + parseFloat(input_numOfRecords/2);
				console.log("input_first_block_index", input_first_block_index);
				//Checking if the value returned is NaN and changing it to undefined
				if(isNaN(result)){
					result = undefined;
					console.log("result", result);
				}
				return result;
				break;
		
			default:
				$('select[data-name="list_condition_inSelect"]').addClass('error');
				alert("Please choose a condition type");
		}
}

var calculate_binary_search_inSelect = function(){

var final_Cardinality, input_selectivity, input_distinctValues, input_numOfRecords, input_numOfBlocks, result;

	input_numOfBlocks = getInput("input_b_inSelect");	

	// Adding the condition select feild to the error class if '=' is selected
	if($('select[data-name="list_condition_inSelect"]').val() != 'else'){
		$('select[data-name="list_condition_inSelect"]').addClass('error');
	}

	// Checking if the on A key checkbox is checked
	if($('input[data-name="cb_onAkey_inSelect_equal"]').is(":checked")){

		result = Math.log2(input_numOfBlocks);
		//Checking if the value returned is NaN and changing it to undefined
			if(isNaN(result)){
				result = undefined;
				console.log("result", result);
			}
			return result;

	}else{

		if($('input[data-name="fromDB_checkbox"]').is(":checked")){

			getRecordsFromDB(table_select, function(ajax_result){
			
			input_numOfRecords = ajax_result;
			console.log("recordsFromDb", input_numOfRecords);
		});

			getDistincValuesFromDB(table_select, attribute_select, function(ajax_result){
					input_distinctValues = ajax_result;
					console.log("distinct FromDb", input_distinctValues);
				});

			}else{
				input_numOfRecords = getInput("input_r_inSelect");
				input_distinctValues = getInput("input_d_inSelect");
			}
		
		final_Cardinality = calculateSelectionCardinality(input_distinctValues, input_numOfRecords);
		console.log("final_Cardinality", final_Cardinality);

		//calculating the Blocking factor
		bfr = (input_numOfRecords/input_numOfBlocks);
		console.log("bfr", bfr);

		result = Math.log2(input_numOfBlocks) + parseFloat(final_Cardinality/bfr) - 1;

		//Checking if the value returned is NaN and changing it to undefined
			if(isNaN(result)){
				result = undefined;
				console.log("result", result);
			}
			return result;
		}
}
// =========================================Select Functions End==============================================


// =========================================Join Functions Start==============================================

var calculate_nested_loop = function(index){

	if(index == "IndexTable2"){
		//The first result that will be returned
		var js_R_S_result = calculate_Js_R_S(Js, records_1, records_2, bfr);
		console.log("js_R_S_result_inNestedLoop_index2", js_R_S_result);

		var result = parseFloat(blocks_1) + parseFloat(blocks_1*blocks_2) + parseFloat(js_R_S_result);

		//Checking if the value returned is NaN and changing it to undefined
		if(isNaN(result)){
			result = undefined;
			console.log("result in nested loop index 2", result);
		}
		return result;

	}else if(index == "IndexTable1"){
		
		var js_R_S_result = calculate_Js_R_S(Js, records_2, records_1, bfr);
		console.log("js_R_S_result_inNestedLoop_index1", js_R_S_result);
		var result = parseFloat(blocks_2) + parseFloat(blocks_2*blocks_1) + parseFloat(js_R_S_result);

		//Checking if the value returned is NaN and changing it to undefined
		if(isNaN(result)){
			result = undefined;
			console.log("result in nested loop index 1", result);

		}
		return result;

	}
}

var calculate_sortMerge = function(){

	var Cs;

	if($('input[data-name="cb_sorted"]').is(":checked")){
		if($('input[data-name="cb_sorted2"]').is(":checked")){
			//Both tables are sorted
			Cs = parseFloat(blocks_1) + parseFloat(blocks_2);
			console.log("Cs - both sorted", Cs);
		}else{
			//only table 1 is sorted
			Cs = parseFloat(blocks_1) + parseFloat(blocks_2) + blocks_2*(Math.log2(blocks_2));
			console.log("Cs- table 1 sorted", Cs);
		}
	}else{
		if($('input[data-name="cb_sorted2"]').is(":checked")){
			//only table 2 is sorted
			Cs = parseFloat(blocks_1) + parseFloat(blocks_2) + blocks_1*(Math.log2(blocks_1));
			console.log("Cs- table 2 sorted", Cs);
		}else{
			//both tables are not sorted
			Cs = parseFloat(blocks_1) + parseFloat(blocks_2) + blocks_1*(Math.log2(blocks_1)) + blocks_2*(Math.log2(blocks_2));
			console.log("Cs - both not sorted", Cs);
		}
	}

	var js_R_S_result = calculate_Js_R_S(Js, records_1, records_2, bfr);
	var result = Cs + parseFloat(js_R_S_result);

	//Checking if the value returned is NaN and changing it to undefined
	if(isNaN(result)){
		result = undefined;
		console.log("result sort Merge", result);
	}
	return result;
}

var calculate_primary_inJoin = function(index){

	if(index == "IndexTable2"){
	//If we are using Table 1 as the outer table and the index type 
	//of the attribute of table2 to caltulate the cost

		var js_R_S_result = calculate_Js_R_S(Js, records_1, records_2, bfr);
		console.log("js_R_S_result", js_R_S_result);

		var result = parseFloat(blocks_1) + (parseFloat(records_1) * (parseFloat(levelOfIndex_2) + 1)) + parseFloat(js_R_S_result);

		//Checking if the value returned is NaN and changing it to undefined
			if(isNaN(result)){
				result = undefined;
				console.log("result", result);
			}
			return result;

	}else if(index == "IndexTable1"){

	//If we are using Table 2 as the outer table and the index type 
	//of the attribute of table 1 to caltulate the cost

		var js_R_S_result = calculate_Js_R_S(Js, records_2, records_1, bfr);
		console.log("js_R_S_result", js_R_S_result);

		var result = parseFloat(blocks_2) + (parseFloat(records_2) * (parseFloat(levelOfIndex_1) + 1)) + parseFloat(js_R_S_result);

			//Checking if the value returned is NaN and changing it to undefined
			if(isNaN(result)){
				result = undefined;
				console.log("result", result);
			}
			return result;
	}
}
var calculate_hash_key_inJoin = function(index){

		if(index == "IndexTable2"){
			//The first result that will be returned
			var js_R_S_result = calculate_Js_R_S(Js, records_1, records_2, bfr);
			console.log("js_R_S_result", js_R_S_result);

			var result = parseFloat(blocks_1) + (parseFloat(records_1) * parseFloat(hashKey2)) + parseFloat(js_R_S_result);

			//Checking if the value returned is NaN and changing it to undefined
			if(isNaN(result)){
				result = undefined;
				console.log("result hashkey index2", result);
			}
			return result;
			console.log("result hashkey index2", result);

		}else if(index == "IndexTable1"){
			//The first result that will be returned
			var js_R_S_result = calculate_Js_R_S(Js, records_2, records_1, bfr);
			console.log("js_R_S_result_hashkey_Index1", js_R_S_result);

			var result = parseFloat(blocks_2) + (parseFloat(records_2) * parseFloat(hashKey)) + parseFloat(js_R_S_result);

			//Checking if the value returned is NaN and changing it to undefined
			if(isNaN(result)){
				result = undefined;
				console.log("result hashkey index1", result);
			}
			return result;
			console.log("result hashkey index1", result);
		}
}
var calculate_clustering_inJoin = function(index){

	if(index == "IndexTable2"){
	
		var SelectionCardinality2 = calculateSelectionCardinality(distinctValues_2, records_2);
		console.log("SelectionCardinality2", SelectionCardinality2);

		var attribute_bfr = records_2/blocks_2;
		console.log("attribute_bfr2", attribute_bfr);
	
		//The first result that will be returned
		var js_R_S_result = calculate_Js_R_S(Js, records_1, records_2, bfr);
		console.log("js_R_S_result_inClustering_index2", js_R_S_result);

		var result = parseFloat(blocks_1) + (parseFloat(records_1) * (parseFloat(levelOfIndex_2) + parseFloat(SelectionCardinality2/attribute_bfr))) + parseFloat(js_R_S_result);

		//Checking if the value returned is NaN and changing it to undefined
			if(isNaN(result)){
				result = undefined;
				console.log("result in clustering Index2", result);
			}
			return result;	
			console.log("result in clustering Index2", result);

	}else if(index == "IndexTable1"){

		SelectionCardinality1 = calculateSelectionCardinality(distinctValues_1, records_1);
		console.log("SelectionCardinality1", SelectionCardinality1);

		var attribute_bfr = records_1/blocks_1;
		console.log("attribute_bfr1", attribute_bfr);
	
		//The first result that will be returned
		var js_R_S_result = calculate_Js_R_S(Js, records_2, records_1, bfr);
		console.log("js_R_S_result_inClustering_index1", js_R_S_result);

		var result = parseFloat(blocks_2) + (parseFloat(records_2) * (parseFloat(levelOfIndex_1) + parseFloat(SelectionCardinality1/attribute_bfr))) + parseFloat(js_R_S_result);

		//Checking if the value returned is NaN and changing it to undefined
			if(isNaN(result)){
				result = undefined;
				console.log("result in clustering Index1", result);
			}
			return result;	
			console.log("result in clustering Index1", result);
	}
}

var calculate_secondary_inJoin = function(index){

	if(index == "IndexTable2"){

		var SelectionCardinality2 = calculateSelectionCardinality(distinctValues_2, records_2);
	
		//The first result that will be returned
		var js_R_S_result = calculate_Js_R_S(Js, records_1, records_2, bfr);
		console.log("js_R_S_result", js_R_S_result);

		var result = parseFloat(blocks_1) + (parseFloat(records_1) * (parseFloat(levelOfIndex_2) + parseFloat(SelectionCardinality2))) + parseFloat(js_R_S_result);

		//Checking if the value returned is NaN and changing it to undefined
			if(isNaN(result)){
				result = undefined;
				console.log("result", result);
			}
			return result;

	}else if(index == "IndexTable1"){

		var SelectionCardinality1 = calculateSelectionCardinality(distinctValues_1, records_1);
	
		//The first result that will be returned
		var js_R_S_result = calculate_Js_R_S(Js, records_2, records_1, bfr);
		console.log("js_R_S_result", js_R_S_result);

		var result = parseFloat(blocks_2) + (parseFloat(records_2) * (parseFloat(levelOfIndex_1) + parseFloat(SelectionCardinality1))) + parseFloat(js_R_S_result);

		//Checking if the value returned is NaN and changing it to undefined
			if(isNaN(result)){
				result = undefined;
				console.log("result", result);
			}
			return result;
	}
}


// =========================================Join Functions End==============================================


// =========================================Utility Functions Start==============================================

var display_result = function(cost_variable, successMsg, cost_variable2, successMsg2, failedMsg, col){

	if(cost_variable == 'empty' && successMsg == 'empty'){
		if (cost_variable2 != undefined) {
			$('#result_column'+col+' h5.second').html(cost_variable2);	
			$('#result_column'+col+' h4.second').html(successMsg2);
		}else{
			$('#result_column'+col+' h4.second').addClass('error').html(failedMsg);
		}	
	}
	if(cost_variable2 == 'empty' && successMsg2 == 'empty'){
		if (cost_variable != undefined) {
			$('#result_column'+col+' h5.first').html(cost_variable);
			$('#result_column'+col+' h4.first').html(successMsg);
		}else{
			$('#result_column'+col+' h4.first').addClass('error').html(failedMsg);
		}
	}
}



var reload = function(){

window.location.reload();

}


var getList = function(formElement){

	if($('select[data-name='+ formElement +']').val() != null){
		var list_value = $('select[data-name='+ formElement +']').val();	
		console.log("table of " + formElement, list_value);
	}else{
		$('select[data-name='+ formElement +']').addClass('error');
		$('select[data-name='+ formElement +']').val('');
		console.log("ERRORRRR!!!", formElement);
	}

	return list_value;

}

var getInput = function(formElement){

if($('input[data-name='+ formElement +']').val() != '' && $('input[data-name='+ formElement +']').val() > 0){
		var input_value = $('input[data-name='+ formElement +']').val();	
		console.log("blocks of " + formElement, input_value);
	}else{
		$('input[data-name='+ formElement +']').addClass('error');
		$('input[data-name='+ formElement +']').val('');
		console.log("ERRORRRR!!!", formElement);
	}
	return input_value;
}

var calculate_Js_R_S = function(Js, R, S, bfr){

	var result = (Js * R * S)/bfr;

	//Checking if the value returned is NaN and changing it to undefined
		if(isNaN(result)){
			result = undefined;
			console.log("result", result);
		}

		return result;
}

var calculateSelectionCardinality = function(d,r){

	var sl = 1/d;

	var S = sl*r;

	return S;

}

function getRecordsFromDB(table, callback){

	myData = { myVar: table };
	$.ajax({    //create an ajax request to getRecordsCount.php
		method: "POST",
		url: "getRecordsCount.php",
		dataType: "html",   //expect html to be returned 
		data: myData ,
		async: false,
		success: function(response){
			callback(response);
		},
		error: function(xhr, status, error) {
	      alert(error);
	   },
	});
}

function getDistincValuesFromDB(table, attribute, callback){

	myData = { myTable: table, myAttribute: attribute };
	$.ajax({    //create an ajax request to getRecordsCount.php
		method: "POST",
		url: "getDistinctCount.php",
		dataType: "html",   //expect html to be returned 
		data: myData ,
		async: false,
		success: function(response){
			callback(response);
		},
		error: function(xhr, status, error) {
	      alert(error);
	   },
	});
}

// =========================================Utility Functions End==============================================


//==========================================Form modification Start============================================

$(document).ready(function() {
	$('input[type=radio][name=query_type]').change(function() {
		if (this.value == 'select') {
			$('#query_type_join_container, #join_additional_info').hide();
			$('#query_type_select_container').fadeIn(400);
		}
		else if (this.value == 'join') {
			$('#query_type_select_container').hide();
			$('#query_type_join_container, #join_additional_info').fadeIn(400);
		}
	});

	$(document).on('change', 'select[data-name=list_condition_inSelect]', function(event) {
		event.preventDefault();
		$('.on_key_class').hide();
		if ($(this).find("option:selected").attr('value') == "=") {
			$('#on_a_key_container_inSelect').fadeIn(300);
		}else{
			$('#on_a_key_container_inSelect2').fadeIn(300);
		}
	});
	$(document).on('change', 'select[data-name=list_condition_inJoin]', function(event) {
		event.preventDefault();
		if ($(this).find("option:selected").attr('value') == "=") {
			$('#on_a_key_container_inJoin').addClass('visible');
		}else{
			$('#on_a_key_container_inJoin').removeClass('visible');
		}
	});

	$(document).on('change', '.records_checkbox_class', function(event) {
		event.preventDefault();
		if ($(this).is(":checked")) {
			$(this).parents('.input_row').find('.number_of_record_field').parent().fadeOut(300);
			$("input[data-name=input_d_inJoin").parents('.input_third').fadeOut(300);
			$("input[data-name=input_d2_inJoin").parents('.input_third').fadeOut(300);
			$("input[data-name=input_d_inSelect").parents('.input_third').fadeOut(300);

		}else{
			$(this).parents('.input_row').find('.number_of_record_field').parent().fadeIn(300);
			$("input[data-name=input_d_inJoin").parents('.input_third').fadeIn(300);
			$("input[data-name=input_d2_inJoin").parents('.input_third').fadeIn(300);
			$("input[data-name=input_d_inSelect").parents('.input_third').fadeIn(300);
		}
	});
	// Update the attribute list on runtime when a table is selected
	$(document).on('change', 'select[data-name=list_tables_inSelect]', function(event) {
		var clickedTable = $(this).find("option:selected").attr('value');
		myData = { myVar: clickedTable };
		$.ajax({    //create an ajax request to load_page.php
			method: "POST",
			url: "getAttributes.php",
			dataType: "html",   //expect html to be returned 
			data: myData ,            
			success: function(response){
				$('select[data-name=list_attributes_inSelect]').html('');
				$('select[data-name=list_attributes_inSelect]').append(response);
			}
		});
	});
	// Update the attribute list on runtime when a first table of the join is selected
	$(document).on('change', 'select[data-name=list_tables_inJoin]', function(event) {
		var clickedTable = $(this).find("option:selected").attr('value');
		myData = { myVar: clickedTable };
		$.ajax({    //create an ajax request to load_page.php
			method: "POST",
			url: "getAttributes.php",
			dataType: "html",   //expect html to be returned 
			data: myData ,            
			success: function(response){
				$('select[data-name=list_attributes_inJoin]').html('');
				$('select[data-name=list_attributes_inJoin]').append(response);
			}
		});
	});
	// Update the attribute list on runtime when the second table is selected
	$(document).on('change', 'select[data-name=list_tables2_inJoin]', function(event) {
		var clickedTable = $(this).find("option:selected").attr('value');
		myData = { myVar: clickedTable };
		$.ajax({    //create an ajax request to load_page.php
			method: "POST",
			url: "getAttributes.php",
			dataType: "html",   //expect html to be returned 
			data: myData ,            
			success: function(response){
				$('select[data-name=list_attributes2_inJoin]').html('');
				$('select[data-name=list_attributes2_inJoin]').append(response);
			}
		});
	});


	// switch case for the index type in select for modifying the form 
	$(document).on('change', 'select[data-name=list_typeOfIndex_inSelect]', function(event) {
		var index_type_selected_inSelect = $('select[data-name=list_typeOfIndex_inSelect]').val();
		switch(index_type_selected_inSelect) {
			case "primary":
				
				$('[data-name=input_r_inSelect]').fadeOut(300);
				$('[data-name=cb_recordsFromDb_inSelect]').fadeOut(300);
				$('[data-name=input_d_inSelect]').fadeOut(300);
				$('[data-name=input_sl_inSelect]').fadeOut(300);
				$('[data-name=input_S_inSelect]').fadeOut(300);
				$('[data-name=input_X_inSelect]').fadeIn(300);
				$('[data-name=input_Bi1_inSelect]').fadeOut(300);

				break;
			case "hash_key":
				
				$('[data-name=input_r_inSelect]').fadeOut(300);
				$('[data-name=cb_recordsFromDb_inSelect]').fadeOut(300);
				$('[data-name=input_d_inSelect]').fadeOut(300);
				$('[data-name=input_sl_inSelect]').fadeOut(300);
				$('[data-name=input_S_inSelect]').fadeOut(300);
				$('[data-name=input_X_inSelect]').fadeOut(300);
				$('[data-name=input_Bi1_inSelect]').fadeOut(300);
				break;
			case "ordering":
				
				$('[data-name=input_r_inSelect]').fadeOut(300);
				$('[data-name=cb_recordsFromDb_inSelect]').fadeOut(300);
				$('[data-name=input_d_inSelect]').fadeOut(300);
				$('[data-name=input_sl_inSelect]').fadeOut(300);
				$('[data-name=input_S_inSelect]').fadeOut(300);
				$('[data-name=input_X_inSelect]').fadeIn(300);
				$('[data-name=input_Bi1_inSelect]').fadeOut(300);
				break;
			case "clustering":
				
				$('[data-name=input_r_inSelect]').fadeIn(300);
				$('[data-name=cb_recordsFromDb_inSelect]').fadeIn(300);
				$('[data-name=input_d_inSelect]').fadeIn(300);
				$('[data-name=input_sl_inSelect]').fadeIn(300);
				$('[data-name=input_S_inSelect]').fadeIn(300);
				$('[data-name=input_X_inSelect]').fadeIn(300);
				$('[data-name=input_Bi1_inSelect]').fadeOut(300);
				break;
			case "secondary":
				
				$('[data-name=input_r_inSelect]').fadeIn(300);
				$('[data-name=cb_recordsFromDb_inSelect]').fadeIn(300);
				$('[data-name=input_d_inSelect]').fadeIn(300);
				$('[data-name=input_sl_inSelect]').fadeIn(300);
				$('[data-name=input_S_inSelect]').fadeIn(300);
				$('[data-name=input_X_inSelect]').fadeIn(300);
				$('[data-name=input_Bi1_inSelect]').fadeIn(300);
				break;						
			case "binary_search":
				
				$('[data-name=input_r_inSelect]').fadeIn(300);
				$('[data-name=cb_recordsFromDb_inSelect]').fadeIn(300);
				$('[data-name=input_d_inSelect]').fadeIn(300);
				$('[data-name=input_sl_inSelect]').fadeIn(300);
				$('[data-name=input_S_inSelect]').fadeIn(300);
				$('[data-name=input_X_inSelect]').fadeOut(300);
				$('[data-name=input_Bi1_inSelect]').fadeOut(300);
				break;	
			default:
				// code block
		}
	});


		// switch case for the index type in Join for modifying the form 
		$(document).on('change', 'select[data-name=list_typeOfIndex_inJoin]', function(event) {
		var index_type_selected_InJoin = $('select[data-name=list_typeOfIndex_inJoin]').val();
		switch(index_type_selected_InJoin) {
			case "primary":
				$('[data-name=input_X_inJoin]').fadeIn(300);
				$('[data-name=input_d_inJoin]').fadeOut(300);
				$('[data-name=input_H_inJoin]').fadeOut(300);
				break;
			case "hash_key":
				$('[data-name=input_X_inJoin]').fadeOut(300);
				$('[data-name=input_d_inJoin]').fadeOut(300);
				$('[data-name=input_H_inJoin]').fadeIn(300);
				break;
			case "clustering":
				$('[data-name=input_X_inJoin]').fadeIn(300);
				$('[data-name=input_d_inJoin]').fadeIn(300);
				$('[data-name=input_H_inJoin]').fadeOut(300);
				break;
			case "secondary":
				$('[data-name=input_X_inJoin]').fadeIn(300);
				$('[data-name=input_d_inJoin]').fadeIn(300);
				$('[data-name=input_H_inJoin]').fadeOut(300);
				break;						
			default:
				// code block
		}
	});


		$(document).on('change', 'select[data-name=list_typeOfIndex2_inJoin]', function(event) {
		var index_type2_selected_InJoin = $('select[data-name=list_typeOfIndex2_inJoin]').val();
		switch(index_type2_selected_InJoin) {
			case "primary":
				$('[data-name=input_X2_inJoin]').fadeIn(300);
				$('[data-name=input_d2_inJoin]').fadeOut(300);
				$('[data-name=input_H2_inJoin]').fadeOut(300);
				break;
			case "hash_key":
				$('[data-name=input_X2_inJoin]').fadeOut(300);
				$('[data-name=input_d2_inJoin]').fadeOut(300);
				$('[data-name=input_H2_inJoin]').fadeIn(300);
				break;
			case "clustering":
				$('[data-name=input_X2_inJoin]').fadeIn(300);
				$('[data-name=input_d2_inJoin]').fadeIn(300);
				$('[data-name=input_H2_inJoin]').fadeOut(300);
				break;
			case "secondary":
				$('[data-name=input_X2_inJoin]').fadeIn(300);
				$('[data-name=input_d2_inJoin]').fadeIn(300);
				$('[data-name=input_H2_inJoin]').fadeOut(300);
				break;						
			default:
				// code block
		}
	});

});

//==========================================Form modification End===========================================