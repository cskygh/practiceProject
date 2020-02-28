<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Project List Page</title>
<content tag="local_css">
	<link rel="stylesheet" href="resources/css/project/project_list_page.css">
</content>
</head>
<body>
	<div class="row">
		<div class="col-sm-1"></div>
		<div class="col-sm-8">
		<input type="hidden" id="email" value="${sessionEmail}">
		<input type="hidden" id="name" value="${sessionName}">
			<div id="project-list" class="row">
				<div class="addDiv">
					<div id="add-btn" class="add-btn" style="text-align: center;cursor: pointer;">
						<div class="mb-2" style="font-size: 50px">
							<i class="fas fa-plus"></i>
						</div>
						<div style="font-size: 25px">일정 추가</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-sm-3"></div>
	</div>

	<!-- Modal -->
	<div id="myModal" class="modal fade" role="dialog">
		<div class="modal-dialog">
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<h4 id="modal-title" class="modal-title" style="font-size: 16px">확인
						사항</h4>
					<button type="button" id="closebtn" class="close" data-dismiss="modal" style="16px">&times;</button>
				</div>
				<div class="modal-body">
					<div id="modal-body-title">
						<input type="text" id="inserttitle"
							style="width: 100%; min-height: 60px; font-size: 22px; font-weight: 800; letter-spacing: 1px"
							placeholder="일정 명을 입력해 주세요(최대 50자)" maxlength="50">
					</div>
					<div id="modal-body-contents">
						<textarea id="insertcontents"
							style="width: 100%; min-height: 150px; font-size: 16px; font-weight: normal; letter-spacing: 1px;
							resize: none;padding-top:3px;padding-bottom:3px;padding-left:3px;padding-right:3px"
							placeholder="일정 내용을 입력해 주세요(최대 300자)" maxlength="300"></textarea>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" id="myModalUse" class="btn btn-dark"
						style="width: 25%;font-size: 16px; disabled="disabled">사용</button>
 					<!--<button type="button" id="myModalUse" class="btn btn-dark"
						style="width: 25%;">사용</button> -->
					<button type="button" id="myModalCancle" class="btn btn-dark"
						style="width: 25%;font-size: 16px;" data-dismiss="modal">취소</button>
				</div>
			</div>
		</div>
	</div>
	<content tag="local_script"> <script
		src="resources/js/project/project_list.js"></script> </content>
</body>
</html>