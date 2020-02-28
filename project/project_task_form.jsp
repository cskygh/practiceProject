<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Project Task Form</title>
<content tag="local_css">
<link href="resources/fullcalendar-4.3.1/core/main.css" rel="stylesheet">
<link href="resources/fullcalendar-4.3.1/daygrid/main.css"
	rel="stylesheet">
<link href="resources/fullcalendar-4.3.1/timegrid/main.css"
	rel="stylesheet">
<link href="resources/fullcalendar-4.3.1/list/main.css" rel="stylesheet">
<link rel="stylesheet"
	href="resources/css/datepicker/bootstrap-datepicker3.min.css" />
<!-- 꾸밈 -->
<link rel="stylesheet"
	href="resources/css/datepicker/bootstrap-datepicker3.standalone.min.css" />
<link rel="stylesheet" href="resources/css/project/menu.css">
<style>
html, body {
	overflow: auto; /* don't do scrollbars */
	font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
	font-size: 14px;
}
.fc-list-item{
	cursor: pointer;  /* projectTaskListMonthForm list cursor */
}
.fc-title{
	color : white; /* projectTaskForm title color */
}
/* ttablebody overflow start*/
.ttabletbody {
	width: 100%;
}
.ttabletbody tbody, .ttabletbody tbody tr{
	max-width: 100px;
	overflow: hidden;
	
}
.ttabletbody tbody tr td{
	max-width: 100px;
	overflow: hidden;
	text-overflow: inherit;
}
/* ttablebody overflow end */

#calendar-container {
	height: 65%;
	width: 100%;
}

