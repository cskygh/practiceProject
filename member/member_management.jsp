<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Member Management</title>
</head>
<body>
	<div class="card">
		<div class="card-body">
			<h4 class="card-title">회원 목록</h4>
			<div class="table-responsive">
				<table id="memberList"
					class="table table-striped table-bordered zero-configuration text-center">
					<thead>
						<tr>
							<th>EMAIL</th>
							<th>NAME</th>
							<th>EMAIL 인증</th>
							<th>MEM LEV</th>
							<th>기능</th>
						</tr>
					</thead>
					<tbody>
						<c:forEach var="memberList" items="${memberList}">
							<tr>
								<td>${memberList.email}</td>
								<td>${memberList.name}</td>
								<td id="emailCheck">${memberList.emailCheck}</td>
								<td id="memLevel">${memberList.memLevel}</td>
								<td><i id="delete-btn"
									class="fa fa-close" data-toggle="tooltip" data-placement="top"
									title="" data-original-title="Delete"></i></td>
							</tr>
						</c:forEach>
					</tbody>
					<tfoot>
						<tr>
							<th>EMAIL</th>
							<th>NAME</th>
							<th>EMAIL 인증</th>
							<th>MEM LEV</th>
							<th>기능</th>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	</div>

	<content tag="local_script"> <!-- data table 사용 --> <script
		src="resources/plugins/tables/js/jquery.dataTables.min.js"></script> <script
		src="resources/plugins/tables/js/datatable/dataTables.bootstrap4.min.js"></script>
	<script
		src="resources/plugins/tables/js/datatable-init/datatable-basic.min.js"></script>
	<!-- /data table 사용 --> <script type="text/javascript">
		$(document).ready(function() {
// 			$("input:text").css({"background-color": "transparent",
// 				"border": "none",
// 				"text-align" : "center"});
			$("tr #emailCheck").on('click', function() {
				var td = $(this).closest('tr').children();
				var update = confirm("Email 인증여부를 수정하시겠습니까?");
				if (update) {
					var email = td.eq(0).text();
					var emailCheck = td.eq(2).text();
					$.ajax({
						type : 'POST',
						data : {
							email,
							emailCheck
						},
						datatype : 'json',
						url : 'emailDoneChange',
						success : function(result) {
							if(result == 'y'){
								alert("수정 성공");
								location.reload();
							} else {
								alert("수정 실패");
								location.reload();
							}
						},
						error : function(xhr, status, error) {
						}
					});
				} else {
					return;
				}
			});
			$("tr #memLevel").on('click', function() {
				var td = $(this).closest('tr').children();
				var email = td.eq(0).text();
				var memLevel = td.eq(3).text();
				var editMemLevel = prompt("현재 레벨 : " + memLevel +  "\n" + "수정할 레벨을 입력해 주세요");
				if(editMemLevel > 0 && editMemLevel < 10){
					$.ajax({
						type : 'POST',
						data : {
							email,
							memLevel : editMemLevel
						},
						datatype : 'json',
						url : 'memberLevelEdit',
						success : function(result) {
							if(result == 'y'){
								alert("수정 성공");
								location.reload();
							} else {
								alert("수정 실패");
								location.reload();
							}
						},
						error : function(xhr, status, error) {
						}
					});
				} else {
					alert("올바른 레벨(1~9)을 입력해 주세요");
					return;
				}
			});
			$("td #delete-btn").on("click", function() {
				var td = $(this).closest('tr').children();
				var deleteBtn = confirm("계정을 삭제하시겠습니까?");
				if(deleteBtn){
					var email = td.eq(0).text();
					$.ajax({
						type : 'POST',
						data : {
							email
						},
						datatype : 'json',
						url : 'emailMemberDelete',
						success : function(result) {
							if(result == 'y'){
								alert("삭제 성공");
								location.reload();
							} else {
								alert("삭제 실패");
								location.reload();
							}
						},
						error : function(xhr, status, error) {
						}
					});
				}
			});
		});
		document.addEventListener('DOMContentLoaded', function() { // 그린 후 수정을 해야 정상적으로 변경이 되어서 ready가 아닌 addenvent로 사용
			$('#memberList').dataTable({
				columnDefs : [ {
					width : "20%",
					targets : [ '_all' ]
				}, {
					orderable : false,
					targets : [ 4 ]
				} // 자동정렬하지 못하게(상단)
				],
				lengthMenu : [ [ 5, 10, 25, -1 ], [ 5, 10, 25, 'all' ] ], // show entries 메뉴 설정(앞 [] 보여줄 개수, 뒤 [] 표시할 문자)
				pageLength : 5, // 기본 보여줄 row 개수 설정, 메뉴와 일치할 경우 메뉴가 자동으로 세팅된다.
				language : {
					info : '총  _TOTAL_ 개의 행 중 _START_ 행 부터 _END_ 행 까지',
					infoEmpty : '데이터가 없습니다.',
					emptyTable : '데이터가 없습니다.',
					thousands : ',',
					lengthMenu : '총 _MENU_ 행씩 보기',
					loadingRecords : '열심히 불러오는 중',
					processing : '열심히 동작 중',
					zeroRecords : '검색 결과 없음',
					paginate : {
						first : '처음',
						last : '끝',
						next : '다음',
						previous : '이전'
					},
					search : '검색 ->'
				}
			});
		});
	</script> </content>
</body>
</html>