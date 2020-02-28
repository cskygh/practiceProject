<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Notice Detail</title>
</head>
<body>
	<form action="noticeDetail" method="get" name="noticeDetail">
		<div class="container-fluid">
			<div class="row">
			<input type="hidden" id="noticeNo" value="${notice.no}">
				<div class="col-sm-3"></div>
				<div class="col-sm-6" style="text-align: center; margin-top: 80px">
					<div class="form-group input-group">
						<input type="text" class="form-control" style="text-align:center;height:45px" readonly="readonly" value="공지사항 제목">
						<input type="text" id="noticeTitle" class="form-control" style="text-align:center;height:45px;width:150px" readonly="readonly" value="${notice.title}">
						<input type="text" id="noticeChangeTitle" class="form-control" style="height:45px;width:150px;text-align:center;display:none;" value="${notice.title}">
					</div>
				</div>
				<div class="col-sm-3"></div>
				
				<div class="col-sm-3"></div>
				<div class="col-sm-6">
					<div class="form-group input-group">
						<input type="text" class="form-control" style="text-align:center;height:250px" readonly="readonly" value="공지사항 내용">
						<input type="text" id="noticeContents" class="form-control" style="text-align:center;height:250px;width:150px" readonly="readonly" value="${notice.contents }">
						<textarea id="noticeChangeContents" class="form-control" placeholder="내용을 입력하세요.(최대 1000자)" maxlength="1000" style="resize: none;width:150px;display: none;">${notice.contents}</textarea>
					</div>
				</div>
				<div class="col-sm-3"></div>
				
				<div class="col-sm-3"></div>
				<div class="col-sm-6" style="text-align:right;">
					<button type="button" class="btn btn-primary" onclick="location.href='noticeDetailReturn'">목록</button>
					<c:if test="${sessionMemLevel le 5}">
						<button type="button" id="noticeChange" class="btn btn-primary">수정</button>
						<button type="button" id="noticeUpdate" class="btn btn-primary" style="display:none;">저장</button>
						<button type="button" id="noticeDelete" class="btn btn-primary">삭제</button>
						<button type="button" id="noticeCancel" class="btn btn-primary" style="display:none">저장 취소</button>
					</c:if>
				</div>
				<div class="col-sm-3"></div>
			</div>		
		</div>	
	</form>
	
<content tag="local_script">
	<script	src="resources/js/notice/notice.js"></script>
	<script	src="resources/js/notice/liveTitle.js"></script>
	<script	src="resources/js/notice/noticetotal.js"></script>
</content>
</body>
</html>