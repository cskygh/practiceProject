<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Notice</title>
<content tag="local_css">
<style type="text/css">
tr td {
	cursor: pointer;
}
</style>
<link href="resources/css/notice/notice.css" rel="stylesheet" type="text/css">
<link href="resources/css/notice/notice_live_title.css" rel="stylesheet" type="text/css">
</content>
</head>
<body>
		<div class="container-fluid">
			<div class="col">
				<input id="noticePageStartNum" type="hidden" value="${pageStartNum}">
				<input id="noticePageEndNum" type="hidden" value="${pageEndNum}">
				<input id="noticeTotalPageNum" type="hidden" value="${totalPageNum}">
				
				<div class="row" style="margin-top: 10px;">
					<div class="col out">
						<div id="noticeTableDiv" class="in"
							style="width: 70%; margin-top: 10px">
							<input type="text" class="form-control" style="text-align:center;border:none;font-weight:500;font-size:24px" value="공지사항 제목" readonly="readonly">
							<table id="noticeTable"
								class="table table-striped table-bordered">
								<tbody>
									<c:forEach var="notice" items="${selectedNoticeDatas}">
										<tr>
											<td align="center" valign="middle" style="display: none;">${notice.no}</td>
											<td id="noticeTitleTd" align="center" valign="middle"
												style="word-break: break-all;">
												<div id="noticeTitle" class="noticeTitle"
													style="font-size: 20px;">${notice.title}</div>
											</td>
										</tr>
									</c:forEach>
								</tbody>
							</table>
							<div style="float: right;">
							<c:if test="${sessionMemLevel le 5}">
								<button type="button" class="btn btn-primary"onclick="location.href='noticeInsertPage'">공지사항 작성</button>
							</c:if>
							</div>
				<div class="row out" style="margin-top: 80px">
					<div class="in" style="margin-left: auto; margin-right: auto;">
						<c:if test="${totalPageNum gt 1}">
							<ul class="pagination" style="text-align: center;">
								<c:set var="prevButtonActive"
									value="${noticePaging.prevButtonActive}" />
								<c:if test="${prevButtonActive eq true}">
									<li id="noticePrevious" class="page-item"><a
										class="page-link"
										href="pageSelect?page=${pageNum * (range - 1)}&range=${range - 1}">Previous</a>
									</li>
								</c:if>
								<c:forEach var="pageNum" begin="${pageStartNum}"
									end="${pageEndNum}">
									<li class="page-item"><a class="page-link"
										href="pageSelect?page=${pageNum}&range=${range}">${pageNum}</a></li>
								</c:forEach>
								<c:set var="nextButtonActive"
									value="${noticePaging.nextButtonActive}" />
								<c:if test="${nextButtonActive eq true}">
									<li id="noticeNext" class="page-item"><a class="page-link"
										href="pageSelect?page=${pageNum * range + 1}&range=${range + 1}">Next</a>
									</li>
								</c:if>
							</ul>
						</c:if>
					</div>
				</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	<content tag="local_script">
		<script	src="resources/js/notice/notice.js"></script>
		<script	src="resources/js/notice/liveTitle.js"></script>
	</content>
</body>
</html>