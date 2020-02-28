<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Product Edit</title>

<content tag="local_css">
<style type="text/css">
/* 네비 양쪽 정렬 */
.nav-pills {
	width: 100%;
	display: inline-block;
}

.left-tab {
	float: left;
}

.right-tab {
	float: right;
}
</style>
</content>
</head>
<body>
	<div class="card">
		<div class="card-body">
			<h4 class="card-title">
				상품 수정
			</h4>
			<!-- Nav tabs -->
			<ul class="nav nav-pills">
				<li class="nav-item left-tab"><a class="nav-link active"
					data-toggle="tab" href="#baseInfo">기본 정보</a></li>
				<li class="nav-item left-tab"><a class="nav-link"
					data-toggle="tab" href="#detailInfo">세부 정보</a></li>
				<li class="nav-item right-tab"><button type="button"
				id="back-btn"
						class="btn btn-rounded btn-outline-primary">
						취소<span class="btn-icon-right"><i
							class="fas fa-window-close"></i></span>
					</button></li>
				<li class="nav-item right-tab"><button type="button"
				id="update-btn"
						class="btn btn-rounded btn-outline-primary">
						수정<span class="btn-icon-right"><i class="fas fa-edit"></i></span>
					</button></li>
			</ul>

			<form id="product_edit_form">
				<!-- Tab panes -->
				<div class="tab-content br-n pn">
					<!-- baseInfo -->
					<div class="tab-pane active" id="baseInfo">
						<div class="row col-12">
							<div class="col-md-12 col-lg-6">
								<div class="card">
									<div class="card-body">
										<h4>상품코드</h4>
										<div
											class="form-group align-items-center justify-content-center">
											<select id="code" name="code" class="form-control">
												<c:choose>
													<c:when test="${product.code eq null}">
														<option value="" selected>선택</option>
														<c:forEach var="productList" items="${productList}">
															<option value="${productList.code}">${productList.code} ${productList.name}</option>
														</c:forEach>
													</c:when>
													<c:otherwise>
														<option value="">선택</option>
														<c:forEach var="productList" items="${productList}">
															<option value="${productList.code}"
																<c:if test="${productList.code eq product.code}">selected</c:if>>${productList.code} ${productList.name}</option>
														</c:forEach>
													</c:otherwise>
												</c:choose>
											</select>
										</div>
									</div>
								</div>
							</div>
							<div class="col-md-12 col-lg-6">
								<div class="card">
									<div class="card-body">
										<h4>상품명</h4>
										<div class="form-row align-items-center">
											<input type="text" id="name" name="name" class="form-control">
										</div>
									</div>
								</div>
							</div>
							<div class="col-md-12 col-lg-6">
								<div class="card">
									<div class="card-body">
										<h4>단위</h4>
										<div class="form-row align-items-center">
											<input type="text" id="capacity" name="capacity"
												class="form-control">
										</div>
									</div>
								</div>
							</div>
							<div class="col-md-12 col-lg-6">
								<div class="card">
									<div class="card-body">
										<h4>단가</h4>
										<div class="form-row align-items-center">
											<input type="text" id="buyPrice" name="buyPrice"
												class="form-control">
										</div>
									</div>
								</div>
							</div>
							<div class="col-12">
								<div class="card">
									<div class="card-body">
										<h4>상품 설명</h4>
										<div class="form-row align-items-center">
											<input type="text" id="explanation" name="explanation"
												class="form-control">
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- detailInfo -->
					<div class="tab-pane fade" id="detailInfo">
						<div class="col-12">
							<div class="card">
								<div class="card-body">
									<h4>재고</h4>
									<table
										class="table header-border table-hover verticle-middle text-center">
										<thead>
											<tr>
												<th scope="col">전년말 재고</th>
												<th scope="col">전월말 재고</th>
												<th scope="col">전일 재고</th>
												<th scope="col">현재 재고</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>
													<div class="form-row align-items-center">
														<input type="text" id="preYyStock" name="preYyStock"
															class="form-control">
													</div>
												</td>
												<td>
													<div class="form-row align-items-center">
														<input type="text" id="preMmStock" name="preMmStock"
															class="form-control">
													</div>
												</td>
												<td>
													<div class="form-row align-items-center">
														<input type="text" id="preDdStock" name="preDdStock"
															class="form-control">
													</div>
												</td>
												<td>
													<div class="form-row align-items-center">
														<input type="text" id="stock" name="stock" class="form-control">
													</div>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
							<div class="card">
								<div class="card-body">
									<h4>매입 / 매출</h4>
									<table
										class="table header-border table-hover verticle-middle text-center">
										<thead>
											<tr>
												<th scope="col"></th>
												<c:forEach var="i" begin="1" end="12">
													<th scope="col">${i}월</th>
												</c:forEach>
											</tr>
										</thead>
										<tbody>
											<tr>
												<th scope="col">매입</th>
												<c:forEach var="i" begin="1" end="12">
													<c:set var="tempBuy">buy${i}</c:set>
													<td scope="col"><div
															class="form-row align-items-center">
															<input type="text" id="${tempBuy}" name="${tempBuy}"
																class="form-control">
														</div></td>
												</c:forEach>
											</tr>
											<tr>
												<th scope="col">매출</th>
												<c:forEach var="i" begin="1" end="12">
													<c:set var="tempSale">sale${i}</c:set>
													<td scope="col"><div
															class="form-row align-items-center">
															<input type="text" id="${tempSale}" name="${tempSale}"
																class="form-control">
														</div></td>
												</c:forEach>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>

	<content tag="local_script"> <script
		src="resources/js/product/product_edit.js"></script> </content>
</body>
</html>