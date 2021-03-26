$(document).ready(function(){
	//on click event for the ok button
	$('#OK_btn').click(function(event) {
		//running function to display input for affinity and usage matrices
		ok();
	});
	//on click event for the refressh button
	$('#Refresh_btn').click(function(event) {
		location.reload();
	});

	$('#pictureUpload').click(function(event) {
		//running function to display input for affinity and usage matrices
		uploadAndGetBase64();
		
	});
	$('#pictureUpload_decryption').click(function(event) {
		//running function to display input for affinity and usage matrices
		uploadAndGetBase64_decryption();

	});

	

	//Main Encryption Function
	function ok(){

		var EncryptionOption = $('#encryOption').val();
		console.log("encryOption " + EncryptionOption);

		if (EncryptionOption == "OTP"){
			OTP();
		}else{
			AES();
		}
	}

	function OTP(){
		var plainText = $('#plainText_input').val();
		var key = $('#key_input').val();
		
		console.log("plainText_input " + plainText);
		console.log("key_input " + key);

		//Converting to binary
		var binary_P = toBinary(plainText);
		console.log("binary_P: " + binary_P);
		var binary_K = toBinary(key);
		console.log("binary_K: " + binary_K);

		//checking the if plain text and key are the same and alerting the user
		if(binary_P.length != binary_K.length){
			alert("Plain text length is: " + (binary_P.length - (plainText.length-1)) + " and the key length is: "+ (binary_K.length - (key.length-1)) + ". To use OTP they should have equal size (each character is 8 bits)");
		}else{

			//Xoring the binary values of Plain text and key
			var cypherBinary = XOR(binary_P, binary_K);
			console.log("cypherBinary: " + cypherBinary);

			//Converting the Cypher in bits to text
			var cypherText = toText(cypherBinary);
			console.log("cypherText: " + cypherText);

			//Displaying the results
			$("#cypherLable").css('display', 'block');
			$("#result").html(cypherText);
			$("#fileToUpload").css('display', 'block');
			$("#pictureUpload").css('display', 'block');
			$("#UploadLable").css('display', 'block');
		
		}
	}

	function AES(){
		var plainText = $('#plainText_input').val();
		var key = $('#key_input').val();
		
		console.log("plainText_input " + plainText);
		console.log("key_input " + key);

		//Converting to binary
		var binary_P = toBinary(plainText);
		console.log("binary_P: " + binary_P);
		var binary_K = toBinary(key);
		console.log("binary_K: " + binary_K);
		
		//Checking if the block length and key are at least 128 bits and alerting the user.
		if((binary_P.length - (plainText.length-1)) != 128){
			alert("Block lenght is: " + (binary_P.length - (plainText.length-1)) + " it should be 128 bits (16 characters)");
		}else if((binary_K.length - (key.length-1)) != 128){
			alert("Key lenght is: " + (binary_K.length - (key.length-1)) + " it should be 128 bits (16 characters)")
		}else{

			//adding the first round key
			//In this case we will use the binary of the inputed key
			//since it will always be 128 bits devided into 16 sub groups giving us a byte 
			var resultOfRound = XOR(binary_P, binary_K);
			console.log("First add round key " + resultOfRound);

			//Doing the 9 rounds of 4 steps
			var x = 0;
			var SboxDone;
			var shiftDone;
			var MixDone;
			for(x=0; x<9; x++){
				//Substituting using Sbox
				SboxDone = Sbox(resultOfRound);
				console.log("SboxDone round"+(x+1)+" " + SboxDone);

				//shifting rows
				shiftDone = shiftRows(SboxDone);
				console.log("shiftDone round"+(x+1)+" " + shiftDone);

				//Mixing Columns
				MixDone = mixColumns(shiftDone);
				console.log("MixDone round"+(x+1)+" " + MixDone);

				//Adding RoundKey and getting result of round
				resultOfRound = XOR(MixDone, binary_K);
				console.log("resultOfRound"+(x+1)+" " + resultOfRound);
			}

			//Doing the 10th and last round
			SboxDone = Sbox(resultOfRound);
			console.log("SboxDone round10 " + SboxDone);

			//shifting rows
			shiftDone = shiftRows(SboxDone);
			console.log("shiftDone round10 " + shiftDone);
			
			//Adding RoundKey and getting result of round
			resultOfRound = XOR(shiftDone, binary_K);
			console.log("resultOfRound10 " + resultOfRound);

			//Converting the Cypher in bits to text
			var AEScypherText = toText(resultOfRound);
			console.log("AEScypherText: " + AEScypherText);
			//Displaying the results
			$("#cypherLable").css('display', 'block');
			$("#result").html(AEScypherText);
			$("#fileToUpload").css('display', 'block');
			$("#pictureUpload").css('display', 'block');
			$("#UploadLable").css('display', 'block');
		}


		//used for decryption Should be removed later
		var resultOfDecRound = XOR(resultOfRound, binary_K);
		console.log("First add round key " + resultOfDecRound);

		var y = 0;
		var inverseShiftDone;
		var inverseSboxDone;
		var roudKeyAdded;
		for(y=0; y<9; y++){
			//inverse shifting rows
			inverseShiftDone = inverseShiftRows(resultOfDecRound);
			console.log("inverseShiftDone round"+(y+1)+" " + inverseShiftDone);

			//inverse Substituting using Sbox
			inverseSboxDone = Sbox(inverseShiftDone);
			console.log("inverseSboxDone round"+(y+1)+" " + inverseSboxDone);

			//Adding RoundKey and getting result of round
			roudKeyAdded = XOR(inverseSboxDone, binary_K);
			console.log("roudKeyAdded"+(y+1)+" " + roudKeyAdded);

			//inverse Mixing Columns
			resultOfDecRound = inverseMixColumns(roudKeyAdded);
			console.log("resultOfDecRound"+(y+1)+" " + resultOfDecRound);
			}

		//Doing the 10th decreption round
		inverseShiftDone = inverseShiftRows(resultOfDecRound);
		console.log("inverseShiftDone round"+(y+1)+" " + inverseShiftDone);

		//inverse Substituting using Sbox
		inverseSboxDone = Sbox(inverseShiftDone);
		console.log("inverseSboxDone round"+(y+1)+" " + inverseSboxDone);

		//Adding RoundKey and getting result of round
		roudKeyAdded = XOR(inverseSboxDone, binary_K);
		console.log("roudKeyAdded"+(y+1)+" " + roudKeyAdded);

		//Converting the Cypher in bits to text
		var AESplainText = toText(roudKeyAdded);
		console.log("AESplainText: " + AESplainText);

		
	}
	//not currently used will be used to decrypt the cypher text we get from the encrypted picture
	function decryptAES(){
		var cypherText = $('#cypherText_input').val();
		var key = $('#key_input').val();
		
		console.log("cypherText_input " + cypherText);
		console.log("key_input " + key);

		//Converting to binary
		var binary_C = toBinary(cypherText);
		console.log("binary_C: " + binary_C);
		var binary_K = toBinary(key);
		console.log("binary_K: " + binary_K);
		
		//Checking if the block length and key are at least 128 bits and alerting the user.
		if((binary_C.length - (cypherText.length-1)) != 128){
			alert("Block lenght is: " + (binary_P.length - (cypherText.length-1)) + " it should be 128 bits (16 characters)");
		}else if((binary_K.length - (key.length-1)) != 128){
			alert("Key lenght is: " + (binary_K.length - (key.length-1)) + " it should be 128 bits (16 characters)")
		}else{

			//adding the first round key
			//In this case we will use the binary of the inputed key
			//since it will always be 128 bits devided into 16 sub groups giving us a byte 
			//used for decryption
			var resultOfDecRound = XOR(binary_C, binary_K);
			console.log("First add round key " + resultOfDecRound);

			var y = 0;
			var inverseShiftDone;
			var inverseSboxDone;
			var roudKeyAdded;
			for(y=0; y<9; y++){
				//inverse shifting rows
				inverseShiftDone = inverseShiftRows(resultOfDecRound);
				console.log("inverseShiftDone round"+(y+1)+" " + inverseShiftDone);

				//inverse Substituting using Sbox
				inverseSboxDone = Sbox(inverseShiftDone);
				console.log("inverseSboxDone round"+(y+1)+" " + inverseSboxDone);

				//Adding RoundKey and getting result of round
				roudKeyAdded = XOR(inverseSboxDone, binary_K);
				console.log("roudKeyAdded"+(y+1)+" " + roudKeyAdded);

				//inverse Mixing Columns
				resultOfDecRound = inverseMixColumns(roudKeyAdded);
				console.log("resultOfDecRound"+(y+1)+" " + resultOfDecRound);
				}

			//Doing the 10th decreption round
			inverseShiftDone = inverseShiftRows(resultOfDecRound);
			console.log("inverseShiftDone round"+(y+1)+" " + inverseShiftDone);

			//inverse Substituting using Sbox
			inverseSboxDone = Sbox(inverseShiftDone);
			console.log("inverseSboxDone round"+(y+1)+" " + inverseSboxDone);

			//Adding RoundKey and getting result of round
			roudKeyAdded = XOR(inverseSboxDone, binary_K);
			console.log("roudKeyAdded"+(y+1)+" " + roudKeyAdded);

			//Converting the Cypher in bits to text
			var AESplainText = toText(roudKeyAdded);
			console.log("AESplainText: " + AESplainText);
			}
			//Displaying the results
			//$("#cypherLable").css('display', 'block');
			//$("#result").html(cypherText);
	}
	// 	//Displaying the results
	// 	//$("#cypherLable").css('display', 'block');
	// 	//$("#result").html(cypherText);
	// }

function uploadAndGetBase64(){
		var fullName = document.getElementById("fileToUpload").value;
    	var filename = fullName.substring(12,fullName.length)  ;
   		var fileData = $('#fileToUpload').prop('files')[0];  
        
   		var form_data = new FormData();                  
    	form_data.append('file', fileData);
        form_data.append('upload', 'upload');
        $.ajax({
        url: 'upload.php', // point to server-side PHP script 
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,                         
        type: 'post',
        success: function(Base64){

        	function revertBack(input) {
			    // Removes the spaces from the binary string
			    input = input.replace(/\s+/g, '');
			    // Pretty (correct) print binary (add a space every 8 characters)
			    input = input.match(/.{1,8}/g).join(" ");

			    var newBinary = input.split(" ");
			    var binaryCode = [];

			    for (i = 0; i < newBinary.length; i++) {
			        binaryCode.push(String.fromCharCode(parseInt(newBinary[i], 2)));
			    }
			    var finalBinaryCode = binaryCode.join("");
			    console.log("finalBinaryCode: " + finalBinaryCode);	
			    
			    return finalBinaryCode;
			}

			String.prototype.replaceAt = function(index, replacement) {
   				 return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
  			}


  			function numtoBinary(input){
				var binary = ''; 
		        while (input > 0) { 
		            binary = (input%2) + binary;
		            input = Math.floor(input/2); 
		        } 
		        while(binary.length < 8){
		            binary = "0" + binary;
		        }
		        return binary;  
			}

			function toBinary64(input) {
			  	var binResult = ""; 
			  	var temResult = "";
			 	for (var a = 0; a < input.length; a++) {
			      temResult =  input[a].charCodeAt(0).toString(2);
			      var length = temResult.length;
			      if(length < 8){
			          for(var b = 0; b < (8-length); b++){
			          temResult = "0" + temResult;   
			          }
			      }
			      binResult = binResult + temResult;
			  }
		      return binResult;
			}

        	var imageBinary = toBinary64(Base64);
        	var stringImageBinary = imageBinary.toString();
            var getCyphertext = $('#result').html();
            var binaryGetCyphertext = toBinary64(getCyphertext);
            var cyphertextLength = numtoBinary(binaryGetCyphertext.length);
            var cypherTextCounter = binaryGetCyphertext.length-1;
            var cypherTextCounterLength = cyphertextLength.length-1;
            for(var p = stringImageBinary.length-8; p >= 8 && cypherTextCounterLength >= 0; p = p-1){
                console.log(cyphertextLength[cypherTextCounterLength]);
                stringImageBinary = stringImageBinary.replaceAt(p-1, cyphertextLength[cypherTextCounterLength]);
                cypherTextCounterLength = cypherTextCounterLength-1;
            }
            for(var q = stringImageBinary.length-16; q >= 8 && cypherTextCounter >= 0; q = q-8){
                stringImageBinary = stringImageBinary.replaceAt(q-1, binaryGetCyphertext[cypherTextCounter]);
                if(stringImageBinary.substring(q-8,q) == "01000000"){
                    stringImageBinary = stringImageBinary.replaceAt(q-2,"1");
                }else if(stringImageBinary.substring(q-8,q) == "00101110"){
                    stringImageBinary = stringImageBinary.replaceAt(q-3,"0"); 
                    stringImageBinary = stringImageBinary.replaceAt(q-7,"1");
                    stringImageBinary = stringImageBinary.replaceAt(q-6,"1");
                }else if(stringImageBinary.substring(q-8,q) == "01100000"){
                    stringImageBinary = stringImageBinary.replaceAt(q-2,"1");
                }
                cypherTextCounter = cypherTextCounter-1;
            }
            var dataToExport = revertBack(stringImageBinary);
            var form_data2 = new FormData();
            console.log("dataToExport " + dataToExport);
   			form_data2.append('image', dataToExport);
   			form_data2.append('upload', 'export');
            $.ajax({
	        url: 'upload.php', // point to server-side PHP script 
	        dataType: 'text',  // what to expect back from the PHP script, if anything
	        cache: false,
	        contentType: false,
	        processData: false,
	        data: form_data2,                         
	        type: 'post',
	        success: function(php_script_response){
	        var src1 = 'uploads/cypher.png';
			$("#imgLocation").attr("src", src1);
           // document.getElementById("cypherImage").innerHTML="<a href='uploads/cypher.png' target='_blank'>Encrypted Image</a>";
        }});

        }});

        
	}
	//for Decreption ===> not done yet
	function uploadAndGetBase64_decryption(){
		var fullName = document.getElementById("fileToUpload_decryption").value;
    	var filename = fullName.substring(12,fullName.length)  ;
   		var fileData = $('#fileToUpload_decryption').prop('files')[0];  
        
   	
	}


//====================================================================Used functions=========================================================================================
	
	
	//function for transforming to binary
	function toBinary(input){
		var binaryResult = "";
		for (i=0; i<input.length; i++){
			var charBinary = input[i].charCodeAt(0).toString(2);
			if (charBinary.length == 0){
				charBinary = "00000000"+ charBinary;
				if(i==0){
					binaryResult = charBinary;
				}else{
					binaryResult = binaryResult + " " + charBinary;
				}
			}else if (charBinary.length == 1){
				charBinary = "0000000"+ charBinary;
				if(i==0){
					binaryResult = charBinary;
				}else{
					binaryResult = binaryResult + " " + charBinary;
				}
			}else if (charBinary.length == 2){
				charBinary = "000000"+ charBinary;
				if(i==0){
					binaryResult = charBinary;
				}else{
					binaryResult = binaryResult + " " + charBinary;
				}
			}else if (charBinary.length == 3){
				charBinary = "00000"+ charBinary;
				if(i==0){
					binaryResult = charBinary;
				}else{
					binaryResult = binaryResult + " " + charBinary;
				}
			}else if (charBinary.length == 4){
				charBinary = "0000"+ charBinary;
				if(i==0){
					binaryResult = charBinary;
				}else{
					binaryResult = binaryResult + " " + charBinary;
				}
			}else if (charBinary.length == 5){
				charBinary = "000"+ charBinary;
				if(i==0){
					binaryResult = charBinary;
				}else{
					binaryResult = binaryResult + " " + charBinary;
				}
			}else if (charBinary.length == 6){
				charBinary = "00"+ charBinary;
				if(i==0){
					binaryResult = charBinary;
				}else{
					binaryResult = binaryResult + " " + charBinary;
				}
			}else if(charBinary.length == 7){
				charBinary = "0"+ charBinary;
				if(i==0){
					binaryResult = charBinary;
				}else{
					binaryResult = binaryResult + " " + charBinary;
				}
			}else{
				if(i==0){
					binaryResult = charBinary;
				}else{
					binaryResult = binaryResult + " " + charBinary;
				}
			}
		}
		return binaryResult;
	}



	//Function for transforming binary to text
	function toText(input){
		var textResult = "";
		var textChars = input.split(" ");
		console.log("textChars: " + textChars);		
		for (i=0; i<textChars.length; i++){
		var textResult = textResult + String.fromCharCode(parseInt(textChars[i],2).toString(10));
		}
		return textResult;
	}

	function binToStr(input){
		var textResult = parseInt(input,2).toString(10);
		return textResult;
	}

	//function for Xoring two binary sequances of the same length
	function XOR (text, key){
		var cypherBit;
		var cypherTextBinary = "";
		var cypherBits = "";
		var charBits;
		var keyBits;
		//getting the character bits out of the string in an array
		var textBinary = text.split(" ");
		var keyBinary = key.split(" ");
		console.log("textBinary: " + textBinary);
		console.log("keyBinary: " + keyBinary);	
		//looping to go through every element in the array
		for (i=0; i<textBinary.length; i++){
			charBits = textBinary[i];
			keyBits = keyBinary[i];
			console.log("charBits: " + charBits);
			console.log("keyBits: " + keyBits);
			//looping to go through every bit in the element of the array reached by the first loop to perform XOR
			for(j=0; j<charBits.length; j++){
				if(charBits[j] == '1' && keyBits[j] == '1'){
					cypherBit = '0';
				}
				if(charBits[j] == '0' && keyBits[j] == '0'){
					cypherBit = '0';
				}
				if((charBits[j] == '0' && keyBits[j] == '1') || (charBits[j] == '1' && keyBits[j] == '0')){
					cypherBit = '1';
				}
				//recustructing an 8 bit element 
				cypherBits = cypherBits + cypherBit;
				console.log("cypherBits: " + cypherBits);
			}
			//reconstructing the whole sequance as an encrypted message
			if(i==0){
					cypherTextBinary = cypherBits;
					cypherBits = "";
				}else{
					cypherTextBinary = cypherTextBinary +" "+ cypherBits;
					cypherBits = "";
				}
		}
		return cypherTextBinary;
	}

	function Sbox(input){
		//the Sbox
		var sbox = "11100101";
		//getting the character bits out of the string in an array
		var sboxByteArray = input.split(" ");
		var sboxBit;
		var sboxBits = "";
		var afterSbox = "";
		//looping to go through every element in the array
		for (i=0; i< sboxByteArray.length; i++){
			var bitGroup = sboxByteArray[i];
			console.log("bitGroup: " + bitGroup);
			console.log("sbox: " + sbox);
			//looping to go through every bit in the element of the 
			//array reached by the first loop to perform a Sbox substitution
			for(j=0; j<bitGroup.length; j++){
				//when we have 1 we reverse the bit if we have 0 we keep the same bit
				if(sbox[j] == '1'){
					if(bitGroup[j] == '0'){
						sboxBit = '1'
					}else{
						sboxBit = '0'
					}
				}else{
					sboxBit = bitGroup[j];
				}
				//recustructing an 8 bit element 
				sboxBits = sboxBits + sboxBit;
				console.log("sboxBits: " + sboxBits);
			}
			//reconstructing the whole sequance modified by Sbox
			if(i==0){
					afterSbox = sboxBits;
					sboxBits = "";
				}else{
					afterSbox = afterSbox +" "+ sboxBits;
					sboxBits = "";
				}
		}
		return afterSbox;
	}

	function move(arr, old_index, new_index) {
	    while (old_index < 0) {
	        old_index += arr.length;
	    }
	    while (new_index < 0) {
	        new_index += arr.length;
	    }
	    if (new_index >= arr.length) {
	        var k = new_index - arr.length;
	        while ((k--) + 1) {
	            arr.push(undefined);
	        }
	    }
	    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);  
	   	return arr;
	}

	//shifting rows
	function shiftRows(input){
		//splitting the receieved string into an array
		var shiftByteArray = input.split(" ");
		//shifting the array obtained
		var shiftedRowsArray4 = move(shiftByteArray, 0, 15);
		var shiftedRowsArray3 = move(shiftedRowsArray4, 2, 11);
		var shiftedRowsArray2 = move(shiftedRowsArray3, 5, 8);
		var shiftedRowsArray1 = move(shiftedRowsArray2, 12, 4);
		var shiftedRowsArray = move(shiftedRowsArray1, 10, 7);
		console.log("shiftedRowsArray: " + shiftedRowsArray);
		//recreating a string of the shifted array
		var shiftedRows;
		for (i=0; i< shiftedRowsArray.length; i++){
			if(i==0){
					shiftedRows = shiftedRowsArray[i];
				}else{
					shiftedRows = shiftedRows +" "+ shiftedRowsArray[i];
				}
		}
		return shiftedRows;
	}
	//inverse shifting the rows same as shiftRows function but with backward steps
	function inverseShiftRows(input){
		var inverseShiftByteArray = input.split(" ");
		var inverseShiftedRowsArray4 = move(inverseShiftByteArray, 7, 10);
		var inverseShiftedRowsArray3 = move(inverseShiftedRowsArray4, 4, 12);
		var inverseShiftedRowsArray2 = move(inverseShiftedRowsArray3, 8, 5);
		var inverseShiftedRowsArray1 = move(inverseShiftedRowsArray2, 11, 2);
		var inverseShiftedRowsArray = move(inverseShiftedRowsArray1, 15, 0);
		console.log("inverseShiftedRowsArray: " + inverseShiftedRowsArray);
		var inverseShiftedRows;
		for (i=0; i< inverseShiftedRowsArray.length; i++){
			if(i==0){
					inverseShiftedRows = inverseShiftedRowsArray[i];
				}else{
					inverseShiftedRows = inverseShiftedRows +" "+ inverseShiftedRowsArray[i];
				}
		}
		return inverseShiftedRows;
	}

	function byteXOR(byte, byteKey){
		var mixedByte = "";
		var mixbit = "";
		for(i=0; i<byte.length; i++){
				if(byte[i] == '1' && byteKey[i] == '1'){
					mixBit = '0';
				}
				if(byte[i] == '0' && byteKey[i] == '0'){
					mixBit = '0';
				}
				if((byte[i] == '0' && byteKey[i] == '1') || (byte[i] == '1' && byteKey[i] == '0')){
					mixBit = '1';
				}
				//recustructing an 8 bit element 
				mixedByte = mixedByte + mixBit;
				console.log("mixedByte: " + mixedByte);
			}
			return mixedByte;

	}

	function mixColumns(input){
		var MixByteArray = input.split(" ");
		//first 4 bytes mix
		var byte1 = MixByteArray[0];
		var byte2 = MixByteArray[1];
		var byte3 = MixByteArray[2];
		var byte4 = MixByteArray[3];
		//mixing
		byte2 = byteXOR(byte2, byte1);
		byte3 = byteXOR(byte3, byte1);
		byte4 = byteXOR(byte4, byte1);
		byte1 = byteXOR(byte1, byte3);

		//second 4 bytes mix
		var byte5 = MixByteArray[4];
		var byte6 = MixByteArray[5];
		var byte7 = MixByteArray[6];
		var byte8 = MixByteArray[7];
		//mixing 
		byte6 = byteXOR(byte6, byte5);
		byte7 = byteXOR(byte7, byte5);
		byte8 = byteXOR(byte8, byte5);
		byte5 = byteXOR(byte5, byte7);

		//third 4 bytes mix
		var byte9 = MixByteArray[8];
		var byte10 = MixByteArray[9];
		var byte11 = MixByteArray[10];
		var byte12 = MixByteArray[11];
		//mixing
		byte10 = byteXOR(byte10, byte9);
		byte11 = byteXOR(byte11, byte9);
		byte12 = byteXOR(byte12, byte9);
		byte9 = byteXOR(byte9, byte11);

		//fourth 4 bytes mix
		var byte13 = MixByteArray[12];
		var byte14 = MixByteArray[13];
		var byte15 = MixByteArray[14];
		var byte16 = MixByteArray[15];
		//mixing
		byte14 = byteXOR(byte14, byte13);
		byte15 = byteXOR(byte15, byte13);
		byte16 = byteXOR(byte16, byte13);
		byte13 = byteXOR(byte13, byte15);
	
		var mixedColumns = byte1 +" "+ byte2 +" "+ byte3 +" "+ byte4 +" "+ 
						   byte5 +" "+ byte6 +" "+ byte7 +" "+ byte8 +" "+ 
						   byte9 +" "+ byte10 +" "+ byte11 +" "+ byte12 +" "+ 
						   byte13 +" "+ byte14 +" "+ byte15 +" "+ byte16;

		return mixedColumns;
	}

	function inverseMixColumns(input){

		var inverseMixByteArray = input.split(" ");
		//first 4 bytes inverseMix
		var byte1 = inverseMixByteArray[0];
		var byte2 = inverseMixByteArray[1];
		var byte3 = inverseMixByteArray[2];
		var byte4 = inverseMixByteArray[3];
		//inverseMixing
		byte1 = byteXOR(byte1, byte3);
		byte2 = byteXOR(byte2, byte1);
		byte3 = byteXOR(byte3, byte1);
		byte4 = byteXOR(byte4, byte1);
		
		//second 4 bytes inverseMix
		var byte5 = inverseMixByteArray[4];
		var byte6 = inverseMixByteArray[5];
		var byte7 = inverseMixByteArray[6];
		var byte8 = inverseMixByteArray[7];
		//inverseMixing 
		byte5 = byteXOR(byte5, byte7);
		byte6 = byteXOR(byte6, byte5);
		byte7 = byteXOR(byte7, byte5);
		byte8 = byteXOR(byte8, byte5);
		
		//third 4 bytes inverseMix
		var byte9 = inverseMixByteArray[8];
		var byte10 = inverseMixByteArray[9];
		var byte11 = inverseMixByteArray[10];
		var byte12 = inverseMixByteArray[11];
		//inverseMixing
		byte9 = byteXOR(byte9, byte11);
		byte10 = byteXOR(byte10, byte9);
		byte11 = byteXOR(byte11, byte9);
		byte12 = byteXOR(byte12, byte9);
		
		//fourth 4 bytes inverseMix
		var byte13 = inverseMixByteArray[12];
		var byte14 = inverseMixByteArray[13];
		var byte15 = inverseMixByteArray[14];
		var byte16 = inverseMixByteArray[15];
		//inverseMixing
		byte13 = byteXOR(byte13, byte15);
		byte14 = byteXOR(byte14, byte13);
		byte15 = byteXOR(byte15, byte13);
		byte16 = byteXOR(byte16, byte13);
		
	
		var inverseMixedColumns = byte1 +" "+ byte2 +" "+ byte3 +" "+ byte4 +" "+ 
						   byte5 +" "+ byte6 +" "+ byte7 +" "+ byte8 +" "+ 
						   byte9 +" "+ byte10 +" "+ byte11 +" "+ byte12 +" "+ 
						   byte13 +" "+ byte14 +" "+ byte15 +" "+ byte16;

		return inverseMixedColumns;
		
	}


});