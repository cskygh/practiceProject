function getUrlParam(param) { // get 방식 url 파라미터 값 가져오기
	var result = '';
	var params = location.search.substr(location.search.indexOf('?')+1); // '?'
																			// 다음부터
																			// 끝까지
																			// 자르기(substr)
	var arrParams = params.split('&'); // url 파라미터가 2개 이상일 경우 나눠서 배열에 저장(복수
										// 파라미터 일 경우는 &으로 연결하니)
	for(var i = 0; i < arrParams.length; i++){
		var tempParam = arrParams[i].split('='); // 이제 다시 한번 파라미터 변수 명과 값을
													// 나눠준다.
		if(tempParam[0] == param){ // 원하는 파라미터 명이라면
			result = tempParam[1]; // 값을 결과에 넣는다.
		}
	}
	return result;
}

function venderSelectOne(code){ // 중복 사용으로 인해 펑션으로 만듬(값 조회 및 세팅)
	$.ajax({
		type : 'POST',
		data : {
			code : code
		},
		datatype : 'json',
		url : 'venderSelectOne',
		success : function(vender) {
			$('#name').val(vender.name);
			$('#bizNo').val(vender.bizNo);
			$('#ceoName').val(vender.ceoName);
			$('#zipCode').val(vender.zipCode);
			$('#addr').val(vender.addr);
			$('#detailAddr').val(vender.detailAddr);
			$('#officeNo').val(vender.officeNo);
			$('#managerName').val(vender.managerName);
			$('#managerNo').val(vender.managerNo);
			$('#bizCondition').val(vender.bizCondition);
			$('#bizType').val(vender.bizType);
		},
		error : function(xhr, status, error) {
			alert('ajax error');
		}
	});
	return;
}

$(document).ready(function() {
	function resetForm() { // readonly를 제외한 input 비우기
		$(':text:not("[disabled]")').val('');
	}
	
	var inputText = $('#vender_edit_form :text:not([id=name], [id=ceoName], [id=bizCondition], [id=bizType], [id=managerName], [id=addr], [id=detailAddr])');
	// 제외할 input 폼을 제외하고 하나의 묶음으로 만듬
	inputText.keyup(function() {
		// 만든 묶음을 keyup 했을 경우
		$(this).val($(this).val().replace(/[^0-9]/g,'')); // 숫자만 입력되게
	});
	
	$('#code').on('change', function() {
		var code = $('#code').val();
		if(code == ''){
			resetForm();
			$('#findZipCode').attr('disabled', true); // 우편번호 검색 비활성화
		} else {
			venderSelectOne(code);
			$('#findZipCode').attr('disabled', false); // 우편번호 검색 활성화
		}
	});
	
	$('#update-btn').on('click', function() {
		var code = $('#code').val();
		var bizNo = $('#bizNo').val();
		if(code == ''){
			swal({
				title : '수정 업체를 선택해주세요!',
				icon : 'warning',
				closeOnClickOutside: false, // alert 창을 제외하고 클릭시 창닫히지 않게(false,
											// true면 닫힘)
				closeOnEsc: false, // esc 키 안먹히게(기본 true)
				buttons : {
					confirm : {
						text : '확인',
						className : 'btn btn-outline-primary'
					}
				}
			});
			return;
		}
		if(bizNo.length != 10){
			swal({
			title : '10자리의 사업자 번호를 입력해 주세요.',
			text : '현재 ' + bizNo.length + '자리 입력했습니다.', 
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
			}).then(function() {
				$('#bizNo').focus();
			});
			return;
		}else {
			swal({
			title : '수정!',
			text : '수정하시겠습니까?',
			icon : 'info',
			closeOnClickOutside: false, // alert 창을 제외하고 클릭시 창닫히지 않게(false,
										// true면 닫힘)
			closeOnEsc: false, // esc 키 안먹히게(기본 true)
			buttons : {
				cancle : {
					text : '취소',
					value : false,
					className : 'btn btn-outline-primary' // 클래스 이름을 줄 수도
															// 있다.
					},
				confirm : {
					text : '수정',
					value : true,
					className : 'btn btn-outline-primary'
				}
			}
		}).then((result) => {
			if(result){
				$.ajax({
					type : 'POST',
					data : $('#vender_edit_form').serialize(),
					datatype : 'json',
					url : 'venderEdit',
					success : function(result) {
						if(result =='y'){
							swal({
								title : '수정 완료',
								text : '계속해서 수정하시겠습니까?',
								icon : 'success',
								closeOnClickOutside: false, // alert 창을 제외하고 클릭시
															// 창닫히지 않게(false,
															// true면 닫힘)
								closeOnEsc: false, // esc 키 안먹히게(기본 true)
								buttons : {
									cancle : {
										text : '목록으로',
										value : false,
										className : 'btn btn-outline-primary' // 클래스
																				// 이름을
																				// 줄 수도
																				// 있다.
										},
									confirm : {
										text : '머물기',
										value : true,
										className : 'btn btn-outline-primary'
									}
								}
							}).then((result) => {
								if(result){
									location.reload();
								} else {
									location.href = 'productList';
								}
							});
						} else {
							swal({
								title : '수정 실패',
								icon : 'error',
								closeOnClickOutside: false, // alert 창을 제외하고 클릭시
															// 창닫히지 않게(false,
															// true면 닫힘)
								closeOnEsc: false, // esc 키 안먹히게(기본 true)
								buttons : {
									confirm : {
										text : '확인',
										className : 'btn btn-outline-primary'
									}
								}
							});
						}
					},
					error : function(xhr, status, error) {
						swal({
							title : '수정 실패',
							icon : 'error',
							closeOnClickOutside: false, // alert 창을 제외하고 클릭시
														// 창닫히지 않게(false,
														// true면 닫힘)
							closeOnEsc: false, // esc 키 안먹히게(기본 true)
							buttons : {
								confirm : {
									text : '확인',
									className : 'btn btn-outline-primary'
								}
							}
						});
					}
				});
			} else {
				swal({
					title : '주의',
					text : '수정하지 않은 데이터는 사라집니다.',
					icon : 'warning',
					closeOnClickOutside: false, // alert 창을 제외하고 클릭시 창닫히지
												// 않게(false, true면 닫힘)
					closeOnEsc: false, // esc 키 안먹히게(기본 true)
					buttons : {
						confirm : {
							text : '확인',
							className : 'btn btn-outline-primary'
						}
					}
				});
			}
		});
		}
	});
	
	$('#findZipCode').on('click', function() { // 우편번호 검색
        new daum.Postcode({
            oncomplete: function(data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var addr = ''; // 주소 변수
                var extraAddr = ''; // 참고항목 변수

                // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    addr = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    addr = data.jibunAddress;
                }

                // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                if(data.userSelectedType === 'R'){
                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if(extraAddr !== ''){
                        extraAddr = ' (' + extraAddr + ')';
                    }
                }
                addr += extraAddr;
                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                $('#zipCode').val(data.zonecode);
                $('#addr').val(addr);
                // 커서를 상세주소 필드로 이동한다.
                $('#detailAddr').focus();
            }
        }).open();
	});
	
	$('#back-btn').on('click', function() {
		window.history.back(); // 뒤로가기
	});
});

document.addEventListener('DOMContentLoaded', function() {
	var code = getUrlParam('code');
	if(code != ''){ // 업체 리스트에서 넘어올 경우 파라미터로 code가 있음
		venderSelectOne(code);
		$('#findZipCode').attr('disabled', false);
	} else { // 메뉴에서 수정으로 넘어올 경우 파라미터 값은 없기 때문에 아무일도 일어나지 않는다.
		return;
	}
});