<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title></title>
</head>
<body>
	<!--**********************************
            Header start
        ***********************************-->
	<div class="header-content clearfix">

		<div class="nav-control">
			<div class="hamburger">
				<span class="toggle-icon"><i class="icon-menu"></i></span>
			</div>
		</div>
		<div class="header-left" style="width: 90%">
			<div class="input-group icons">

				<div style="text-align: center; width: 90%; padding-left: 12%">
					<div id="noticeLiveTitle" class="noticeLiveTitle in"></div>
					<input type="hidden" id="noticeLiveNo">
				</div>
			</div>
		</div>
		<div class="header-right">
			<ul class="clearfix">
				<!-- <li class="icons dropdown"><a href="javascript:void(0)"
					data-toggle="dropdown"> <i class="mdi mdi-email-outline"></i> <span
						class="badge gradient-1 badge-pill badge-primary">3</span>
				</a>
					<div class="drop-down animated fadeIn dropdown-menu">
						<div
							class="dropdown-content-heading d-flex justify-content-between">
							<span class="">3 New Messages</span>

						</div>
						<div class="dropdown-content-body">
							<ul>
								<li class="notification-unread"><a href="javascript:void()">
										<img class="float-left mr-3 avatar-img"
										src="resources/images/avatar/1.jpg" alt="">
										<div class="notification-content">
											<div class="notification-heading">Saiful Islam</div>
											<div class="notification-timestamp">08 Hours ago</div>
											<div class="notification-text">Hi Teddy, Just wanted to
												let you ...</div>
										</div>
								</a></li>
								<li class="notification-unread"><a href="javascript:void()">
										<img class="float-left mr-3 avatar-img"
										src="resources/images/avatar/2.jpg" alt="">
										<div class="notification-content">
											<div class="notification-heading">Adam Smith</div>
											<div class="notification-timestamp">08 Hours ago</div>
											<div class="notification-text">Can you do me a favour?</div>
										</div>
								</a></li>
								<li><a href="javascript:void()"> <img
										class="float-left mr-3 avatar-img"
										src="resources/images/avatar/3.jpg" alt="">
										<div class="notification-content">
											<div class="notification-heading">Barak Obama</div>
											<div class="notification-timestamp">08 Hours ago</div>
											<div class="notification-text">Hi Teddy, Just wanted to
												let you ...</div>
										</div>
								</a></li>
								<li><a href="javascript:void()"> <img
										class="float-left mr-3 avatar-img"
										src="resources/images/avatar/4.jpg" alt="">
										<div class="notification-content">
											<div class="notification-heading">Hilari Clinton</div>
											<div class="notification-timestamp">08 Hours ago</div>
											<div class="notification-text">Hello</div>
										</div>
								</a></li>
							</ul>

						</div>
					</div></li>
				<li class="icons dropdown"><a href="javascript:void(0)"
					data-toggle="dropdown"> <i class="mdi mdi-bell-outline"></i> <span
						class="badge badge-pill gradient-2 badge-primary">3</span>
				</a>
					<div
						class="drop-down animated fadeIn dropdown-menu dropdown-notfication">
						<div
							class="dropdown-content-heading d-flex justify-content-between">
							<span class="">2 New Notifications</span>

						</div>
						<div class="dropdown-content-body">
							<ul>
								<li><a href="javascript:void()"> <span
										class="mr-3 avatar-icon bg-success-lighten-2"><i
											class="icon-present"></i></span>
										<div class="notification-content">
											<h6 class="notification-heading">Events near you</h6>
											<span class="notification-text">Within next 5 days</span>
										</div>
								</a></li>
								<li><a href="javascript:void()"> <span
										class="mr-3 avatar-icon bg-danger-lighten-2"><i
											class="icon-present"></i></span>
										<div class="notification-content">
											<h6 class="notification-heading">Event Started</h6>
											<span class="notification-text">One hour ago</span>
										</div>
								</a></li>
								<li><a href="javascript:void()"> <span
										class="mr-3 avatar-icon bg-success-lighten-2"><i
											class="icon-present"></i></span>
										<div class="notification-content">
											<h6 class="notification-heading">Event Ended
												Successfully</h6>
											<span class="notification-text">One hour ago</span>
										</div>
								</a></li>
								<li><a href="javascript:void()"> <span
										class="mr-3 avatar-icon bg-danger-lighten-2"><i
											class="icon-present"></i></span>
										<div class="notification-content">
											<h6 class="notification-heading">Events to Join</h6>
											<span class="notification-text">After two days</span>
										</div>
								</a></li>
							</ul>

						</div>
					</div></li>
				<li class="icons dropdown d-none d-md-flex"><a
					href="javascript:void(0)" class="log-user" data-toggle="dropdown">
						<span>English</span> <i class="fa fa-angle-down f-s-14"
						aria-hidden="true"></i>
				</a>
					<div
						class="drop-down dropdown-language animated fadeIn  dropdown-menu">
						<div class="dropdown-content-body">
							<ul>
								<li><a href="javascript:void()">English</a></li>
								<li><a href="javascript:void()">Dutch</a></li>
							</ul>
						</div>
					</div></li> -->
				<li class="icons dropdown">
					<div class="user-img c-pointer position-relative"
						data-toggle="dropdown">
						<span class="activity active"></span> <i class="fas fa-user"
							height="40" width="40" alt=""></i>
					</div>
					<div class="drop-down dropdown-profile dropdown-menu">
						<div class="dropdown-content-body">
							<ul>
								<li><a href="memberUpdateForm"><i class="icon-user"></i>
										<span>정보수정</span></a></li>
								<!-- <li><a href="email-inbox.html"><i
										class="icon-envelope-open"></i> <span>Inbox</span>
										<div class="badge gradient-3 badge-pill badge-primary">3</div></a>
								</li> -->
								<c:if test="${sessionMemLevel le 5}">
									<li><a href="memberManagement"><i
											class="far fa-address-card"></i><span>회원관리</span></a></li>
								</c:if>
								<li><a href="memberLogout"><i class="fas fa-sign-out-alt"></i> <span>Logout</span></a></li>
								<li><a href="testPage"><i class="icon-key"></i> <span>테스트
											페이지 이동</span></a></li>
							</ul>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
	<!--**********************************
            Header end ti-comment-alt
        ***********************************-->
</body>
</html>