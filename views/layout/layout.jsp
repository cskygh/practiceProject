<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.opensymphony.com/sitemesh/decorator"
	prefix="decorator"%>
<%@ taglib uri="http://www.opensymphony.com/sitemesh/page" prefix="page"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link href="resources/css/normalize.8.0.1.css" rel="stylesheet">
<!-- Favicon icon 상단 탭 아이콘-->
<link rel="icon" type="resources/image/ico" sizes="16x16"
	href="resources/images/favicon.ico">
<!-- Custom Stylesheet -->
<link href="resources/css/style.css" rel="stylesheet">
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
<link href="resources/css/notice/notice_live_title.css" rel="stylesheet">
<link href="resources/css/notice/notice.css" rel="stylesheet">
	
<title><decorator:title /></title>

<decorator:getProperty property="page.local_css"></decorator:getProperty>
<!-- 예외처리 할 곳에서 아래 태그 입력 -->
<%-- <content tag="local_css"> <link rel="stylesheet" href=""> </content> --%>
<style type="text/css">
/* sweetalert 하단 버튼 가운데 정렬 */
.swal-footer {
	text-align: center;
}
.noticeLiveTitle {
	width : 100%;
	height : 50px;
	text-align: center;
	padding-top : 15px;
	cursor: pointer;
}
.out {
	text-align : center;
}

.in {
	display : inline-block;
}
</style>
</head>

<body>
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


	<!--**********************************
        Main wrapper start
    ***********************************-->
	<div id="main-wrapper">

		<div class="nav-header">
			<page:applyDecorator name="layoutnavheader" />
		</div>
		<div class="header">
			<page:applyDecorator name="layoutheader" />
		</div>
		<!--**********************************
            Sidebar start
        ***********************************-->
		<div class="nk-sidebar">
			<page:applyDecorator name="layoutleft" />
		</div>
		<!--**********************************
            Sidebar end
        ***********************************-->

		<!--**********************************
            Content body start
        ***********************************-->
		<div class="content-body">
			<!-- <div class="row page-titles mx-0">
				<div id="noticeLiveTitle" class="noticeLiveTitle in"></div>
				<input type="hidden" id="noticeLiveNo">	
			</div> -->
			<!-- row -->

			<div class="container-fluid">
				<decorator:body />
			</div>
			<!-- #/ container -->
		</div>
		<!--**********************************
            Content body end
        ***********************************-->


		<!--**********************************
            Footer start
        ***********************************-->
		<div class="footer">
			<div class="copyright">
				<p>
					Copyright &copy; Designed & Developed by <a
						href="https://themeforest.net/user/quixlab">Quixlab</a> 2018
				</p>
			</div>
		</div>
		<!--**********************************
            Footer end
        ***********************************-->
	</div>
	<!--**********************************
        Main wrapper end
    ***********************************-->

	<!--**********************************
        Scripts
    ***********************************-->
	<script src="resources/plugins/common/common.min.js"></script>
	<script src="resources/js/custom.min.js"></script>
	<script src="resources/js/settings.js"></script>
	<script src="resources/js/gleek.js"></script>
	<script src="resources/js/styleSwitcher.js"></script>
	<!-- sweetalert -->
	<script src="resources/js/sweetalert.min.js"></script>
	<script src="resources/js/notice/notice.js"></script>
	<script src="resources/js/notice/liveTitle.js"></script>

	<decorator:getProperty property="page.local_script"></decorator:getProperty>
	<!-- 예외처리 할 곳에서 아래 태그 입력 -->
	<%-- <content tag="local_script"> <script src=""> </script> </content> --%>
	
	<script type="text/javascript">
	$(document).ready(function() {
		var sessionEmail = '<%=session.getAttribute("sessionEmail")%>';
		// '' 없이 세션을 받아오면 문자라 오류 발생!
		<%--var sessionEmail = '<%=session.getAttribute("세션으로 등록한 값")%>'; --%>
		if(sessionEmail == '' || sessionEmail == 'null'){
		// 문자로 지정해줘서 'null'이 되지만 혹시 몰라 ''까지 지정해뒀다.
		// 세션 값이 없을 때 지정한 페이지로 이동!
			swal({
				// className : 'red-bg', // 클래스 이름 지정, 즉 css 지정 가능
				title : '세션만료!',
				text : '로그아웃 되었습니다.',
				icon : 'info',
//					content: { // content에 다양하게 입력 가능
//					    element: "input",
//					    attributes: {
//					      placeholder: "Type your password",
//					      type: "password",
//					    },
//					}, 
//					dangerMode : true, // 확인 버튼 빨갛게
				closeOnClickOutside: false, // alert 창을 제외하고 클릭시 창닫히지 않게(false, true면 닫힘)
				closeOnEsc: false, // esc 키 안먹히게(기본 true)
				// timer: 3000, // 지정한 시간 후 자동으로 닫힘
				buttons : {
// 					cancle : {
// 						text : '페이지 머물기',
// 						value : false,
// 						className : 'btn btn-outline-primary' // 클래스 이름을 줄 수도 있다.
// 					},
					confirm : {
						text : '로그인 창으로',
						value : true,
						className : 'btn btn-outline-primary'
					}
				}
			}).then((result) => {
				// botton의 value를 result로 받아서 사용
				if(result){
					swal('페이지 이동', '로그인 창으로 이동합니다.', 'success', {
						closeOnClickOutside: false,
						closeOnEsc: false,
						buttons : {
							confirm : {
								text : '확인',
								value : true,
								className : 'btn btn-outline-primary'
							}
						}
					}).then((result) => {
						if(result){
							location.href='memberLoginForm';
						}
					});
				} 
// 				else {
// 					swal('주의', '로그인을 해주시기 바랍니다.', 'warning',{
// 						closeOnClickOutside: false,
// 						closeOnEsc: false,
// 						buttons : {
// 							confirm : {
// 								text : '확인',
// 								value : true,
// 								className : 'btn btn-outline-primary'
// 							}
// 						}
// 					});
// 				}
			});
		}
	});
	
	</script>
</body>

</html>