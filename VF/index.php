<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Vertical Fragmantation</title>
	<link rel="stylesheet" media="all" href="assets/css/bootstrap.min.css"> <!-- Using bootstrap 4.0 -->
	<link rel="stylesheet" media="all" href="assets/css/style.css">
	<script type="text/javascript" src="assets/js/jquery-1.11.3.min.js"></script>
	<script type="text/javascript" src="assets/js/bootstrap.min.js"></script> <!-- Using bootstrap 4.0 -->
	<script type="text/javascript" src="assets/js/main.js"></script>
</head>
<body>
	<div class="main_wrapper">
		<div class="container-fluid">
			<div class="row">
				<div class="col-md-6 col-lg-6 col-xl-6">
					<h2>Vertical Fragmantation Using Bond Energy</h2>
					<br/>
					<form action="action_page.php" method="post">

						<p>Please provide the number of:</p>
						<input id="query_input" type="number" name="queries" min="1" max="10" placeholder="Queries"/>
						<input id="attributes_input" type="number" name="attributes" min="1" max="10" placeholder="Attributes" />
						<input id="sites_input" type="number" name="sites" min="1" max="10" placeholder="Sites" />
						<div class="btns_group">
							<div id="proceed_btn" name="Proceed" class="button">Proceed</div>
							<div id="Refresh_btn" name="Refresh" class="buttonRefresh">Refresh</div>
						</div>
					</form> 
					<div class="proceed_main_wrapper" id="proceed_main_wrapper_id">
						<div class="table_element">
							<p>Please fill the usage matrix</p>
							<table id="Usage_Matrix">
								<thead>
									<tr>
										<th></th>
									</tr>
								</thead>
								<tbody></tbody>
							</table>
						</div>
						<div class="table_element">
							<p>Please fill the Accessibility matrix</p>
							<table id="Accessibility_Matrix">
								<thead>
									<tr>
										<th></th>
									</tr>
								</thead>
								<tbody></tbody>
							</table>
						</div>
						<div id="compute_btn" name="compute" class="button">Compute</div>
					</div>
				</div>
				<div class="col-md-6 col-lg-6 col-xl-6">
					<div class="result_main_wrapper" id="result_main_wrapper_id">
					<h2>Result</h2>
						<div class="table_element">
							<p>AA Matrix</p>
							<table id="Affinity_Matrix">
								<thead>
									<tr>
										<th></th>
									</tr>
								</thead>
								<tbody></tbody>
							</table>
						</div>
						<div class="table_element">
							<p>CA Matrix</p>
							<table id="Clustered_Matrix">
								<thead>
									<tr>
										<th></th>
									</tr>
								</thead>
								<tbody></tbody>
							</table>
						</div>
						<div id="results">
						<h2>Z Calculation</h2>
						</div>
						<div>
						<p id="result_z"></p>
						</div>	
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>