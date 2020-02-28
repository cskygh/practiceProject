function resetForm() { // readonly를 제외한 input 비우기
	$(':text:not("[readonly],[disabled]")').val('');
}

function randomCode() { // 자동코드 클릭시 동작
	var codeLength = 6; // 코드 자릿수, 한 자릿씩 랜덤으로 숫자를 생성해 문자처럼 더해준다.
	var result = true;
	while (result) { // 코드가 중복일 경우 true를 받아오고, 아닐 경우 false를 받아온다.
		var code = '';
		for(var i = 0; i<codeLength; i++){
			code += parseInt(Math.random() * 10) + '';
// console.log('i : ' + randomCode + ':: result : ' + result);
		}
		result = codeCheck(code);
	}
	return code;
}

function codeLength(inputCode) {
	var code = inputCode.value;
	var codeLength = code.length;
	if(codeLength == 6) {
		var result = codeCheck(code);
		if(result){
			swal({
				title : '중복된 코드입니다.',
				text : '다른 코드를 입력해 주세요.', 
				icon : 'error',
				closeOnClickOutside: false, // alert 창을 제외하고 클릭시 창닫히지 않게(false,
											// true면 닫힘)
				closeOnEsc: false, // esc 키 안먹히게(기본 true)
				buttons : {
					confirm : {
						text : '확인',
						calssName : 'btn btn-outline-primary' // 왜 동작이 안되지??
					}
				}
			}).then((result)=> {
				$('#code').val('');
			});
		} else {
			$('#name').focus();
		}
	}
}

function codeCheck(code) { // 코드 중복 체크
	var result = '';
	$.ajax({
		type : 'POST',
		data : {
			code : code
		},
		datatype : 'json',
		async : false,
		url : 'productCodeCheck',
		success : function(checkResult) {
			if(checkResult == 'y'){
				result = true; // 중복 코드일 경우 true 반환
			} else {
				result = false; // 고유 코드일 경우 false 반환
			}
		},
		error : function(xhr, status, error) {
			alert('ajax error');
		}
	});
	return result;
}


