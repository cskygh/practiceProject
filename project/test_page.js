$(document).ready(function() {
	var backgroundColor = ['#f2c038', '#e96065', '#6b65dc', '#a7a8a9', '#1ccea5', '#5593e7', '#f6779e', '#434a51', 
		'#47bce2', '#f2811d', '#41c330'];
	var randome = Math.floor(Math.random() * backgroundColor.length); // Math.random()로 출력시 소수점까지 출력하게 된다.
	var color = backgroundColor[randome];
	console.log(color);
});
$(document).ready(function() {
	$('#testcheck').on('click',function(){
		var testid = $('#testid').val();
		$.ajax({
			type : 'POST',
			data : {
				id : testid
			},
			datatype : 'json',
			url : 'testcheck',
			success : function(data) {
				if (data == "y"){
					alert('중복된 아이디입니다.');
				}else{
					alert('사용가능한 아이디입니다.');
					$('#idcheck').val('y');
					$('#idError').text('');
				}
			},
			error : function(xhr, status, error) {
				alert('error');
			}
		});
		return;
	});
	$('#testdelete').on('click',function(){
		var currentRow = $(this).closest("tr");
		var id = currentRow.find("td:eq(1)").text();
			$.ajax({
				type : 'POST',
				data : {
					id : id
				},
				datatype : 'json',
				url : 'project_testpagedelete',
				success : function(data) {
					currentRow.remove();
					if (data == "1")
						alert('삭제');
				},
				error : function(xhr, status, error) {
					alert('error');
				}
			});
		return;
	});
	$('#testupdatebtn').on('click',function(){
		var updateid = $('#updateid').val();
		var updatename = $('#updatename').val();
		var updatepassword = $('#updatepassword').val();
		
		if(updatename == ''){
			alert('이름을 입력해주세요.');
			return;
		}
		if(updatepassword == ''){
			alert('비밀번호를 입력해주세요.');
			return;
		}
		$.ajax({
			type : 'POST',
			data : {
				id : updateid,
				name : updatename,
				password : updatepassword
			},
			datatype : 'json',
			url : 'project_testpage2update',
			success : function(testresult) {
				if(testresult == 'y'){
					alert('저 장');
					location.href = 'project_testpage';
				}else{
					alert('뜨지마');
				}
			},
			error : function(request, status, error) {
				alert("error code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			}
		});
	});
	$('#updatepage').on('click',function(){
		location.href = 'project_testpage2';
	});
	$('#testselect').on('click',function(){
		location.href = 'project_testlistForm';
	});
	$('#loginbtn').on('click',function(){
		var loginid = $('#loginid').val();
		var loginpassword = $('#loginpassword').val();
		if(loginid==''){
			alert('id를 입력해주세요.');
			return;
		}
		if(loginpassword==''){
			alert('비밀번호를 입력해주세요.')
			return;
		}
		$.ajax({
			type : 'POST',
			data : {
				id : loginid,
				password : loginpassword
			},
			datatype : 'json',
			url : 'testlogin',
			success : function(data) {
				if(data == 'y'){
					alert('로그인 성공');
					location.href = 'project_testpage';
				}else if(data =='n'){
					alert('로그인 실패');
				}
			},
			error : function(request, status, error) {
				alert("error code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			}
		});
	});
	$('#testsave').on('click',function(){
		var testid = $('#testid').val();
		var testpassword = $('#testpassword').val();
		var testname = $('#testname').val();
		if(testid==''){
			alert('id를 입력해주세요.');
			return;
		}
		if(testpassword==''){
			alert('비밀번호를 입력해주세요');
			return;
		}
		if(testname==''){
			alert('이름을 입력해주세요');
			return;
		}
		$.ajax({
			type : 'POST',
			data : {
				id : testid,
				password : testpassword,
				name : testname
			},
			datatype : 'json',
			url : 'testinsert',
			success : function(result) {
				if(result == 'y'){
					alert('저장 되었습니다.');
					$('#testid').val('');
					$('#testpassword').val('');
					$('#testname').val('');
				}
			},
			error : function(xhr, status, error) {
				alert('ajax error' + error);
			}
		});
	});
});