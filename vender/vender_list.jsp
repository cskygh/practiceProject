<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
<title>Vender Insert</title>
</head>
<content tag="local_css"> <!-- data table 사용 -->
<link
	href="resources/plugins/tables/css/datatable/dataTables.bootstrap4.min.css"
	rel="stylesheet">
<!-- /data table 사용 --> </content>
<body>
	<div class="card">
		<div class="card-body">
			<h4 class="card-title">거래처 등록</h4>
			<div class="table-responsive">
				<table
					class="table header-border table-hover verticle-middle text-center">
					<thead>
						<tr>
							<th scope="col">거래처코드</th>
							<th scope="col">거래처명</th>
							<th scope="col">사업자번호</th>
							<th scope="col">대표자</th>
							<th scope="col">기능</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<div class="form-row align-items-center justify-content-center">
									<div class="col-auto mr-3">
										<input type="text" id="code" class="form-control"
											maxlength="6" onkeyup="codeLength(this)">
									</div>
									<div class="col-auto form-check">
										<label class="form-check-label"> <input
											type="checkbox" id="randomCode" class="form-check-input">자동코드
										</label>
									</div>
								</div>
							</td>
							<td>
								<div class="form-row align-items-center">
									<input type="text" id="name" class="form-control">
								</div>
							</td>
							<td>
								<div class="form-row align-items-center">
									<input type="text" id="bizNo" class="form-control"
										maxlength="10">
								</div>
							</td>
							<td>
								<div class="form-row align-items-center">
									<input type="text" id="ceoName" class="form-control">
								</div>
							</td>
							<td><i id="vender-add" class="fas fa-plus font-medium mr-2"
								data-toggle="tooltip" data-placement="top" title="추가"></i> <i id="vender-reset"
								class="far fa-trash-alt font-medium" data-toggle="tooltip"
								data-placement="top" title="초기화"></i></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<div class="card">
		<div class="card-body">
			<h4 class="card-title">거래처 목록</h4>
			<div class="table-responsive">
				<table id="venderList"
					class="table table-striped table-bordered zero-configuration text-center">
					<thead>
						<tr>
							<th>거래처코드</th>
							<th>거래처명</th>
							<th>사업자번호</th>
							<th>대표자</th>
							<th>기능</th>
						</tr>
					</thead>
					<tbody>
						<c:forEach var="venderList" items="${venderList}">
							<tr>
								<td>${venderList.code}</td>
								<td>${venderList.name}</td>
								<td>${venderList.bizNo}</td>
								<td>${venderList.ceoName}</td>
								<td><i id="edit-btn" class="fa fa-edit m-r-5" data-toggle="tooltip"
								data-placement="top" title="" data-original-title="Edit"></i> <i
								id="delete-btn" class="fa fa-close" data-toggle="tooltip" data-placement="top"
								title="" data-original-title="Delete"></i></td>
							</tr>
						</c:forEach>
					</tbody>
					<tfoot>
						<tr>
							<th>거래처코드</th>
							<th>거래처명</th>
							<th>사업자번호</th>
							<th>대표자</th>
							<th>기능</th>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	</div>

	<!-- Modal -->
	<div class="modal fade" id="myModal" role="dialog">
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
		src="resources/js/vender/vender_list.js">
		
	</script> 
	<!-- data table 사용 --> <script
		src="resources/plugins/tables/js/jquery.dataTables.min.js"></script> <script
		src="resources/plugins/tables/js/datatable/dataTables.bootstrap4.min.js"></script>
	<script
		src="resources/plugins/tables/js/datatable-init/datatable-basic.min.js"></script>
	<!-- /data table 사용 --> </content>

</body>
</html>