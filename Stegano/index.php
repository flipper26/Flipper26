<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Stegano</title>
	<link rel="stylesheet" media="all" href="assets/css/bootstrap.min.css"> <!-- Using bootstrap 4.0 -->
	<link rel="stylesheet" media="all" href="assets/css/style.css">
	<script type="text/javascript" src="assets/js/jquery-1.11.3.min.js"></script>
	<script type="text/javascript" src="assets/js/bootstrap.min.js"></script> <!-- Using bootstrap 4.0 -->
	<script type="text/javascript" src="assets/js/main.js"></script>
</head>
<body>
	<div class="container-fluid">
		<div class="row">
			<div class="col-6 col_elem">
				<div class="main_wrapper">
					<h2>Encryption and Steganography</h2>
					<p class="type_label">
						Encryption
					</p>
					<form>
						<div>
							<p>Please enter your text and the key:</p>
							<input id="plainText_input" type="text" name="plainText" placeholder="Plain Text"/>
							<input id="key_input" type="text" name="key" placeholder="Key" />
							<p>Please Choose an encryption method</p>
							<select id="encryOption">
			 					<option value="OTP">OTP</option>
			   					<option value="AES">AES</option>
							</select>
						</div>
						<div class="btns_group">
							<div id="OK_btn" name="OK" class="button">OK</div>
							<div id="Refresh_btn" name="Refresh" class="buttonRefresh">Refresh</div>
						</div>
						<p id="cypherLable">Cypher Text:</p>
						<div id="result"></div>	
					</form> 
						<div id="UploadLable">Select image to upload:</div>	
						<input id="fileToUpload" type="file" name="fileToUpload" accept="image/*">
						<button id="pictureUpload" value="Upload Image" name="submit" class="button"> Upload Image</button>
						<img id = cypherImage height="120" width="256">
				</div>
			</div>
			<div class="col-6 col_elem">
				<div class="main_wrapper">
					<h2>Encryption and Steganography</h2>
					<p class="type_label">
						Decryption
					</p>
						<div id="UploadLable_decryption">Select image to upload:</div>	
						<input id="fileToUpload_decryption" type="file" name="fileToUpload" accept="image/*">
						<button id="pictureUpload_decryption" value="Upload Image" name="submit" class="button"> Upload Image</button>
					<form>
						<div>
							<p>Please enter the key:</p>
							<input id="key_input_decryption" type="text" name="key" placeholder="Key" />
							<p>In which method was the text encrypted?</p>
							<select id="encryOption">
			 					<option value="OTP">OTP</option>
			   					<option value="AES">AES</option>
							</select>
						</div>
						<div class="btns_group">
							<div id="OK_btn_decryption" name="OK" class="button">OK</div>
							<div id="Refresh_btn_decryption" name="Refresh" class="buttonRefresh">Refresh</div>
						</div>
						<p id="cypherLable_decryption">Cypher Text:</p>
						<div id="result_decryption"></div>	
					</form> 
				</div>
			</div>
		</div>
	</div>
</body>
</html>