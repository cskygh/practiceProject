function dateFormat(date){
   var yyyy = date.getFullYear();
   var MM = date.getMonth()+1; // 0월 부터 시작해 +1을 시켜줌
   if(MM < 10){ // 한자리 일 경우 두자리로 바꿔주기 위해
      MM = '0' + MM;
   }
   var dd = date.getDate();
   if(dd < 10) {  // 한자리 일 경우 두자리로 바꿔주기 위해
      dd = '0' + dd;
   }
   var rtnDate = yyyy + '-' + MM + '-' + dd;
   return rtnDate;
}
function clear(){
	$('#inserttitle').val('');
	$('#insertcontents').val('');
	$('#insertstart').val('');
	$('#insertend').val('');
	$('#priority').val('').prop("selected", true);
	$('#status').val('').prop("selected", true);
}

$(document).ready(function() {
	$('#insertBtn').on('click',function(){
		$('#modal-title2').text('알림');
		$('#myModalUse2').unbind().show();
	    $('#myModalUse2').text('확인');
	    $('#myModalCancle2').unbind().show();
	    $('#myModalCancle2').text('취소');
	    var proSeq = $('#proSeq').val();
	    var email = $('#email').val();
		var title = $('#inserttitle').val();
		var contents = $('#insertcontents').val();
		var insertstart = $('#insertstart').val();
		var insertend = $('#insertend').val();
		var priority = $('#priority').val();
		var status = $('#status').val();
		
		var insertstartDate = new Date(insertstart);
		var insertendDate = new Date(insertend);
		if(insertstart=='' || insertend==''){
			$('#myModalUse2').hide();
			$('#myModal2').modal('show');
			$('#myModalCancle2').text('확인');
			$('#modal-body2').text('시작일 또는 종료일을 확인해주세요.');
			return;
		}
		if(insertstartDate > insertendDate){
			$('#myModalUse2').hide();
			$('#myModal2').modal('show');
			$('#myModalCancle2').text('확인');
			$('#modal-body2').text('시작일를 확인해주세요.');
			return;
		}else{
			insertstart = dateFormat(insertstartDate);
			insertendDate.setDate(insertendDate.getDate()+1);
			var dd = insertendDate.getDate();
			   if(dd < 10) {  // 한자리 일 경우 두자리로 바꿔주기 위해
				      dd = '0' + dd;
				   }
		    var MM = insertendDate.getMonth()+1; // 0월 부터 시작해 +1을 시켜줌
		    var yyyy = insertendDate.getFullYear();
		    insertend = yyyy + '-' + MM + '-' + dd;
		}
		if(title == '' || contents == ''){
			$('#myModalUse2').hide();
			$('#myModal2').modal('show');
			$('#myModalCancle2').text('확인');
			$('#modal-body2').text('제목 또는 내용을 확인해주세요.');
			return;
		}
		if(priority=='' || status==''){
			$('#myModalUse2').hide();
			$('#myModal2').modal('show');
			$('#myModalCancle2').text('확인');
			$('#modal-body2').text('상태 또는 우선순위를 선택해주세요.');
			return;
		}else{
			$.ajax({
				type : 'POST',
				data : {
					proSeq,
					email,
					title,
					contents,
					start : insertstart,
					end : insertend,
					priority,
					status
				},
				datatype : 'json',
				url : 'projectTaskInsert',
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
							clear();
							location.reload();
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
					alert('ajax error' + error);
				}
			});
		}
	});
      $('#insertstart').datepicker({
         format : 'yyyy-mm-dd', // 달력에서 클릭시 표시할 값 형식
         language : 'kr', // 언어(js 추가가 필요하다.)
         todayHighlight : true,
         autoclose : true // 날짜 클릭시 자동 닫힘
      })
      .datepicker('setDate', new Date(new Date())) // 금일 날짜로 세팅
      .on('changeDate', function(selectedDate){ // 날짜가 변경 되었을 때 실행
         if($('#insertstart').val() > $('#insertend').val()){ // 종료일보다 시작일자가 큰 경우 종료일자로 만듬
             $('#insertstart').datepicker('setDate', new Date($('#insertend').val()));
         }
      });
      $('#insertend').datepicker({
         format : "yyyy-mm-dd", // 달력에서 클릭시 표시할 값 형식
         language : "kr", // 언어(js 추가가 필요하다.)
         todayHighlight : true,
         autoclose : true
      }).datepicker('setDate', new Date(new Date())) // 금일 날짜로 세팅
      .on('changeDate', function(){ // 날짜가 변경 되었을 때 실행
         if($('#insertstart').val() > $('#insertend').val()){ // 시작일보다 종료일자가 앞선 경우 시작일자로 만듬
             $('#insertend').datepicker('setDate', new Date($('#insertstart').val()));
         }
      });
      $('#cancleBtn').on('click',function(){
    	  clear();
    	  $('#insertBtn').show();
    	  $('#updateBtn').hide();
    	  $('#deleteBtn').hide();
      });
      $('#updateBtn').on('click',function(){
		  $.ajax({
				type : 'POST',
				data : {
					seq : $('#seq').val(),
					title : $('#inserttitle').val(),
					contents : $('#insertcontents').val(),
					priority : $('#priority').val(),
					status : $('#status').val(),
					start : $('#insertstart').val(),
					end : $('#insertend').val()
				},
				datatype : 'json',
				url : 'projectTaskListUpdate',
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
					alert('ajax error' + error);
				}
			});
      });
      $('#deleteBtn').on('click',function(){
    	  $.ajax({
				type : 'POST',
				data : {
					seq : $('#seq').val()
				},
				datatype : 'json',
				url : 'projectTaskListDelete',
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
							clear();
							location.reload();
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
					alert('ajax error' + error);
				}
			});
    	  
      });
      $(document).on('click', '#taskInsertTable tbody tr' ,function(){
    	  $('#insertBtn').hide();
    	  $('#updateBtn').show();
    	  $('#deleteBtn').show();
    	  var tableseq = $(this).children().eq(0).text();
    	  $.ajax({
				type : 'POST',
				data : {
					seq : tableseq
				},
				datatype : 'json',
				url : 'selectOneRow',
				success : function(data) {
					$('#seq').val(data.seq);
					$('#inserttitle').val(data.title);
					$('#insertcontents').val(data.contents);
					$('#priority').val(data.priority);
					$('#status').val(data.status);
					$('#insertstart').val(data.start);
					$('#insertend').val(data.end);
					
				},
				error : function(xhr, status, error) {
					alert('ajax error' + error);
				}
			});
      });
      $('#projectDeleteBtn').on('click',function(){
    	  alert(1);
//    	  $.ajax({
//				type : 'POST',
//				data : {
//				},
//				datatype : 'json',
//				url : '',
//				success : function(result) {
//					alert(result);
//					if(result == 'y'){
//						swal({
//							title : '삭제 되었습니다.',
//							icon : 'success',
//							closeOnClickOutside: false,
//							closeOnEsc: false,
//							buttons : {
//								cancle : {
//									text : '확인',
//									calssName : 'btn btn-outline-primary'
//								},
//							}
//						}).then((result) => {
//							clear();
//							location.reload();
//						});
//					} else {
//						swal({
//							title : '삭제 실패',
//							icon : 'error',
//							closeOnClickOutside: false,
//							closeOnEsc: false,
//							buttons : {
//								cancle : {
//									text : '확인',
//									calssName : 'btn btn-outline-primary'
//								},
//							}
//						});
//					}
//				},
//				error : function(xhr, status, error) {
//					alert('ajax error' + error);
//				}
//			});
      });
});