<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<div class="input-group">
		<input type="text" id="url">
		<button type="button" id="parsingStart">파싱 시작</button>
	</div>
	
	<content tag="local_script"> <script type="text/javascript">
		$(document).ready(function() {
			$('#parsingStart').on('click', function() {
				var url = $('#url').val();
				$.ajax({
					type : 'POST',
					data : {
						url : url
					},
					datatype : 'json',
					url : 'parsingStart',
					success : function(data) {

					},
					error : function(xhr, status, error) {
						alert('ajax error');
					}
				});
			});
		});
	</script> </content>
</body>
</html>