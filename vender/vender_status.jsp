<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Vender Status</title>
<content tag="local_css"> <!-- data table 사용 -->
<link
	href="resources/plugins/tables/css/datatable/dataTables.bootstrap4.min.css"
	rel="stylesheet">
<!-- /data table 사용 -->
<style type="text/css">
.venderStatus {
	table-layout: fixed /* 	테이블을 고정시켜야 td에서 문자열 초과시 ...으로 숨길 수 있다. */
}

.venderStatus thead th, .venderStatus tfoot th {
	font-size: 13px
}

/* 홀수 tr에 적용 */
.venderStatus tbody tr.even:hover {
	background-color: #e6e6ff;
}

/* 짝수 tr에 적용 */
.venderStatus tbody tr.odd:hover {
	background-color: #e0e0ff;
}

.venderStatus tbody td, .venderStatus tbody td div {
	font-size: 10px;
	/* 	부모 태그에서 크기가 고정되어 있어야 사용이 가능하다. */
	/* 	글자가 지정한 크기를 초과하는 경우 숨김처리 방법 */
	text-overflow: ellipsis;
	/* 	글자가 넘어갈 경우 생략부호를 표시함(...) */
	/* 	만약 적용이 되지 않는다면 display 속성이 block 또는 inline-block에서만 동작하니 설정 필요 */
	overflow: hidden;
	/* 	글자가 넘어가는 것은 숨김 처리 */
	white-space: nowrap;
	font-size: 10px;
	/* 	공백 문자가 있는 경우 자동 줄바꿈을 하지 않고 한줄로 표시하게 함 */
}
</style>
</content>

</head>
<body>
	<div class="card">
		<div class="card-body">
			<h4 class="card-title">거래처 현황</h4>
			<div class="table-responsive">
				<table id="venderStatus"
					class="table table-bordered text-center venderStatus">
					<thead>
						<tr>
							<th>거래처코드</th>
							<th>거래처명</th>
							<th>구분</th>
							<c:forEach var="i" begin="1" end="12">
								<th>${i}월</th>
							</c:forEach>
						</tr>
					</thead>
					<tbody>
						<c:forEach var="venderList" items="${venderList}">
						<tr>
							<td>${venderList.code}</td>
							<td>${venderList.name}</td>
							<td><div>매입</div>
								<div>매출</div></td>
							<c:forEach var="i" begin="1" end="12">
								<td></td>
							</c:forEach>
						</tr>
						</c:forEach>
					</tbody>
					<tfoot>
						<tr>
							<th>상품코드</th>
							<th>상품명</th>
							<th>구분</th>
							<c:forEach var="i" begin="1" end="12">
								<th>${i}월</th>
							</c:forEach>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	</div>

	<!-- Modal -->
	<div class="modal fade" id="myModal" role="dialog" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog">
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">확인 사항</h4>
					<button type="button" class="close" data-dismiss="modal">&times;</button>
				</div>
				<div class="modal-body">
					<p>Some text in the modal.</p>
				</div>
				<div class="modal-footer">
					<button type="button" id="myModalUse"
						class="btn btn-secondary btn-md" data-dismiss="modal">사용</button>
					<button type="button" id="myModalCancle"
						class="btn btn-secondary btn-md" data-dismiss="modal"
						style="margin-left: 3px;">취소</button>
				</div>
			</div>
		</div>
	</div>
	<!-- /Modal -->

	<content tag="local_script"> <script
		src="resources/js/vender/vender_status.js">
		
	</script> 
	<!-- data table 사용 --> 
	<script
		src="resources/plugins/tables/js/jquery.dataTables.min.js"></script> <script
		src="resources/plugins/tables/js/datatable/dataTables.bootstrap4.min.js"></script>
	<script
		src="resources/plugins/tables/js/datatable-init/datatable-basic.min.js"></script>
	<!-- /data table 사용 --> 
	</content>
</body>
</html>