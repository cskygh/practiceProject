function validateEmail(Email) { // E-MAIL 형식 체크
	var pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	return $.trim(Email).match(pattern) ? true : false;
}

function sessionCheck() { // session Check용
	var sessionEmail = '';
	$.ajax({
		type : 'POST',
		datatype : 'json',
		url : 'memberSessionCheck',
		async : false,
		success : function(result) {
			sessionEmail = result;
		},
		error : function(xhr, status, error) {
			alert('ajax error');
		}
	});
	if(sessionEmail == ''){
		swal({
			// className : 'red-bg', // 클래스 이름 지정, 즉 css 지정 가능
			title : '세션만료!',
			text : '로그아웃 되었습니다.',
			icon : 'info',
//				content: { // content에 다양하게 입력 가능
//				    element: "input",
//				    attributes: {
//				      placeholder: "Type your password",
//				      type: "password",
//				    },
//				}, 
//				dangerMode : true, // 확인 버튼 빨갛게
			closeOnClickOutside: false, // alert 창을 제외하고 클릭시 창닫히지 않게(false, true면 닫힘)
			closeOnEsc: false, // esc 키 안먹히게(기본 true)
			// timer: 3000, // 지정한 시간 후 자동으로 닫힘
			buttons : {
//					cancle : {
//						text : '페이지 머물기',
//						value : false,
//						className : 'btn btn-outline-primary' // 클래스 이름을 줄 수도 있다.
//					},
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
//				else {
//					swal('주의', '로그인을 해주시기 바랍니다.', 'warning',{
//						closeOnClickOutside: false,
//						closeOnEsc: false,
//						buttons : {
//							confirm : {
//								text : '확인',
//								value : true,
//								className : 'btn btn-outline-primary'
//							}
//						}
//					});
//				}
		});
	} else {
		return;
	}
}

$(document).ready(function() {
	$('#memberLoginForm #email, #memberLoginForm #password').keyup(function() { // 로그인 창에서 엔터 입력시
		if(window.event.keyCode == 13){ // 
			$('#memberLoginForm #login-btn').trigger('click'); // 로그인 버튼 클릭
		} 
	});
	
	$('#memberLoginForm #login-btn').on('click', function() {
		var email = $('#email').val();
		var password = $('#password').val();
		$('#myModalUse').show();
		$('#myModalUse').unbind().text('사용');
		$('#myModalCancle').unbind().text('취소');
		$('.modal-title').text('Login');
		if (email == "") {
			$('.modal-body').text('E-Mail을 입력해주세요');
			$('#myModal').modal('show');
			$('#myModalUse').hide();
			$('#myModalCancle').text('확인');
			return;
		}
		if (password == "") {
			$('.modal-body').text('비밀번호를 입력해주세요');
			$('#myModal').modal('show');
			$('#myModalUse').hide();
			$('#myModalCancle').text('확인');
			return;
		}
		$.ajax({
			type : 'POST',
			data : {
				email : email,
				password : password
			},
			datatype : 'json',
			url : 'memberLogin',
			success : function(data) {
				if (data == 'mainPage') {
					location.href = 'index';
				} else if (data == 'needEmailCheck') {
					$('.modal-body').text('인증 후 이용 가능합니다. 인증 이메일을 발송 하시겠습니까?');
					$('#myModal').modal('show');
					$('#myModalUse').text('발송');
					$('#myModalUse').on('click', function() {
						$.ajax({
							type : 'POST',
							data : "email=" + email,
							datatype : 'json',
							url : 'emailAuth',
							success : function(data) {
								$('.modal-body').text('이메일이 발송되었습니다.');
								$('#myModalUse').hide();
								$('#myModalCancle').text('확인');
								return;
							},
							error : function(xhr, status, error) {
								alert('ajax error');
							}
						});
					});
					return;
				} else if (data == 'faild') {
					$('.modal-body').text('Email 또는 Password를 확인해 주세요');
					$('#myModalUse').hide();
					$('#myModalCancle').text('확인');
					$('#myModal').modal('show');
					$('#email').val('');
					$('#email').focus();
					$('#password').val('');
					return;
				}
			},
			error : function(xhr, status, error) {
				alert('ajax error');
			}
		});
		$(document).ajaxStart(function() {
			$('#preloader').show();
		});
		$(document).ajaxStop(function() {
			$('#preloader').hide();
		});
	});
	
	$('#memberInsertForm #emailConfirm').on('click', function() {
		var email = $('#email').val();
		var emailchk = validateEmail(email);
		$('#myModalUse').show();
		$('#myModalUse').unbind().text('사용');
		$('#myModalCancle').unbind().text('취소');
		$('.modal-title').text('E-Mail 중복검사');
		if (email == "") {
			$('.modal-body').text('E-Mail을 입력해주세요');
			$('#myModal').modal('show');
			$('#myModalUse').hide();
			$('#myModalCancle').text('확인');
			return;
		}
		if (!emailchk) {
			$('.modal-body').text('E-Mail형식을 사용해주세요');
			$('#myModal').modal('show');
			$('#myModalUse').hide();
			$('#myModalCancle').text('확인');
			return;
		} else {
			$.ajax({
				type : 'POST',
				data : "email=" + email,
				datatype : 'json',
				url : 'memberEmailConfirm',
				success : function(result) {
					if (result == 'y') {
						$('.modal-body').text('사용중인 E-Mail입니다.');
						$('#myModalUse').hide();
						$('#myModalCancle').text('확인');
					} else {
						$('.modal-body').text('사용가능한 E-Mail입니다.');
						$('#myModalUse').on('click', function() {
							$('#email').attr('readonly', true);
							$('#password').focus();
							$('#emailCheck').val('y');
							$('#emailError').text('');
						});
					}
					$('#myModal').modal('show');
					$('#myModalCancle').on('click', function() {
						$('#email').val('');
						$('#email').attr('readonly', false);
						$('#emailCheck').val('n');
						$('#emailError').val('');
						$('#email').focus();
					});
				},
				error : function(xhr, status, error) {
					alert('ajax error');
				}
			});
		}
	});
	
	$('#memberInsertForm #insert-btn').on('click', function() {
		$('#myModalUse').show();
		$('#myModalUse').unbind().text('사용');
		$('#myModalCancle').unbind().text('취소');
		$('.modal-title').text('확인사항');
		var email = $('#email').val();
		var emailBase = $('#emailBase').val();
		var emailCheck = $('#emailCheck').val();
		var password = $('#password').val();
		var rePassword = $('#rePassword').val();
		var name = $('#name').val();
		if(emailBase != emailCheck){
			$('.modal-body').text('E-Mail 중복 체크를 해주세요');
			$('#myModal').modal('show');
			$('#myModalUse').hide();
			$('#myModalCancle').text('확인');
			return;
		}
		if(password != rePassword){
			$('.modal-body').text('비밀번호를 확인 해주세요');
			$('#myModal').modal('show');
			$('#myModalUse').hide();
			$('#rePassword').val('');
			$('#myModalCancle').text('확인');
			return;
		}
		if(name == ''){
			$('.modal-body').text('이름을 입력해주세요');
			$('#myModal').modal('show');
			$('#myModalUse').hide();
			$('#myModalCancle').text('확인');
			return;
		} else {
			$.ajax({
				type : 'POST',
				data : {
					email : email,
					password : password,
					name : name
				},
				datatype : 'json',
				url : 'memberInsert',
				success : function(data) {
					$('.modal-body').text('회원가입이 되었습니다.');
					$('#myModal').modal('show');
					$('#myModalUse').hide();
					$('#myModalCancle').text('확인');
					$('#myModalCancle').on('click', function() {
						location.href = 'memberLoginForm';
					});
				},
				error : function(xhr, status, error) {
					alert('ajax error' + error);
				}
			});
		}
		
	});
	
	$('#memberFindPasswordForm #find-btn').on('click', function() {
		var email = $('#email').val();
		var emailchk = validateEmail(email);
		var name = $('#name').val();
		$('#myModalUse').show();
		$('#myModalUse').unbind().text('사용');
		$('#myModalCancle').unbind().text('취소');
		$('.modal-title').text('Find Password');
		if (email == "") {
			$('.modal-body').text('E-Mail을 입력해주세요');
			$('#myModal').modal('show');
			$('#myModalUse').hide();
			$('#myModalCancle').text('확인');
			return;
		}
		if (!emailchk) {	
			$('.modal-body').text('E-Mail형식을 사용해주세요');
			$('#email').val('');
			$('#myModal').modal('show');
			$('#myModalUse').hide();
			$('#myModalCancle').text('확인');
			return;
		}
		if (name == "") {
			$('.modal-body').text('이름을 입력해주세요');
			$('#myModal').modal('show');
			$('#myModalUse').hide();
			$('#myModalCancle').text('확인');
			return;
		}
		$.ajax({
			type : 'POST',
			data : {
				email : email,
				name : name
			},
			datatype : 'json',
			url : 'memberFindPassword',
			success : function(data) {
				if (data == 'y') {
					$('.modal-body').text('임시비밀번호를 발송하시겠습니까?');
					$('#myModal').modal('show');
					$('#myModalUse').show();
					$('#myModalUse').text('발송');
					$('#myModalUse').on('click', function() {
						$.ajax({
							type : 'POST',
							data : "email=" + email,
							datatype : 'json',
							url : 'sendNewPassword',
							success : function(data) {
								$('.modal-body').text('이메일이 발송되었습니다.');
								$('#myModalUse').hide();
								$('#myModalCancle').text('확인');
								$('#myModalCancle').on('click', function() {
									location.href = 'memberLoginForm';
								});
								return;
							},
							error : function(xhr, status, error) {
								alert('ajax error');
							}
						});
					});
					$('#myModalCancle').text('취소');
				} else {
					$('#email').val('');
					$('#name').val('');
					$('.modal-body').text('Email 또는 이름이 일치하지 않습니다.');
					$('#myModal').modal('show');
					$('#myModalUse').hide();
					$('#myModalCancle').text('확인');
				}
			},
			error : function(xhr, status, error) {
				alert('ajax error');
			}
		});
		$(document).ajaxStart(function() {
			$('#preloader').show();
		});
		$(document).ajaxStop(function() {
			$('#preloader').hide();
		});
	});
	
	$('#memberUpdateForm #passwordCheck-btn').on('click', function() {
		sessionCheck();
		$('#myModalUse').show();
		$('#myModalUse').unbind().text('사용');
		$('#myModalCancle').unbind().text('취소');
		$('.modal-title').text('확인사항');
		var email = $('#email').val();
		var password= $('#password').val();
		if(password == ""){
			$('.modal-body').text('비밀번호를 입력해주세요');
			$('#myModal').modal('show');
			$('#myModalUse').hide();
			$('#myModalCancle').text('확인');
			return;
		} else {
			$.ajax({
				type : 'POST',
				data : {
					email : email,
					password : password
				},
				datatype : 'json',
				url : 'memberPasswordCheck',
				success : function(result) {
					if(result == 'n'){
						$('.modal-body').text('비밀번호를 확인해주시기 바랍니다.');
						$('#myModal').modal('show');
						$('#myModalUse').hide();
						$('#myModalCancle').text('확인');
						$('#password').val('');
						return;
					} else {
						$('#update-contents').empty();
						var div = '';
						div += '<a class="text-center" href="javascript:history.back(-1)">';
						div += '<h4>Information Change</h4>';
						div += '</a>';
						div += '<div class="mt-5 mb-5 login-input">';
						div += '<div class="form-group">';
						div += '<input type="text" id="name" class="form-control" placeholder="Name">';
						div += '</div>';
						div += '<div class="form-group">';
						div += '<input type="password" id="password" class="form-control" placeholder="Password">';
						div += '</div>';
						div += '<div class="form-group">';
						div += '<input type="password" id="rePassword" class="form-control" placeholder="rePassword">';
						div += '</div>';
						div += '<button type="button" id="update-btn" class="btn login-form__btn sign-in_btn w-100">Update</button>';
						div += '</div>';
						div += '</div>';
						$('#update-contents').append(div);
					}
				},
				error : function(xhr, status, error) {
					alert('ajax error');
				}
			});
		}
	});
	
	$(document).on('click', '#memberUpdateForm #update-btn', function() {
		sessionCheck();
		$('#myModalUse').show();
		$('#myModalUse').unbind().text('사용');
		$('#myModalCancle').unbind().text('취소');
		$('.modal-title').text('확인사항');
		var oldName = $('#oldName').val();
		var oldPassword = $('#oldPassword').val();
		var email = $('#email').val();
		var name = $('#name').val();
		var password = $('#password').val();
		var rePassword = $('#rePassword').val();
		if(name == '' && password == ''){
			$('.modal-body').text('변경할 정보를 입력해주세요');
			$('#myModal').modal('show');
			$('#myModalUse').hide();
			$('#myModalCancle').text('확인');
			$('#rePassword').val('');
			return;
		} else if(password != rePassword){
			$('.modal-body').text('비밀번호를 확인 해주세요');
			$('#myModal').modal('show');
			$('#myModalUse').hide();
			$('#rePassword').val('');
			$('#myModalCancle').text('확인');
			return;
		}
		if(name == '' && password != '') {
			name = oldName;
		} else if (name != '' && password == '') {
			password = oldPassword;
		}
		$.ajax({
			type : 'POST',
			data : {
				email : email,
				name : name,
				password : password
			},
			datatype : 'json',
			url : 'memberUpdate',
			success : function(result) {
				if(result == 'y'){
					$('.modal-body').text('변경 되었습니다.');
					$('#myModal').modal('show');
					$('#myModalUse').hide();
					$('#myModalCancle').text('확인');
					$('#myModalCancle').on('click', function() {
						location.href = 'index';
					});
				} else {
					$('.modal-body').text('변경에 실패했습니다.');
					$('#myModal').modal('show');
					$('#myModalUse').hide();
					$('#myModalCancle').text('확인');
				}
			},
			error : function(xhr, status, error) {
				alert('ajax error');
			}
		});
	});
});
