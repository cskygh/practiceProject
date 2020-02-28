function backgroundColor() { // div 랜덤 배경색
	var backgroundColor = ['#f2c038', '#e96065', '#6b65dc', '#a7a8a9', '#1ccea5', '#5593e7', '#f6779e', '#434a51', 
		'#47bce2', '#f2811d', '#41c330'];
	var randome = Math.floor(Math.random() * backgroundColor.length); // Math.random()로 출력시 소수점까지 출력하게 된다.
	var color = backgroundColor[randome];
	return color;
}

$(document).ready(function() {
	$.ajax({
		type : 'POST',
		datatype : 'json',
		url : 'projectSelectAll',
		success : function(projectList) {
			$.each(projectList, function(index, projectList) {
				var color = backgroundColor();
				var proDiv = '';
				proDiv += '<div class="proDiv" style="background-color:' + color + ';cursor:pointer;">';
				proDiv += '<div class="proDiv-title">' + projectList.title;
				proDiv += '<input type="hidden" value="' + projectList.seq + '"></div>';
				proDiv += '<div class="proDiv-contents">' + projectList.contents + '</div>'
				proDiv += '</div>'
				$('#project-list').prepend(proDiv);
			});
		},
		error : function(xhr, status, error) {
			alert('ajax error' + error);
		}
	});
	$('#modal-body-title #inserttitle').keyup(function(){
		if($('#inserttitle').val() == null || $('#inserttitle').val() == '' ||
			$('#insertcontents').val() == null || $('#insertcontents').val() == ''){
			$('#myModalUse').attr('disabled',true);
		}else{
			$('#myModalUse').attr('disabled',false);
		}
	});
	$('#modal-body-contents #insertcontents').keyup(function(){
		if($('#insertcontents').val() == null || $('#insertcontents').val() == '' ||
			$('#inserttitle').val() == null || $('#inserttitle').val() == ''){
			$('#myModalUse').attr('disabled',true);
		}else{
			$('#myModalUse').attr('disabled',false);
		}
	});
	
	$('#add-btn').on('click', function() {
		$('#myModalUse').show();
		$('#myModalUse').attr('class','btn btn-primary').text('생성');
		$('#myModalUse').attr('disabled',true);
		$('#myModalCancle').show();
		$('#myModalCancle').attr('class','btn btn-primary');
		$('#modal-title').text('새 일정 만들기');
		$('#myModal').modal('show');
		$('#myModalUse').unbind().on('click', function() {// .unbind()는 기존 이벤트 제거
		var title = $('#modal-body-title').children().val();
		var contents = $('#modal-body-contents').children().val();
		var email = $('#email').val();
		var name = $('#name').val();
			$.ajax({
				type : 'POST',
				data : {
					title : title,
					contents : contents,
					email : email,
					name : name
				},
				datatype : 'json',
				url : 'projectAdd',
				success : function(seq) {
						var color = backgroundColor();
						var proDiv = '';
						proDiv += '<div class="proDiv" style="background-color:' + color + ';cursor:pointer;";>'
						proDiv += '<div class="proDiv-title">' + title;
						proDiv += '<input type="hidden" value="' + seq + '"></div>';
						proDiv += '<div class="proDiv-contents">' + contents + '</div>'
						proDiv += '</div>'
						$('#project-list').prepend(proDiv);
						$('#myModal').modal('hide');
						$('#modal-body-title').children().val('');
						$('#modal-body-contents').children().val('');
				},
				error : function(xhr, status, error) {
					alert('ajax error' + error);
				}
			});
		});
	});
//	$('#modal-body-title #inserttitle, #modal-body-contents insertcontents').keyup(function(){
//		if(window.event.keyCode == 13){
//			$('.modal-footer #myModalUse').trigger('click');
//		}
//	});
		
	$('.modal').on('hidden.bs.modal', function(e) { // 모달 창이 닫힐때 입력되 있는 값 초기화
		$('#modal-body-title input').val('');
		$('#modal-body-contents input').val('');
	});
	
	$(document).on('click', '#project-list .proDiv', function() {
		var proSeq = $(this).children().eq(0).children().val();
		location.href = 'projectTaskForm?proSeq=' + proSeq;
		
	});
	$('#closebtn').on('click',function(){
		$('#inserttitle').val('');
		$('#insertcontents').val('');
	});
	$('#myModalCancle').on('click',function(){
		$('#inserttitle').val('');
		$('#insertcontents').val('');
	});
});