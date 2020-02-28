function clear(){
	$('#noticeTitle').val();
	$('#noticeContents').val();
}
$(document).ready(function() {
	$('#noticeInsert').on('click',function(){
		var no = $('#noticeNo').val();
		var title = $('#noticeTitle').val();
		var contents = $('#noticeContents').val();
		$.ajax({
			type : 'POST',
			data : {
				no,
				title,
				contents
			},
			datatype : 'json',
			url : 'noticeInsert',
			success : function(result) {
				if(result == 'y'){
					swal({
						title : '저장 되었습니다.',
						icon : 'success',
						closeOnClickOutside: false,
						closeOnEsc: false,
						buttons : {
							cancle : {
								text : '확인',
								calssName : 'btn btn-outline-primary'
							},
						}
					}).then((result) => {
						location.href='notice';
					});
				} else {
					swal({
						title : '저장 실패',
						icon : 'error',
						closeOnClickOutside: false,
						closeOnEsc: false,
						buttons : {
							cancle : {
								text : '확인',
								calssName : 'btn btn-outline-primary'
							},
						}
					});
				}
			},
			error : function(xhr, status, error) {
				alert('ajax error');
			}
		});
	});
	$('#noticeUpdate').on('click',function(){
		var no = $('#noticeNo').val();
		var title = $('#noticeChangeTitle').val();
		var contents = $('#noticeChangeContents').val();
		$.ajax({
			type : 'POST',
			data : {
				no,
				title,
				contents
			},
			datatype : 'json',
			url : 'noticeUpdate',
			success : function(result) {
				if(result == 'y'){
					swal({
						title : '수정 되었습니다.',
						icon : 'success',
						closeOnClickOutside: false,
						closeOnEsc: false,
						buttons : {
							cancle : {
								text : '확인',
								calssName : 'btn btn-outline-primary'
							},
						}
					}).then((result) => {
						clear();
						location.reload();
					});
				} else {
					swal({
						title : '수정 실패',
						icon : 'error',
						closeOnClickOutside: false,
						closeOnEsc: false,
						buttons : {
							cancle : {
								text : '확인',
								calssName : 'btn btn-outline-primary'
							},
						}
					});
				}
			},
			error : function(xhr, status, error) {
				alert('ajax error');
			}
		});
	});
	$('#noticeDelete').on('click',function(){
		$.ajax({
			type : 'POST',
			data : {
				no : $('#noticeNo').val()
			},
			datatype : 'json',
			url : 'noticeDelete',
			success : function(result) {
				if(result == 'y'){
					swal({
						title : '삭제 되었습니다.',
						icon : 'success',
						closeOnClickOutside: false,
						closeOnEsc: false,
						buttons : {
							cancle : {
								text : '확인',
								calssName : 'btn btn-outline-primary'
							},
						}
					}).then((result) => {
						location.href='notice';
					});
				} else {
					swal({
						title : '삭제 실패',
						icon : 'error',
						closeOnClickOutside: false,
						closeOnEsc: false,
						buttons : {
							cancle : {
								text : '확인',
								calssName : 'btn btn-outline-primary'
							},
						}
					});
				}
			},
			error : function(xhr, status, error) {
				alert('ajax error');
			}
		});
	});
	$('#noticeCancel').on('click',function(){
		$('#noticeTitle').val('');
		$('#noticeContents').val('');
		history.back();
	});
	$('#noticeChange').on('click',function(){
		$('#noticeTitle').hide();
		$('#noticeContents').hide();
		$('#noticeChange').hide();
		$('#noticeChangeTitle').show();
		$('#noticeChangeContents').show();
		$('#noticeUpdate').show();
		$('#noticeCancel').show();
	});
	$('#noticeCancel').on('click',function(){
		$('#noticeChangeTitle').val();
		$('#noticeChangeContents').val();
	});
});
