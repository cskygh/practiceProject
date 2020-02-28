function dateFormat(date){
   var yyyy = date.getFullYear();
   var MM = date.getMonth()+1; // 0월 부터 시작해 +1을 시켜줌
   var dd = date.getDate();
   var rtnDate = yyyy + '-' + MM + '-' + dd;
   return rtnDate;
}

function getEvent(proSeq) {
   var events;
   $.ajax({
      type : 'POST',
      data : {
         proSeq : proSeq
      },
      datatype : 'json',
      async : false,
      url : 'projectTaskList',
      success : function(result) {
         events = result;
      },
      error : function(xhr, status, error) {
         alert('ajax error' + error);
      }
   });
   return events;
}

function updateFunc(info) {
   var proSeq = info.event.extendedProps.proSeq;
   var seq = info.event.extendedProps.seq;
   var start = info.event.start;
   start = dateFormat(start);
   var end = info.event.end;
   end = dateFormat(end);
   var title = info.event.title;
   var contents = info.event.extendedProps.contents;
   var msg;
   $.ajax({
      type : 'POST',
      data : {
         proSeq : proSeq,
         seq : seq,
         start : start,
         end : end,
         title : title,
         contents : contents
      },
      datatype : 'json',
      async : false,
      url : 'projectTaskUpdate',
      success : function(result) {
         if(result == 'y'){
            msg = '수정되었습니다.';
         } else {
            msg = '수정에 실패했습니다.';
         }
      },
      error : function(xhr, status, error) {
         msg = '수정에 실패했습니다.';
      }
   });
   return msg;
}

