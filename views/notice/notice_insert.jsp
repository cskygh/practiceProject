<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Notice Insert</title>
</head>
<body>
	<div class="row" style="width: 100%">
		<input type="hidden" id="noticeNo" value="1">
		<div class="col-sm-12" style="text-align:center;margin-bottom: 20px">
			<H1>공지사항 등록</H1>
		</div>
		
		<div class="col-sm-3"></div>
		<div class="col-sm-6">
			<div class="form-group input-group">
				<input type="text" class="form-control" style="text-align:center" readonly="readonly" value="공지사항 제목">
				<input type="text" id="noticeTitle" class="form-control" style="width: 200px" placeholder="제목을 입력해주세요.(300자 이내)">
			</div>
		</div>
		<div class="col-sm-3"></div>
		
		<div class="col-sm-3"></div>
		<div class="col-sm-6">
			<div class="form-group input-group">
				<input type="text" class="form-control" style="text-align:center;height:250px" readonly="readonly" value="공지사항 내용">
				<textarea id="noticeContents" class="form-control" placeholder="내용을 입력하세요.(최대 1000자)" maxlength="1000" style="resize: none;width:200px;height:250px;"></textarea>
			</div>
		</div>
		<div class="col-sm-3"></div>
		
		<div class="col-sm-3"></div>
		<div class="col-sm-6" style="text-align:right;">
			<button type="button" id="noticeInsert" class="btn btn-primary">공지사항 저장</button>
			<button type="button" id="noticeCancel" class="btn btn-primary">작성 취소</button>
		</div>
		<div class="col-sm-3"></div>
	</div>


<content tag="local_script">
	<script src="resources/js/notice/noticetotal.js"></script>
</content>
</body>
</html>