.fc-header-toolbar {
	/*
    the calendar will be butting up against the edges,
    but let's scoot in the header's buttons
    */
	padding-top: 1em;
	padding-left: 1em;
	padding-right: 1em;
}
.nav-pills {
	width: 100%;
	display: inline-block;
}
.left-tab{
	float: left;
}
.right-tab{
	float: right;
}
</style>
</content>
</head>
<body>
	<input type="hidden" id="proSeq" name="proSeq" value="${sessionProSeq}">
	<input type="hidden" id="email"	value="${sessionEmail}">
	<input type="hidden" id="seq">
	<div class="card">
		<div class="card-body">
			<!-- <h1 class="card-title" style="text-align:center;padding-right: 70px;font-weight: 600">일정 </h1> -->
			<!-- Nav tabs -->
			<ul class="nav nav-pills">
				<li class="nav-item left-tab">
					<a class="nav-link active" data-toggle="tab" href="#projectTaskForm">일정(월별)</a>
				</li>
				<li class="nav-item left-tab">
					<a class="nav-link"	data-toggle="tab" href="#projectTaskListMonthForm">일정(리스트)</a>
				</li>
				<li class="nav-item left-tab">
					<a class="nav-link" data-toggle="tab" href="#projectTaskInsertForm">세부일정 작성</a>
				</li>
				<li class="nav-item right-tab"><button type="button" id="projectDeleteBtn"
						class="btn btn-rounded btn-outline-primary">
						일정 삭제<span class="btn-icon-right"><i class="far fa-trash-alt"></i></span>
					</button></li>
			</ul>
			<!-- Tab panes -->
			<div class="tab-content br-n pn">
				<!-- projectTaskForm -->
				<div class="tab-pane active" id="projectTaskForm">
					<div class="col-12">
						<div class="card">
							<div class="card-body">
								<div id="calendar-container">
									<div id="fullcalendar"></div>
								</div>
							</div>
						</div>
					</div>
					<!-- Modal -->
				   	<div class="modal fade" id="myModal" role="dialog">
				      <div class="modal-dialog">
				         <!-- Modal content-->
				         <div class="modal-content">
				            <div class="modal-header">
				               <h4 id="modal-title" class="modal-title">세부일정 변경</h4>
				               <button type="button" class="close" data-dismiss="modal">&times;</button>
				            </div>
				            <div id="modal-body" class="modal-body">
				            	<div class="row" style="width:100%;margin:5px">
				            		<div class="col-sm-12" style="text-align:center">
										<div class="form-group input-group">
											<input type="text" class="form-control" readonly="readonly" value="제목" style="text-align:center;width:35px">
											<input type="text" id="title" class="form-control" placeholder="제목을 입력하세요.(최대 300자)" maxlength="300" style="width:250px">
							           	</div>
						     		</div>
						      		<div class="col-sm-12" style="text-align:center">
						          	 	<div class="form-group input-group">
						          			<input type="text" class="form-control" readonly="readonly" value="내용" style="text-align:center;height: auto;width:35px">
						          			<textarea id="contents" class="form-control" placeholder="내용을 입력하세요.(최대 1000자)" maxlength="1000" style="resize: none;width:250px"></textarea>
						          		</div>
						          	</div>
						     		<div class="col-sm-12" style="text-align:center">
						           		<div class="form-group input-group">
						          			<input type="text" class="form-control" value="시작일" readonly="readonly" style="text-align:center">
						          			<input type="text" id="start" class="form-control" style="margin-right:10px">
						          			<input type="text" class="form-control" value="종료일" readonly="readonly" style="margin-left:10px;text-align:center" >
						          			<input type="text" id="end" class="form-control">
						          		</div>
						          	</div>
					            	<div class="col-sm-12" style="text-align:right">
					            		<button type="button" id="myModalUse" class="btn btn-primary">수정</button>
					            		<button type="button" id="myModalCancle" class="btn btn-primary" data-dismiss="modal">취소</button>
					            	</div>
				            	</div>
				            </div>
				         </div>
				      </div>
				     </div>
				   <!-- /Modal -->
				</div>

				<!-- projectTaskListMonthForm -->
				<div class="tab-pane fade" id="projectTaskListMonthForm">
					<div class="col-12">
						<div class="card">
							<div class="card-body">
								<div id="calendar-container">
									<div id="calendar"></div>
								</div>
							</div>
						</div>
					</div>
					<!-- Modal -->
				   	<div class="modal fade" id="calendarModal" role="dialog">
				      <div class="modal-dialog">
				         <!-- Modal content-->
				         <div class="modal-content">
				            <div class="modal-header">
				               <h4 id="calendar-title" class="modal-title">세부일정 변경</h4>
				               <button type="button" class="close" data-dismiss="modal">&times;</button>
				            </div>
				            <div id="calendar-body" class="modal-body">
				            	<div class="row" style="width:100%;margin:5px">
				            		<div class="col-sm-12" style="text-align:center">
										<div class="form-group input-group">
											<input type="text" class="form-control" readonly="readonly" value="제목" style="text-align:center;width:35px">
											<input type="text" id="calendartitle" class="form-control" placeholder="제목을 입력하세요.(최대 300자)" maxlength="300" style="width:250px">
							           	</div>
						     		</div>
						      		<div class="col-sm-12" style="text-align:center">
						          	 	<div class="form-group input-group">
						          			<input type="text" class="form-control" readonly="readonly" value="내용" style="text-align:center;height: auto;width:35px">
						          			<textarea id="calendarcontents" class="form-control" placeholder="내용을 입력하세요.(최대 1000자)" maxlength="1000" style="resize: none;width:250px"></textarea>
						          		</div>
						          	</div>
						     		<div class="col-sm-12" style="text-align:center">
						           		<div class="form-group input-group">
						          			<input type="text" class="form-control" value="시작일" readonly="readonly" style="text-align:center">
						          			<input type="text" id="calendarstart" class="form-control" style="margin-right:10px">
						          			<input type="text" class="form-control" value="종료일" readonly="readonly" style="margin-left:10px;text-align:center" >
						          			<input type="text" id="calendarend" class="form-control">
						          		</div>
						          	</div>
					            	<div class="col-sm-12" style="text-align:right">
					            		<button type="button" id="calendarUse" class="btn btn-primary">수정</button>
					            		<button type="button" id="calendarCancle" class="btn btn-primary" data-dismiss="modal">취소</button>
					            	</div>
				            	</div>
				            </div>
				         </div>
				      </div>
				     </div>
				   <!-- /Modal -->
				</div>
				
				<!-- projectTaskInsertForm -->
				<div class="tab-pane" id="projectTaskInsertForm">
					<div class="col-12">
						<div class="card">
							<div class="card-body">
								<div class="row">
									<div class="col-sm-5">
										<div class="col-sm-12" style="margin-top:15px;text-align:center">
											<label><H4>일정 작성</H4></label>
										</div>
										
										<div class="col-sm-12" style="margin-top: 15px;height: 50px">
											<div class="form-group input-group">
												<input type="text" class="form-control" value="제목" readonly="readonly" style="text-align:center;height:45px;font-size:14px">
												<input type="text" class="form-control" id="inserttitle" name="inserttitle" placeholder="제목을 입력하세요.(최대 300자)"
													style="width: 60%;height:45px;padding:10px;font-size:14px" maxlength="300">
											</div>
										</div>
								
										<div class="col-sm-12" style="margin-top:15px;vertical-align: text-top;">
											<div class="form-gorup input-group">
												<input type="text" class="form-control" value="내용" readonly="readonly" style="text-align:center;height: 80px">
												<textarea class="form-control" id="insertcontents" name="insertcontents" placeholder="내용을 입력하세요.(최대 1000자)" style="width: 60%;height:80px;resize: none;"maxlength="1000"></textarea>
											</div>
										</div>
								
										<div class="col-sm-12" style="margin-top: 25px">
											<div class="form-group input-group">
												<button type="button" class="form-control" style="height:35px" disabled="disabled"><i class="fas fa-history"></i>&nbsp;상태</button>
												<select id="priority" name="priority" class="form-control" style="height:35px;text-align:center">
													<option selected value=""> 선택 </option>
													<option value="0">요청</option>
													<option value="1">진행</option>
													<option value="2">피드백</option>
													<option value="3">완료</option>
													<option value="4">보류</option>
												</select>
												<button type="button" class="form-control" disabled="disabled" style="height:35px;margin-left:20px"><i class="far fa-calendar-plus"></i>&nbsp;시작일</button>
												<input type="text" id="insertstart" class="form-control" style="height:35px">
											</div>
										</div>
								
										<div class="col-sm-12" style="margin-top: 25px;text-align:left">
											<div class="form-group input-group">
												<button type="button" class="form-control" style="height:35px" disabled="disabled"><i class="far fa-flag"></i>&nbsp;우선순위</button>
												<select id="status" name="status" class="form-control" style="height:35px;text-align:center">
													<option selected value=""> 선택 </option>
													<option value="0">낮음</option>
													<option value="1">보통</option>
													<option value="2">높음</option>
													<option value="3" style="color: red">긴급</option>
												</select>
												<button type="button" class="form-control" disabled="disabled" style="height:35px;margin-left:20px"><i class="far fa-calendar-minus"></i>&nbsp;종료일</button>
												<input type="text" id="insertend" class="form-control" style="height:35px">
											</div>
										</div>
								
										<!-- <div class="col-sm-12" style="margin-top: 25px;text-align:left">
											<span style="margin-right:25px"><i class="fas fa-user-friends"></i></span>
											<a href="#" style="color: black;width: 109px">담당자 변경</a>
											<span style="margin-right:3px;margin-left:33px"><i class="far fa-chart-bar"></i>상태</span>
											<progress value="30" max="100" style="width: 110px;margin-left:15px"></progress>
										</div> -->
								
										<div class="col-sm-12" style="margin-top: 20px;text-align:right">
											<button type="button" class="btn btn-primary" id="insertBtn" name="insertBtn" style="width: 25%;">세부일정 저장</button>
											<button type="button" class="btn btn-primary" id="updateBtn" style="width:25%;display:none">세부일정 수정</button>
											<button type="button" class="btn btn-primary" id="deleteBtn" style="width:25%;display:none">세부일정 삭제</button>
											<button type="button" class="btn btn-primary" id="cancleBtn" style="width: 25%;">취소</button>
										</div>
									</div>
									<div class="col-sm-7" style="text-align:center">
										<label><H4>일정 목록</H4></label>
										<div class="table-responsive">
											<table id="taskInsertTable" class="table table-striped table-bordered zero-configuration text-center ttabletbody">
												<thead>
													<tr>
														<th>번호</th>
														<th>업무 제목</th>
														<th>업무 내용</th>
														<th>시작일</th>
														<th>종료일</th>
														<th>상태</th>
														<th>우선순위</th>
													</tr>
												</thead>
												<tbody>
													<c:forEach var="taskList" items="${taskList}">
														<tr style="text-align:center">
															<td style="cursor:pointer;">${taskList.seq}</td>
															<td style="cursor:pointer;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;">${taskList.title}</td>
															<td style="cursor:pointer;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;">${taskList.contents}</td>
															<td style="cursor:pointer;">${taskList.start}</td>
															<td style="cursor:pointer;">${taskList.end}</td>
															<td style="cursor:pointer;">${taskList.priority}</td>
															<td style="cursor:pointer;">${taskList.status}</td>
														</tr>
													</c:forEach>
												</tbody>
												<tfoot>
												</tfoot>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- Modal -->
					<div class="modal fade" id="myModal2" role="dialog">
						<div class="modal-dialog">
							<!-- Modal content-->
							<div class="modal-content">
								<div class="modal-header">
									<h4 id="modal-title2" class="modal-title">확인 사항</h4>
									<button type="button" class="close" data-dismiss="modal">&times;</button>
								</div>
								<div id="modal-body2" class="modal-body">
									<p>Some text in the modal.</p>
								</div>
								<div class="modal-footer">
									<button type="button" id="myModalUse2"
										class="btn btn-secondary btn-md">사용</button>
									<button type="button" id="myModalCancle2"
										class="btn btn-secondary btn-md" data-dismiss="modal"
										style="margin-left: 3px;">취소</button>
								</div>
							</div>
						</div>
					</div>
					<!-- /Modal -->
				</div>
				
			</div>
		</div>
	</div>
	<content tag="local_script">
		<script src="resources/fullcalendar-4.3.1/core/main.js"></script>
		<script src="resources/fullcalendar-4.3.1/interaction/main.js"></script>
		<script src="resources/fullcalendar-4.3.1/daygrid/main.js"></script>
		<script	src="resources/fullcalendar-4.3.1/timegrid/main.js"></script>
		<script	src="resources/fullcalendar-4.3.1/list/main.js"></script>
		<script src="resources/js/datepicker/bootstrap-datepicker.min.js"></script>
		<script src="resources/js/datepicker/bootstrap-datepicker.kr.min.js"></script>
		<script src="resources/js/project/task_fullcalenderList.js"></script>
		<script src="resources/js/project/task_fullcalender.js"></script>
		<script src="resources/js/project/task_insert.js"></script>
	</content>
</body>
</html>