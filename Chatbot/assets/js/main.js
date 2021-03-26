$(document).ready(function(){
	//on click event for the proceed button
	$('#proceed_btn').click(function(event) {
		//running function to display input for affinity and usage matrices
		proceed();
		
	});
	//on click event for the refressh button
	$('#Refresh_btn').click(function(event) {
		location.reload();
	});
	//on click event for the compute button
	$('#compute_btn').click(function(event) {
		//running function to compute
		compute();
		$("#compute_btn").remove();
		$("#result_main_wrapper_id").fadeIn(400, function() {	
		});
	});

	//function to display input for affinity and usage matrices
	function proceed(){
		var error_q = false;
		var error_a = false;
		var error_s = false;

		var num_q = $('#query_input').val();
		if((num_q > 10) || (num_q < 0)){
			$('#query_input').addClass('error');
			error_q = true;
		}
		var num_a = $('#attributes_input').val();
		if((num_a > 10) || (num_a < 0)){
			$('#attributes_input').addClass('error');
			error_a = true;

		}
		var num_s = $('#sites_input').val();
		if((num_s > 10) || (num_s < 0)){
			$('#sites_input').addClass('error');
			error_s = true;

		}

		if((error_q || error_a || error_s) == true){

		}else{
			//Creating the Usage Matrix
			for (var x = 1 ; x <= num_q; x++) {
				$('<tr></tr>').attr('id', 'trUsa_' + x).appendTo('#Usage_Matrix tbody');
				$('<td></td>').attr('id', 'q_label_usa'+x+'_a').html('q' + x).addClass('bold_text').appendTo('#trUsa_' + x);
				if(x <= num_a){
					$('<th></th>').attr('id', 'th_headUsa_' + x).html('A' + x).appendTo('#Usage_Matrix thead tr');
				}
				for (var y = 1 ; y <= num_a; y++) {
					$('<td></td>').attr('id', 'q'+x+'_a'+y).appendTo('#trUsa_'+x);
					$('<select/>').attr('id', 'q'+x+'_a'+y+'_input').appendTo('#q'+x+'_a'+y).append('<option value="0">0</option><option value="1">1</option>');
				}
			}

			//Creating the Accessibility Matrix
			for (var x = 1 ; x <= num_q; x++) {
				$('<tr></tr>').attr('id', 'trAcc_' + x).appendTo('#Accessibility_Matrix tbody');
				$('<td></td>').attr('id', 'q_label_acc'+x+'_a').html('q' + x).addClass('bold_text').appendTo('#trAcc_' + x);
				if(x <= num_s){
					$('<th></th>').attr('id', 'th_headAcc_' + x).html("S" + x).appendTo('#Accessibility_Matrix thead tr');
				}
				for (var y = 1 ; y <= num_s; y++) {
					$('<td></td>').attr('id', 'q'+x+'_s'+y).appendTo('#trAcc_'+x);
					$('<input/>').attr({'id': 'q'+x+'_s'+y+'_input','type': 'number'}).appendTo('#q'+x+'_s'+y).addClass('accessibilityInput');
				}
			}
		//disabeling input
		$("#query_input").prop('disabled', true);
		$("#attributes_input").prop('disabled', true);
		$("#sites_input").prop('disabled', true);
		$("#proceed_btn").remove();
		$("#proceed_main_wrapper_id").fadeIn(400);
		}
	}

	function compute(){

		// Deaclarations
		var num_q = $('#query_input').val();
		var num_a = $('#attributes_input').val();
		var num_s = $('#sites_input').val();
		var usageArray = [];
        var accessArray = [];
        var AAArray = []; 
        var queryTotalAcc = [];

//====================================================== Start Of calculation of AA Matrix =======================================================================

		//Get values of the usage matrix in an 2D array
		for(var x = 1; x <= $("#Usage_Matrix tbody tr").length; x++){
 			usageArray[x] =[];
	 		for(var y = 1; y <= num_a; y++){
		  		usageArray[x][y]  = $('#q'+x+'_a'+y+'_input').val();
			   	console.log("Usage_Matrix " + usageArray[x][y]);
			}
		}

		//Get values of the accessibility matrix in an 2D array
		for(var x = 1; x <= $("#Accessibility_Matrix tbody tr").length; x++){
 			accessArray[x] =[];
	 		for(var y = 1; y <= num_s; y++){
		  		accessArray[x][y]  = $('#q'+x+'_s'+y+'_input').val();
			   	console.log("Accessibility_Matrix " + accessArray[x][y]);
			}
		}

		//creating an array by adding of to total accessibility(sum of values on each site) per query
		for(var x = 1; x <= num_q; x++){
			queryTotalAcc[x] = 0;
	 		for(var y = 1; y <= num_s; y++){
		  		queryTotalAcc[x] = Number(queryTotalAcc[x]) + Number(accessArray[x][y]);
			}
		}

		//displaying the content if the query array on the console
		for(var x = 1; x < queryTotalAcc.length; x++){

			console.log("queryTotalAcc " + queryTotalAcc[x]);
		}

		//Declaring an array that will temporarly store values of query
	    var tempQuaryAccess = [];
	    //nested loops to go through the usage matrix
	    for(var counter1 = 1; counter1 <= num_a; counter1++){
	        AAArray[counter1] =[];
	        for(var counter2 = 1; counter2 <= num_a ; counter2++){
	        	//initializing the 2D array
	            AAArray[counter1][counter2]=0;
	            //loop to to check if the the query has access to both attributes by adding 'yes' if its true and 'no' if it has access to only one or no attributes
	            //Yes and No will be added to the tempQuaryAccess Array
	            for(var counter3 = 1; counter3 <= num_q; counter3++){
	            	//
	                if((Number(usageArray[counter3][counter2]) == Number(usageArray[counter3][counter1])) && (Number(usageArray[counter3][counter1]) == 1)){
	                  //Adding Yes
	                  tempQuaryAccess[counter3] = 'Yes';
	                }else{
	                	//Adding No
	                    tempQuaryAccess[counter3] = 'No';
	                }
	            }
	            //looping through the tempQuaryAccess and calculating the affinity when 'Yes'
	            for(var counter4 = 1; counter4 <= num_q; counter4++){
	                if(tempQuaryAccess[counter4] == 'Yes'){	            
	                     AAArray[counter1][counter2]= Number(AAArray[counter1][counter2]) + Number(queryTotalAcc[counter4]);	                
	                } 
	            }
	        } 
	    }

	    //Displaying the affinity matrix AA
	    for (var x = 1 ; x <= num_a; x++) {
			$('<tr></tr>').attr('id', 'trAff_' + x).appendTo('#Affinity_Matrix tbody');
			$('<td></td>').attr('id', 'a_label_aff'+x+'_a').html('A' + x).addClass('bold_text').appendTo('#trAff_' + x);
			$('<th></th>').attr('id', 'th_headAcc_' + x).html("A" + x).appendTo('#Affinity_Matrix thead tr');
			for (var y = 1 ; y <= num_a; y++) {
				$('<td></td>').attr('id', 'A'+x+'_A'+y).appendTo('#trAff_'+x);
				$('<div></div>').attr('id', 'A'+x+'_A'+y+'_result').appendTo('#A'+x+'_A'+y).addClass('MatrixCell').html(AAArray[x][y]);
			}
		}

//====================================================== Start Of Bond Energy Algorithm =======================================================================
	  
		//Declarations
		var CAArray = [];
   		var ColumnNum = 0;
   		var bestContribution;
	    var bondIndex;
	    var contributionIndex; 
	    var loc;
	    var bond_1; 
        var bond_2; 
        var bond_3;  
        var contribution; 

   		//Extracting the first 2 columns from the AA matrix and numbering the columns
		for(var x = 1; x <= num_a; x++){
			CAArray[x] = [];
     		CAArray[ColumnNum] = [];
     		 for(y = 1; y <= 2;y++){
      			 CAArray[ColumnNum][y] = y;
       			 CAArray[x][y] = AAArray[x][y];
       		}
		}
      	//looping on index which specifies the column we want to shift
	    //index incremented in the for loop after the column at index has found the best position and has been shifted.
	    for(var index = 3; index<=num_a; index++){
	    	//Initialization
		    bestContribution = 0;
		    bondIndex = 0;
		    contributionIndex = 0; 
		    loc  = 0;
		    //loop to calculate contribution of (i-1, index, i).
		    for(var i=1; i<= index-1 ; i++){
		    	//initialization
		        bond_1 = 0; 
		        bond_2 = 0; 
		        bond_3 = 0;  
		        contribution = 0; 
		        //loop to calculate bonds for (i-1, index, i) which will let us calculate the best Contribution.
		        //All bonds are calculated in the same loop at the same time
		        for(var counter=1; counter<=num_a; counter++){
		        	//Note that AA matrix is used to get values of column at index while CA matrix is used for the rest.
			        if(((i-1)==0) || (i>index)){
				        bond_1 = 0;
				        bond_2 = bond_2 + Number(AAArray[counter][index]) * Number(CAArray[counter][i]);
				        bond_3 = 0;							                       	
			        }else{
				        bond_1 = bond_1 + Number(CAArray[counter][i-1]) * Number(AAArray[counter][index]);
				        bond_2 = bond_2 + Number(AAArray[counter][index]) * Number(CAArray[counter][i]);
				        bond_3 = bond_3 + Number(CAArray[counter][i-1]) * Number(CAArray[counter][i]);
					}
				}
				//After bond calculation we can calculate the contribution.
				contribution = 2*bond_1 + 2*bond_2 - 2*bond_3;

				//if the contribution found in this iteration is better than the previous one we assign its value to bestContribution
				//and we give the location loc the value of i which is the position the column will be shifted to.
				if(contribution > bestContribution){
				    bestContribution = contribution;
				    loc = i;
				}
	        }	
	     
		    //calculate contribution of index-1 index index+1 which is only bond(index-1, index) since Index+1 will always give zero
		    for(var counter = 1; counter <= num_a; counter++){
		    	bondIndex = bondIndex + Number(CAArray[counter][index-1]) * Number(AAArray[counter][index]);
			}

			contributionIndex = 2 * bondIndex;
		    //console.log("contributionIndex"+contributionIndex);
		    if(contributionIndex > bestContribution){
			    bestContribution = contributionIndex;
			    loc = i;
		 	}

			//Creating an array to temporarly store the content of CA array to be used later when shifting to loc+1
			var tempCAArray = [];
			for(var x = 0; x <= num_a; x++){
				tempCAArray[x] = [];
				for(var y = 1; y <= num_a; y++){
				    tempCAArray[x][y] = CAArray[x][y];
			    }  
			}
			        
			//replacing the column at loc with the column at index using the AA matrix
			for(x = 1; x <= num_a; x++){
				CAArray[ColumnNum][loc] = index;
				CAArray[x][loc] = AAArray[x][index];
			}
			
			//Adding the replaced columns at location+1 and above(shifting the columns)    
			for(var x = loc + 1; x <= index; x++){
			    for(y = 1; y <= num_a; y++){
			        CAArray[ColumnNum][x] = tempCAArray[0][x-1];
			        CAArray[y][x] = tempCAArray[y][x-1];
			    } 
			}
		}

		//copying the values from CAArray to another array to be used later to switch the rows
		var rowSwitchArray = [];
	    for(var x = 0; x <= num_a; x++){
	      rowSwitchArray[x] = [];
	      for(var y = 1; y <= index; y++){
	        rowSwitchArray[x][y] = CAArray[x][y];
	        }  
	    }

     	//switch rows to be in the same order as columns
		for(var x = 1; x <= num_a; x++){
			for(var y = 1; y <= num_a; y++){
				var temp = rowSwitchArray[0][y];
 			    CAArray[x][y] = rowSwitchArray[temp][x];
     		} 
 		}

	 	//Displaying the culstered matrix CA
	    for (var x = 1 ; x <= num_a; x++) {
			$('<tr></tr>').attr('id', 'trClus_' + x).appendTo('#Clustered_Matrix tbody');
			$('<td></td>').attr('id', 'a_label_clus'+x+'_a').html('A' + CAArray[0][x]).addClass('bold_text').appendTo('#trClus_' + x);
			$('<th></th>').attr('id', 'th_headClus_' + x).html("A" + CAArray[0][x]).appendTo('#Clustered_Matrix thead tr');
			for (var y = 1 ; y <= num_a; y++) {
				$('<td></td>').attr('id', 'A'+x+'_A'+y+'_CA').appendTo('#trClus_'+x);
				$('<div></div>').attr('id', 'A'+x+'_A'+y+'_result').appendTo('#A'+x+'_A'+y+'_CA').addClass('MatrixCell').html(CAArray[x][y]);
			}
		}

	
		//====================================================== Calculating Z =======================================================================
	
		var highest_z = 0;
		var checkpoint = true;
		//Loop to shift the position at which we want to see if we should fragment
		for(var position = 1; position < num_a; position++){
		    var TA = 0; 
		    var BA = 0; 
		    var TA_BA = 0; 
		    var z = 0;
		    var array_BA = [];
		    var array_TA = [];
		    var array_TA_BA = [];   
		    //loop to go through each row of the Usage Materix
		    for(var count = 1; count <= num_q; count++){
		        var isOne = 0;
		        //arrays that will store each quary 
		        array_TA_BA[count] = 0;
		        array_TA[count] = 0; 
		        array_BA[count] = 0; 
		        //Nested loops to select a column from the usage matrix and compare each of it values to another column
		        //since the CA matrix has switched columns in order to calculate Z accuratly we need to get 
		        //the original index of the column to be used when comparing usage in the usage uary
		        for(var x = 1; x <= position; x++){
		            for(var y = position + 1; y <= num_a; y++){
		            	//Getting the index of the column form the CA query to be used in the usage quary in order to commpare
		            	var ca_index_x = CAArray[0][x];
		            	var ca_index_y = CAArray[0][y];
		            	//we check if both values are 1 then the current attribute (attribute at <= position) is a TA_BA attribute its not TA or BA only attribute
		                if((Number(usageArray[count][ca_index_x]) == Number(usageArray[count][ca_index_y])) && (Number(usageArray[count][ca_index_y]) == 1)){
		                    isOne = 1;
		                    array_BA[count] = 0;
		                    array_TA_BA[count] = 1;
		                }
		                //if both values are not 1 and the attribute at > position is one then it is a BA attribute
		                if((Number(usageArray[count][ca_index_x]) != Number(usageArray[count][ca_index_y])) && (Number(usageArray[count][ca_index_y]) == 1)){
		                    if(isOne != 1){
		                    array_BA[count] = 1;
		                    }
		                //if both values are not 1 and the attribute at <= position is one then it is NOT a BA attribute
		                }else if((Number(usageArray[count][ca_index_x]) == 1)){
		                    if(array_BA[count] != 1){
		                        array_BA[count] = 0; 
		                    }
		                }else{
		                     if(array_BA[count] != 1){
		                     	array_BA[count] = 0;  
		                    }
		                }
		                //If the attribute is not a BA attribute and at <= position is one and they are not both 1 then it is a TA attribute
		                if((array_BA[count] == 0) && (Number(usageArray[count][ca_index_x]) == 1) && (isOne == 0)){
		                     array_TA[count] = 1;  
		                }
		            }
		        } console.log("acc "+isOne+" "+Number(usageArray[count][ca_index_x])+" "+array_BA[count]+" "+array_TA[count]);
		    }
		    //Loop to used the arrays created to calculate z using the accessibility of queries to the attributes
		    for(var countFor_z = 1; countFor_z <= num_q; countFor_z++){
		        if(array_TA[countFor_z] == 1){
		                TA= TA + Number(queryTotalAcc[countFor_z]); 
		        }
		        if(array_BA[countFor_z] == 1){
		            BA= BA + Number(queryTotalAcc[countFor_z]);
		        }
		        if(array_TA_BA[countFor_z] == 1){
		              TA_BA= TA_BA + Number(queryTotalAcc[countFor_z]);
		        }
		    }
		    console.log("BA : "+BA);
		    console.log("TA : "+TA);
		    console.log("TA_BA : "+TA_BA);
		    z=TA*BA-Math.pow(TA_BA, 2);

		    $('<p></p>').attr('id', 'position '+position).appendTo('#results').html("z at position "+position+" is: "+z);

		    //Making sure the Highest Z is displayed
		    if(checkpoint){
		    	highest_z = z;
		    	checkpoint = false;
		    }

		    if(highest_z < z){

		      highest_z = z;
		    }
		    console.log("best z "+ highest_z ) ;
		}
		$('#result_z').html("The Best z is: "+highest_z).addClass('bold_text');
	}
});