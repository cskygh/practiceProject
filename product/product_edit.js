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

function productSelectOne(code){ // 중복 사용으로 인해 펑션으로 만듬(값 조회 및 세팅)
	$.ajax({
		type : 'POST',
		data : {
			code : code
		},
		datatype : 'json',
		url : 'productSelectOne',
		success : function(product) {
			$('#name').val(product.name);
			$('#capacity').val(product.capacity);
			$('#buyPrice').val(product.buyPrice);
			$('#explanation').val(product.explanation);
			$('#preYyStock').val(product.preYyStock);
			$('#preMmStock').val(product.preMmStock);
			$('#preDdStock').val(product.preDdStock);
			$('#stock').val(product.stock);
			for(var i=1; i<=12; i++){ 
				var temp = 'buy' + i;
				var tempId = '#' + temp;
// eval("$('#" + tempBuy + "')").val(eval('product.'+tempBuy));
				$(tempId).val(product[temp]);
			}
			for(var i=1; i<=12; i++){
				var temp = 'sale' + i;
				var tempId = '#' + temp;
// eval("$('#" + tempSale + "')").val(eval('product.'+tempSale));
				$(tempId).val(product[temp]);
			}
		},
		error : function(xhr, status, error) {
			alert('ajax error');
		}
	});
	return;
}

$(document).ready(function() {
	function resetForm() { // readonly를 제외한 input 비우기
		$(':text:not("[readonly],[disabled]")').val('');
	}
	
	var inputText = $('#product_edit_form :text:not([id=name], [id=explanation])');
	// 제외할 input 폼을 제외하고 하나의 묶음으로 만듬(상품명, 상품 설명을 제외하고)
	inputText.keyup(function() {
		// 만든 묶음을 keyup 했을 경우
		$(this).val($(this).val().replace(/[^0-9]/g,'')); // 숫자만 입력되게
		var thisVar = $(this).val(); // 현재값을 변수에
		var thisLength = thisVar.length; // 현재값의 길이 가져오기
		if(thisLength > 1){ // 만약 1자리가 넘어간다면 값 확인
			var temp = thisVar.substr(0, 1); // 첫번째 자리 값 가져오기
			if(temp == '0') { // 첫번째 자리가 0이라면 0을 없애기
				thisVar = thisVar.substr(1);
				$(this).val(thisVar);
			}
		}
	});
	
	$('#code').on('change', function() {
		var code = $('#code').val();
		if(code == ''){
			resetForm();
		} else {
			productSelectOne(code);
		}
	});
	
	$('#update-btn').on('click', function() {
		var code = $('#code').val();
		if(code == ''){
			swal({
				title : '수정 상품을 선택해주세요!',
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
		} else {
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
					data : $('#product_edit_form').serialize(),
					datatype : 'json',
					url : 'productEdit',
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
					closeOnClickOutside: false, // alert 창을 제외하고 클릭시 창닫히지 않게(false, true면 닫힘)
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
	
	$('#back-btn').on('click', function() {
		window.history.back(); // 뒤로가기
	});
});

document.addEventListener('DOMContentLoaded', function() {
	var code = getUrlParam('code');
	if(code != ''){ // 상품 리스트에서 넘어올 경우 파라미터로 code가 있음
		productSelectOne(code);
	} else { // 메뉴에서 상품 수정으로 넘어올 경우 파라미터 값은 없기 때문에 아무일도 일어나지 않는다.
		return;
	}
});