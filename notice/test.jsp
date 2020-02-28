<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<style>
.noticeLiveTitle {
}
</style>
</head>
<body>
	<form action="noticeTest" method="get" name="noticeLiveTitle">
		<div class="container-fluid">
			<div class="row" style="margin-top: 80px;">
				<div class="col" style="text-align: center;">
					<div id="noticeLiveTitle" style="height: 50px; width: 100%; border: 1px solid green; border-radius: 10px;
					 background-color: #deffdb; text-align: center; vertical-align: center; padding-top: 10px;">
						<a href="noticeDetail"></a>
					</div>
					<button type="button" class="btn btn-primary" onclick="location.href='testInsertDatas'">테스트 데이터 세트 생성</button>
				</div>
			</div>
		</div>	
	</form>
</body>
<content tag="local_script"><script type="text/javascript" src="resources/js/liveTitle.js"></script> </content>
</html>