$(document).ready(function() {
	$('#product-add').on('click', function() {
		var code = $('#code').val();
		var name = $('#name').val();
		var capacity = $('#capacity').val();
		var buyPrice = $('#buyPrice').val();
		if(code.length != 6){
			swal({
				title : '6자리의 상품 코드를 입력해 주세요.',
				text : '현재 ' + code.length + '자리 입력했습니다.', 
				icon : 'error',
				closeOnClickOutside: false, // alert 창을 제외하고 클릭시 창닫히지 않게(false,
											// true면 닫힘)
				closeOnEsc: false, // esc 키 안먹히게(기본 true)
				buttons : {
					confirm : {
						text : '확인',
						calssName : 'btn btn-outline-primary' // 왜 동작이 안되지??
					}
				}
			});
			return;
		}
		if(name == '' || capacity == '' || buyPrice == ''){
			swal({
				title : '미입력 항목 존재',
				text : '모든 항목을 입력해 주세요!!',
				icon : 'error',
				closeOnClickOutside: false, // alert 창을 제외하고 클릭시 창닫히지 않게(false,
											// true면 닫힘)
				closeOnEsc: false, // esc 키 안먹히게(기본 true)
				buttons : {
					confirm : {
						text : '확인',
						calssName : 'btn btn-outline-primary' // 왜 동작이 안되지??
					}
				}
			});
			return;
		} else {
			$.ajax({
				type : 'POST',
				data : {
					code : code,
					name : name,
					capacity : capacity,
					buyPrice : buyPrice
				},
				datatype : 'json',
				url : 'productInsert',
				success : function(result) {
					if (result == 'y') {
						swal({
							title : '입력 성공',
							icon : 'success',
							closeOnClickOutside: false, // alert 창을 제외하고 클릭시
														// 창닫히지
							// 않게(false, true면 닫힘)
							closeOnEsc: false, // esc 키 안먹히게(기본 true)
							buttons : {
								cancle : {
									text : '확인',
									calssName : 'btn btn-outline-primary'
								}
							}
						}).then((result)=> {
							$('#code').val('');
							$('#name').val('');
							$('#capacity').val('');
							$('#buyPrice').val('');
							location.reload();
						});
					} else {
						swal({
							title : '입력 실패',
							icon : 'error',
							closeOnClickOutside: false, // alert 창을 제외하고 클릭시
														// 창닫히지
							// 않게(false, true면 닫힘)
							closeOnEsc: false, // esc 키 안먹히게(기본 true)
							buttons : {
								cancle : {
									text : '확인',
									className : 'btn btn-outline-primary'
								}
							}
						}).then((result)=> {
							location.reload();
						});
					}
				},
				error : function(xhr, status, error) {
					alert('ajax error');
				}
			});
		}
	});

	$('#product-reset').on('click', function() { // 초기화 버튼 클릭시 input text 및
													// checkbox 초기화
		resetForm();
		$('#randomCode').prop('checked', false);
		$('#code').attr('readonly', false);
		$('#code').val('');
	});

	$('#randomCode').on('click', function() { // 상품코드 자동코드로 클릭 해제 시, 클릭 시에는 값
		if ($('#randomCode').prop('checked')) { // 초기화 및 읽기 전용으로
			var code = randomCode();
			$('#code').val(code);
			$('#code').attr('readonly', true);
		} else {
			$('#code').val('');
			$('#code').attr('readonly', false);
		}
	});
	
	$('#code').keyup(function() { // 상품코드에 숫자만 입력되게(keydown으로 할 경우 마지막 글자가 살아있다.
		$('#code').val($('#code').val().replace(/[^0-9]/g,''));
	});
	
	$('#buyPrice').keyup(function() { // 단가에 숫자만 입력되게
		$('#buyPrice').val($('#buyPrice').val().replace(/[^0-9]/g,''));
	});
	
	$('#productList #edit-btn').on('click', function(){
		var code = $(this).closest('tr').children().eq(0).text();
		location.href = 'productEditFormList?code=' + code;
	});
	
	$('#productList #delete-btn').on('click', function(){
		var tr = $(this).closest('tr').children();
		var code = tr.eq(0).text();
		var name = tr.eq(1).text();
		swal({
			title : '삭제하시겠습니까?',
			text : '삭제된 데이터는 복구되지 않습니다.',
			icon : 'warning',
			closeOnClickOutside: false, // alert 창을 제외하고 클릭시
										// 창닫히지
			// 않게(false, true면 닫힘)
			closeOnEsc: false, // esc 키 안먹히게(기본 true)
			buttons : {
				cancle : {
					text : '취소',
					value : false,
					calssName : 'btn btn-outline-primary'
				},
				confirm : {
					text : '삭제',
					value : true,
					calssName : 'btn btn-outline-primary'
				}
			}
		}).then((result)=> {
			if(result){
				swal({
					title : '정말로 삭제하시겠습니까?',
					text : '코드명 : ' + code + '상품명 : ' + name + '이 삭제됩니다.',
					icon : 'warning',
					closeOnClickOutside: false,
					closeOnEsc: false,
					buttons : {
						cancle : {
							text : '취소',
							value : false,
							calssName : 'btn btn-outline-primary'
						},
						confirm : {
							text : '삭제',
							value : true,
							calssName : 'btn btn-outline-primary'
						}
					}
				}).then((result)=> {
					if(result){
						$.ajax({
							type : 'POST',
							data : {
								code : code
							},
							datatype : 'json',
							url : 'productDelete',
							success : function(deleteResult) {
								if(deleteResult == 'y'){
									swal({
										title : '삭제 성공',
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
								alert('ajax error');
							}
						});
					} else {
						swal({
							title : '삭제가 취소 되었습니다.',
							icon : 'info',
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
				});
			} else {
				swal({
					title : '삭제가 취소 되었습니다.',
					icon : 'info',
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
		});
	});
});

document.addEventListener('DOMContentLoaded', function() { // 그린 후 수정을 해야 정상적으로 변경이 되어서 ready가 아닌 addenvent로 사용
	$('#productList').dataTable({
 		columnDefs : [{width: "20%", targets : ['_all'] },
 			{orderable : false, targets : [4]} // 자동정렬하지 못하게(상단)
		],
		lengthMenu : [[5, 10, 25, -1], [5, 10, 25, 'all']], // show entries 메뉴 설정(앞 [] 보여줄 개수, 뒤 [] 표시할 문자)
		pageLength : 5, // 기본 보여줄 row 개수 설정, 메뉴와 일치할 경우 메뉴가 자동으로 세팅된다.
		language : {
			info : '총  _TOTAL_ 개의 행 중 _START_ 행 부터 _END_ 행 까지',
			infoEmpty : '데이터가 없습니다.',
			emptyTable : '데이터가 없습니다.',
			thousands : ',',
			lengthMenu : '총 _MENU_ 행씩 보기',
			loadingRecords : '열심히 불러오는 중',
			processing : '열심히 동작 중',
			zeroRecords : '검색 결과 없음',
			paginate : {
		        first : '처음',
		        last : '끝',
		        next : '다음',
		        previous : '이전'
			},
			search : '검색 ->'
	    }
	});
});
