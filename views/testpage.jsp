<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html class="h-100">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Register</title>
<!-- Favicon icon -->
<link rel="icon" type="resources/image/png" sizes="16x16"
	href="resources/images/favicon.png">
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
<link href="resources/css/style.css" rel="stylesheet">
</head>

<body class="h-100">
<form action="testPageAction" method="post">
<input type="text" name="name" value="input Name" disabled>
<select name="selectBox" disabled>
<option value="select selectBox" selected>TEST</option>
</select>
	<button type="submit">submit</button>
	<div class="row">
		<div class="form-group input-group">
			<div class="col-sm-2"></div>
			<div class="col-sm-8">
				<div class="form-group input-group">
					<input type="text" class="form-control" value="title" readonly="readonly">
					<input type="text" id="testText1" class="form-control" value="title내용">
				</div>
			</div>
			<div class="col-sm-2"></div>
			
			<div class="col-sm-2"></div>
			<div class="col-sm-8">
				<input type="text" id="testText2" class="form-control" value="bbb">
			</div>
			<div class="col-sm-2"></div>
		</div>
	</div>
</form>

	<!--**********************************
        Scripts
    ***********************************-->
	<script src="resources/plugins/common/common.min.js"></script>
	<script src="resources/js/custom.min.js"></script>
	<script src="resources/js/settings.js"></script>
	<script src="resources/js/gleek.js"></script>
	<script src="resources/js/styleSwitcher.js"></script>

	<script src="resources/js/sweetalert.min.js"></script>

	<script type="text/javascript">
	$(document).ready(function() {
		$('#testBtn').on('click',function(){
		});
	});
	</script>

</body>
</html>