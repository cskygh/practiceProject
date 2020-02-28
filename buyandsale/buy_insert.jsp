<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Buy Insert</title>
<content tag="local_css"> <!-- data table 사용 -->
<link href="resources/plugins/tables/css/datatable/dataTables.bootstrap4.min.css" rel="stylesheet">
<!-- /data table 사용 -->
<link href="resources/css/toastr.css" rel="stylesheet">
<style type="text/css">
input[readonly] {
	text-align: center;
}

.top {
	width: 100%;
	display: inline-block;
}

.top-left {
	float: left;
}

.top-right {
	float: right;
}
</style>
</content>
</head>
<body>
	<form id="buyInsertForm">
		<div class="card">
			<div class="card-body">
				<div class="top">
					<h4 id="title" class="card-title top-left mb-0">매입 등록</h4>
					<button type="button" id="cancle-btn"
						class="btn btn-rounded btn-outline-primary top-right">
						취소<span class="btn-icon-right"><i class="fas fa-redo"></i></span>
					</button>
					<button type="button" id="insert-btn"
						class="btn btn-rounded btn-outline-primary top-right">
						등록<span class="btn-icon-right"><i class="fas fa-pencil-alt"></i></span>
					</button>
				</div>
				<table
					class="table header-border table-hover verticle-middle text-center">
					<thead>
						<tr>
							<!-- 크기 조절용 head -->
							<th scope="col" style="width: 25%"></th>
							<th scope="col" style="width: 25%"></th>
							<th scope="col" style="width: 25%"></th>
							<th scope="col" style="width: 25%"></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td colspan="2" id="venderBuyNum">
								<div class="form-group input-group" data-toggle="tooltip"
									data-placement="top" title="거래처 선택시 자동 입력됩니다.">
									<input type="text" id="buyNumLabel" class="form-control" readonly="readonly" value="매입번호">
									<input type="text" id="yyyy" name="yyyy" class="form-control" readonly="readonly">
									<input type="text" id="mm" name="mm" class="form-control" readonly="readonly">
									<input type="text" id="dd" name="dd" class="form-control" readonly="readonly">
									<input type="text" id="no" name="no" class="form-control" readonly="readonly">
									<input type="text" id="hang" name="hang" class="form-control" readonly="readonly">
								</div>
							</td>
							<td>
								<div class="form-group input-group align-items-center justify-content-center">
									<input type="text" class="form-control" readonly="readonly" value="거래처">
									<select id="vendCode" name="vendCode" class="form-control">
										<option value="" selected>선택</option>
										<c:forEach var="venderList" items="${venderList}">
											<option value="${venderList.code}">${venderList.name}</option>
										</c:forEach>
									</select>
								</div>
							</td>
							<td>
								<div
									class="form-group input-group align-items-center justify-content-center">
									<input type="text" class="form-control" readonly="readonly"
										value="상품"><select id="proCode" name="proCode"
										class="form-control">
										<option value="" selected>선택</option>
										<c:forEach var="productList" items="${productList}">
											<option value="${productList.code}">${productList.name}</option>
										</c:forEach>
									</select>
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<div
									class="form-group input-group align-items-center justify-content-center">
									<input type="text" class="form-control" readonly="readonly"
										value="규격"> <input type="text" id="capacity"
										class="form-control">
								</div>
							</td>
							<td>
								<div
									class="form-group input-group align-items-center justify-content-center">
									<input type="text" class="form-control" readonly="readonly"
										value="단가"> <input type="text" id="price" name="price"
										class="form-control">
								</div>
							</td>
							<td>
								<div
									class="form-group input-group align-items-center justify-content-center">
									<input type="text" class="form-control" readonly="readonly"
										value="현재재고"> <input type="text" id="stock"
										class="form-control" readonly="readonly">
								</div>
							</td>
							<td>
								<div
									class="form-group input-group align-items-center justify-content-center"
									data-toggle="tooltip" data-placement="top"
									title="입력시 금액, 세액이 입력됩니다.">
									<input type="text" class="form-control" readonly="readonly"
										value="매입수량"> <input type="text" id="qty" name="qty"
										class="form-control">
								</div>
							</td>
						</tr>
						<tr>
							<td colspan="2">
								<div class="form-group input-group">
									<input type="text" class="form-control col-4"
										readonly="readonly" value="메모"> <input type="text"
										id="memo" name="memo" class="form-control col-8">
								</div>
							</td>
							<td colspan="1">
								<div class="form-group input-group">
									<input type="text" class="form-control col-4"
										readonly="readonly" value="금액"> <input type="text"
										id="total" name="total" class="form-control col-8">
								</div>
							</td>
							<td colspan="1">
								<div class="form-group input-group" data-toggle="tooltip"
									data-placement="top" title="1원 미만 단위는 절사됩니다.">
									<input type="text" class="form-control col-4"
										readonly="readonly" value="세액"> <input type="text"
										id="tax" name="tax" class="form-control col-8">
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</form>
	<div id="listCard" class="card">
		<div class="card-body">
			<h4 class="card-title">매입 목록</h4>
			<div class="table-responsive">
				<table id="buyInsertList"
					class="table table-striped table-bordered zero-configuration text-center">
					<thead>
						<tr>
							<th>seq</th>
							<th>거래처</th>
							<th>품명</th>
							<th>단가</th>
							<th>수량</th>
							<th>금액</th>
							<th>매입일자</th>
						</tr>
					</thead>
					<tbody>
						<c:forEach var="buyList" items="${buyList}">
							<tr>
								<td>${buyList.seq}</td>
								<td>${buyList.v_name}</td>
								<td>${buyList.p_name}</td>
								<td>${buyList.price}</td>
								<td>${buyList.qty}</td>
								<td>${buyList.total}</td>
								<td>${buyList.date}</td>
							</tr>
						</c:forEach>
					</tbody>
					<tfoot>
					</tfoot>
				</table>
			</div>
		</div>
	</div>

	<content tag="local_script">
		<script	src="resources/js/buyandsale/buy_insert.js"></script>
		<script src="resources/js/toastr.min.js"></script>
		<!-- data table 사용 -->
		<script	src="resources/plugins/tables/js/jquery.dataTables.min.js"></script>
		<script	src="resources/plugins/tables/js/datatable/dataTables.bootstrap4.min.js"></script>
		<script	src="resources/plugins/tables/js/datatable-init/datatable-basic.min.js"></script>
	<!-- /data table 사용 --> </content>
</body>
</html>