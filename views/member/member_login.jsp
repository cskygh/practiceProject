<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html class="h-100">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Login</title>
<!-- Favicon icon -->
<link rel="icon" type="resources/image/png" sizes="16x16"
	href="resources/images/favicon.png">
<!-- <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous"> -->
<link href="resources/css/style.css" rel="stylesheet">

</head>

<body class="h-100">

	<!--*******************
        Preloader start
    ********************-->
	<div id="preloader">
		<div class="loader">
			<svg class="circular" viewBox="25 25 50 50">
                <circle class="path" cx="50" cy="50" r="20" fill="none"
					stroke-width="3" stroke-miterlimit="10" />
            </svg>
		</div>
	</div>
	<!--*******************
        Preloader end
    ********************-->

	<div id="memberLoginForm" class="login-form-bg h-100">
		<div class="container h-100">
			<div class="row justify-content-center h-100">
				<div class="col-xl-6">
					<div class="form-input-content">
						<div class="card login-form mb-0">
							<div class="card-body pt-5">
								<a class="text-center" href="memberLoginForm">
									<h4>Login</h4>
								</a>

								<div class="mt-5 mb-5 login-input">
									<div class="form-group">
										<input id="email" type="email" class="form-control" placeholder="Email">
									</div>
									<div class="form-group">
										<input id="password" type="password" class="form-control"
											placeholder="Password">
									</div>
									<button type="button" id="login-btn"
										class="btn login-form__btn sign-in_btn w-100">Sign In</button>
								</div>
								<p class="mt-5 login-form__footer">
								<div class="col-sm-12 mt-3">
									<label> Forgot </label> <a href="memberFindPasswordForm"
										class="text-primary"> Password? </a>
								</div>
								<div class="col-sm-12">
									<label> Create an account? </label><a href="memberInsertForm"
										class="text-primary"> Sign up </a>
								</div>
								</p>

							</div>
						</div>
					</div>
				</div>
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
						class="btn login-form__btn sign-in_btn">사용</button>
					<button type="button" id="myModalCancle"
						class="btn login-form__btn sign-in_btn" data-dismiss="modal"
						style="margin-left: 3px;">취소</button>
				</div>
			</div>
		</div>
	</div>
	<!-- /Modal -->

	<!--**********************************
        Scripts
    ***********************************-->
	<script src="resources/plugins/common/common.min.js"></script>
	<script src="resources/js/custom.min.js"></script>
	<script src="resources/js/settings.js"></script>
	<script src="resources/js/gleek.js"></script>
	<script src="resources/js/styleSwitcher.js"></script>
	<script src="resources/js/member/member.js"></script>
	
</body>
</html>