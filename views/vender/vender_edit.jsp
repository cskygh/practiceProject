<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Vender Edit</title>

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
			<h4 class="card-title">거래처 수정</h4>
			<!-- Nav tabs -->
			<ul class="nav nav-pills">
				<li class="nav-item left-tab"><a class="nav-link active"
					data-toggle="tab" href="#baseInfo">기본 정보</a></li>
				<li class="nav-item left-tab"><a class="nav-link"
					data-toggle="tab" href="#detailInfo">세부 정보</a></li>
				<li class="nav-item right-tab"><button type="button" id="back-btn"
						class="btn btn-rounded btn-outline-primary">
						취소<span class="btn-icon-right"><i
							class="fas fa-window-close"></i></span>
					</button></li>
				<li class="nav-item right-tab"><button type="button" id="update-btn"
						class="btn btn-rounded btn-outline-primary">
						수정<span class="btn-icon-right"><i class="fas fa-edit"></i></span>
					</button></li>
			</ul>

			<form id="vender_edit_form">
			<!-- Tab panes -->
			<div class="tab-content br-n pn">
				<!-- baseInfo -->
				<div class="tab-pane active" id="baseInfo">
					<div class="row col-12">
						<div class="col-md-12 col-lg-6">
							<div class="card">
								<div class="card-body">
									<h4>거래처코드</h4>
									<div
										class="form-group align-items-center justify-content-center">
										<select id="code" name="code" class="form-control">
											<c:choose>
												<c:when test="${vender.code eq null}">
													<option value="" selected>선택</option>
													<c:forEach var="venderList" items="${venderList}">
														<option value="${venderList.code}">${venderList.code}
															${venderList.name}</option>
													</c:forEach>
												</c:when>
												<c:otherwise>
													<option value="">선택</option>
													<c:forEach var="venderList" items="${venderList}">
														<option value="${venderList.code}"
															<c:if test="${venderList.code eq vender.code}">selected</c:if>>${venderList.code}
															${venderList.name}</option>
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
									<h4>거래처명</h4>
									<div class="form-row align-items-center">
										<input type="text" id="name" name="name" class="form-control">
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-12 col-lg-6">
							<div class="card">
								<div class="card-body">
									<h4>사업자번호</h4>
									<div class="form-row align-items-center">
										<input type="text" id="bizNo" name="bizNo" class="form-control" maxlength="10">
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-12 col-lg-6">
							<div class="card">
								<div class="card-body">
									<h4>대표자</h4>
									<div class="form-row align-items-center">
										<input type="text" id="ceoName" name="ceoName" class="form-control">
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-12 col-lg-6">
							<div class="card">
								<div class="card-body">
									<h4>업태</h4>
									<div class="form-row align-items-center">
										<input type="text" id="bizCondition" name="bizCondition" class="form-control">
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-12 col-lg-6">
							<div class="card">
								<div class="card-body">
									<h4>업종</h4>
									<div class="form-row align-items-center">
										<input type="text" id="bizType" name="bizType" class="form-control">
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- detailInfo -->
				<div class="tab-pane fade" id="detailInfo">
					<div class="row col-12">
						<div class="col-md-12 col-lg-6">
							<div class="card">
								<div class="card-body">
									<h4>사무실 전화번호</h4>
									<div class="form-row align-items-center">
										<input type="text" id="officeNo" name="officeNo" class="form-control" maxlength="20">
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-12 col-lg-6">
							<div class="card">
								<div class="card-body">
									<h4>담당자 전화번호</h4>
									<div class="form-row align-items-center">
										<div class="col-3 pr-0">
											<input type="text" id="managerName" name="managerName" class="form-control">
										</div>
										<div class="col-9 pl-0">
											<input type="text" id="managerNo" name="managerNo" class="form-control" maxlength="20">
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-12">
							<div class="card">
								<div class="card-body">
									<div class="row col-md-12 col-lg-6 align-items-center mb-1">
										<div class="col-2">
											<h4 class="mb-0">주소</h4>
										</div>
										<div class="col-4 offset-2">
											<input type="text" id="zipCode" name="zipCode" class="form-control" maxlength="6">
										</div>
										<div class="col-4">
											<button type="button" id="findZipCode"
												class="btn btn-rounded btn-outline-primary" disabled="disabled">
												우편번호 검색 <span class="btn-icon-right"><i
													class="fas fa-road"></i></span>
											</button>
										</div>
									</div>
									<div class="row">
										<div class="col-md-12 col-lg-6">
											<div class="form-row align-items-center">
												<input type="text" id="addr" name="addr" class="form-control" readonly="readonly">
											</div>
										</div>
										<div class="col-md-12 col-lg-6">
											<div class="form-row align-items-center">
												<input type="text" id="detailAddr" name="detailAddr" class="form-control">
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			</form>
		</div>
	</div>
	<content tag="local_script"> <script
		src="resources/js/vender/vender_edit.js"></script>
		<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
		</content>
</body>
</html>