document.addEventListener('DOMContentLoaded', function() {
   var proSeq = $('#proSeq').val();
   var events = getEvent(proSeq);
   var calendarEl = document.getElementById('calendar');
   var calendar = new FullCalendar.Calendar(calendarEl, {
      timeZone : 'local', // 한국 시간으로 설정
      plugins : [ 'interaction', 'dayGrid', 'timeGrid', 'list'],
      height : 'parent',
      contentHeight : 550, // 달력 크기
      header : {
         left : 'prev,next today',
         center : 'title',
         right : 'listWeek'
      },
      buttonText:{
         today : '오늘',
         list : '주간 일정표'
      },
      selectable : true, // 클릭 및 드래그 선택 기능
      selectMirror : true, // 힌트 표시?? 정확한 기능 확인 필요, TimeGrid views에서만 동작!
      select : function(arg) {
         var title = prompt('Event Title:'); // prompt창이 확인 일 경우 add.Event 실행
         if (title) {
            calendar.addEvent({
               title : title,
               start : arg.start,
               end : arg.end,
               allDay : arg.allDay
            })
         }
         calendar.unselect()
      },
      eventDrop : function(info) { // 이벤트를 드래그를 해 손을 놓았을 했을 때
//         alert(start);
//          alert(
//          info.event.title + " was moved " +
//          info.event.start + " start and " +
//          info.event.end + " end." +
//          info.event.extendedProps.seq + " seq" +
//          info.event.extendedProps.proSeq + " proSeq"
//          );
         if (confirm("수정하시겠습니까?")) {
            var msg = updateFunc(info);
            alert(msg);
         } else {
            info.revert(); // 취소 시키기(없을 경우 무조건 이동이 이뤄진다.)
         }
      },
      eventResize : function(info) { // 이벤트 일정을 드래그 해 변경했을 때(종료 일자)
         if (confirm("수정하시겠습니까?")) {
            var msg = updateFunc(info);
            alert(msg);
         } else {
            info.revert(); // 취소 시키기(없을 경우 무조건 이동이 이뤄진다.)
         }
      },
      editable : true,
      eventLimit : true, // allow "more" link when too many events
      defaultView : 'listWeek',
      navLinks : true, // can click day/week names to navigate views
      editable : true,
      eventLimit : true, // allow "more" link when too many events
      events : events,
      eventClick : function(info) { // 클릭 이벤트는 생성시 추가, 이벤트를 클릭했을 때
//         console.log(info); 콘솔(개발자도구)로  info 값을 확인 할수있음
            $('#calendarModal').modal('show');
			$('#calendarUse').unbind().show();
			$('#calendarCancle').unbind().show();
			var proSeq = info.event.extendedProps.proSeq;
			var seq = info.event.extendedProps.seq;
//			
			var calendartitle = info.event.title;
			$('#calendartitle').val(info.event.title);
			var calendarcontents = info.event.extendedProps.contents;
			$('#calendarcontents').val(info.event.extendedProps.contents);
//			
			var calendarstart = info.event.start;
			calendarstart = dateFormat(calendarstart);
			var calendarend = info.event.end;
			calendarend = dateFormatTwo(calendarend);
			$('#calendarstart').datepicker({
				format : 'yyyy-mm-dd', // 달력에서 클릭시 표시할 값 형식
				language : 'kr', // 언어(js 추가가 필요하다.)
				todayHighlight : true,
				autoclose : true
			// 날짜 클릭시 자동 닫힘
			}).datepicker('setDate', new Date(calendarstart))
			.on('changeDate', function(selectedDate) { // 날짜가 변경 되었을 때 실행
				if ($('#calendarstart').val() > $('#calendarend').val()) { // 종료일보다 시작일자가 큰 경우
																// 종료일자로 만듬
					$('#calendarstart').datepicker('setDate', new Date($('#calendarend').val()));
				}
			});
			$('#calendarend').datepicker({
				format : "yyyy-mm-dd", // 달력에서 클릭시 표시할 값 형식
				language : "kr", // 언어(js 추가가 필요하다.)
				todayHighlight : true,
				autoclose : true
			}).datepicker('setDate', new Date(calendarend)) // 금일 날짜로 세팅
			.on('changeDate', function() { // 날짜가 변경 되었을 때 실행
				if ($('#calendarstart').val() > $('#calendarend').val()) { // 시작일보다 종료일자가 앞선 경우
																// 시작일자로 만듬
					$('#calendarend').datepicker('setDate', new Date($('#calendarstart').val()));
				}
			});
			$('#calendarUse').on('click', function() {
				if (calendartitle == '' || calendarcontents == '') {
					alert('제목 또는 내용을 입력해주세요.');
				} else {
					title = $('#calendartitle').val();
					contents = $('#calendarcontents').val();
					start = $('#calendarstart').val();
					end = $('#calendarend').val();
					var endDate = new Date(calendarend);
					endDate.setDate(endDate.getDate()+1);
					var dd = endDate.getDate();
					   if(dd < 10) {  // 한자리 일 경우 두자리로 바꿔주기 위해
						      dd = '0' + dd;
						   }
				    var MM = endDate.getMonth()+1; // 0월 부터 시작해 +1을 시켜줌
				    var yyyy = endDate.getFullYear();
				    end = yyyy + '-' + MM + '-' + dd;
					$.ajax({
						type : 'POST',
						data : {
							proSeq,
							seq,
							title,
							contents,
							start,
							end
						},
						datatype : 'json',
						url : 'projectTaskUpdate',
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
									$('#title').val('');
									$('#calendartitle').val('');
									$('#contents').val('');
									$('#calendarcontents').val('');
									$('#myModal').modal('hide');
									$('#calendarModal').modal('hide');
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
				}
			});
//         alert('Event: ' + info.event.title);
//         alert('Coordinates: ' + info.jsEvent.pageX + ','
//               + info.jsEvent.pageY);
//         alert('View: ' + info.view.type);
//         alert('View: ' + info.event.allDay);
//         alert('View: ' + info.event.extendedProps.contents);
//         alert('View proSeq: ' + info.event.extendedProps.proSeq);
//         alert('View seq: ' + info.event.extendedProps.seq);
//         console.log(info);

         // change the border color just for fun
         info.el.style.borderColor = 'red';
      }
   });
   calendar.setOption('locale', 'ko'); // 한국 언어팩 사용
   calendar.render();
});