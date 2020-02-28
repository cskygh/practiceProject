$(document).ready(function() {
	toastr.options = {
		"closeButton" : true, // 닫힘 버튼 보이게(true)
		"debug" : false, // 콘솔창에 토스트 관련 메세지를 띄울 것인지?
		"newestOnTop" : false, // 새로운 팝업창을 띄울 때 위로 뜰지 말지, 위로 true, 아래로
		// false
		"progressBar" : true, // 닫히기까지의 프로그레스바 표시(true)
		"positionClass" : "toast-bottom-full-width", // 팝업창 위치
		/*
		 * Top Right Bottom Right Bottom Left Top Left Top Full Width Bottom
		 * Full Width Top Center Bottom Center
		 */
		"preventDuplicates" : false, // 중복실행 방지, false일 경우 여러번 실행 가능, true면
										// 하나만 띄운다(없어지면 다시 띄우기 가능)
		"showDuration" : 1000, // 등장에 걸리는 시간, 공식 홈에서 문자로 되어있지만 숫자로 해야 먹힌다.
		"hideDuration" : 1000, // 사라질때 걸리는 시간, 공식 홈에서 문자로 되어있지만 숫자로 해야 먹힌다.
		"timeOut" : 3000, // 자동으로 토스트가 사라지는 시간
		"extendedTimeOut" : 1000, // 토스트에 호버링 했다 땠을 때 사라지는 시간(마우스를 올렸다가 땠을
		// 때)
		"showEasing" : "swing", // 보일 때 애니메이션, swing(끝부분에 살짝 드려짐) /
		// linear(일정한 속도)
		"hideEasing" : "linear", // 사라질 때 애니메이션 swing, linear
		"showMethod" : "fadeIn", // 보일 때 효과 종류 show(그냥 보이게), fadeIn(천천히
		// 해당위치에서 등장), slideDown(위에서 아래로 펼치기)
		"hideMethod" : "fadeOut" // 사라질 때 효과 종류 hide, fadeOut(천천히 사라짐),
		// slideUp(아래에서 위로 사라짐)
	}
	
	function settingProduct(proCode) { // 상품 선택시 값 입력
		$.ajax({
			type : 'POST',
			data : {
				proCode : proCode
			},
			datatype : 'json',
			url : 'saleSelectOnePro',
			success : function(product) {
				$('#capacity').val(product.capacity);
				$('#price').val(product.buyPrice);
				$('#stock').val(product.stock);
			},
			error : function(xhr, status, error) {
				alert('ajax error');
			}
		});
	}
	
	$('#price, #qty, #total, #tax').keyup(function() {
		$(this).val($(this).val().replace(/[^0-9]/g,''));
	});
	
	$('#vendCode').on('change', function() {
		var vendCode = $(this).val()
		if (vendCode != '') {
			var today = new Date();
			var yyyy = today.getFullYear();
			var mm = today.getMonth() + 1;
			var dd = today.getDate();
			if(dd < 10){
				dd = '0'+ dd;
			}
			$.ajax({
				type : 'POST',
				data : {
					vendCode : vendCode,
					yyyy : yyyy,
					mm : mm,
					dd : dd
				},
				datatype : 'json',
				url : 'saleCheckNum',
				success : function(buy) {
					$('#yyyy').val(yyyy);
					$('#mm').val(mm);
					$('#dd').val(dd);
					$('#no').val(buy.no);
					$('#hang').val(buy.hang);
					toastr.success('거래처 내용이 변경되었습니다.');
				},
				error : function(xhr, status, error) {
					alert('ajax error');
				}
			});
		} else {
			$('#venderBuyNum :text:not([id=buyNumLabel])').val('');
		}
	});
	
	$('#proCode').on('change', function() {
		$('#qty, #total, #tax').val('');
		var proCode = $('#proCode').val();
		if(proCode != ''){
			settingProduct(proCode);
			toastr.success('상품 내용이 변경되었습니다.');
		} else {
			$('#capacity, #price, #stock').val('');
//			$('#capacity').val('');
//			$('#price').val('');
//			$('#stock').val('');
		}
	});
	
	$('#qty').keyup(function() {
		var price = $('#price').val();
		if(price == ''){
			swal({
				title : '상품을 먼저 선택해주세요!',
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
			}).then(()=> {$('#qty').val('')});
			return;
		}
		var formId = $(this).closest('form').attr('id');
		// 입력시 현재재고와 비교하지만 수정시에는 다른 방법으로 비교해야 하기 때문에
		var qty = $('#qty').val();
		var stock = Number($('#stock').val());
		var beforeQty = Number($('#beforeQty').val());
		if((qty > stock && formId == 'saleInsertForm') || (qty > stock + beforeQty && formId == 'saleUpdateForm')){ // 현재 재고보다 큰 값을 팔 수 없다.
			swal({
				title : '현재 재고보다 큰 값을 입력하셨습니다.',
				text : '현재 재고와 같거나 적은 수량을 입력해 주세요.',
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
			}).then(()=> {
				$('#qty, #total, #tax').val('');
				});
			return;
		}
		$('#total').val(price * qty);
		$('#tax').val(parseInt($('#total').val() * 0.1));
	});
	
	$('#insert-btn').on('click', function() {
		if($('#proCode').val() == '' || $('#vendCode').val() == ''){
			swal({
				title : '업체 또는 상품을 선택해주세요',
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
			}).then(function() {
				if(proCode == ''){
					$('#vendCode').focus();
				} else {
					$('#proCode').focus();
				}
			});
			return;
		} else if($('#qty').val() == '' || $('#total').val() == '' || $('#tax').val() == ''){
			swal({
				title : '매출 수량을 입력해주시기 바랍니다.',
				text : '매출수량, 금액 또는 세액이 입력되지 않았습니다.',
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
			$.ajax({
				type : 'POST',
				data : $('#saleInsertForm').serialize(),
				datatype : 'json',
				url : 'saleInsert',
				success : function(result) {
					if(result == 'y'){
						swal({
							title : '입력 성공!',
							text : '계속해서 입력하시겠습니까?',
							icon : 'success',
							closeOnClickOutside: false, // alert 창을 제외하고 클릭시 창닫히지 않게(false,
														// true면 닫힘)
							closeOnEsc: false, // esc 키 안먹히게(기본 true)
							buttons : {
								cancle : {
									text : '취소',
									value : false,
									className : 'btn btn-outline-primary'
								},
								confirm : {
									text : '계속 입력',
									value : true,
									className : 'btn btn-outline-primary'
								}
							}
						}).then(function(result) {
							if(result){
								var vendCode = $('#vendCode').val();
								var yyyy= $('#yyyy').val();
								var mm= $('#mm').val();
								var dd= $('#dd').val();
								var no = Number($('#no').val()) + 1;
								if(no < 10) {
									no = '0' + no;
								}
								var hang = Number($('#hang').val()) + 1;
								if(hang < 10) {
									hang = '0' + hang;
								}
								sessionStorage.setItem("vendCode", vendCode); // 새로고침시 값을 유지하기 위해 세션으로 값을 올린다.
								sessionStorage.setItem("yyyy", yyyy);
								sessionStorage.setItem("mm", mm);
								sessionStorage.setItem("dd", dd);
								sessionStorage.setItem("no", no);
								sessionStorage.setItem("hang", hang);
							}else{
								$('#capacity').val('');
								$('#price').val('');
								$('#stock').val('');
								$('#qty').val('');
								$('#memo').val('');
								$('#total').val('');
								$('#tax').val('');
								$('#proCode').val('').prop("selected",true);
							}
							location.reload();
						});
					} else {
						swal({
							title : '입력에 실패했습니다.',
							icon : 'error',
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
					}
				},
				error : function(xhr, status, error) {
					alert('ajax error');
				}
			});
		}
	});
	
	$(document).on('click', '#saleInsertList td',function() {
//		var body = $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().parent(); 
//		var formId = body.children().eq(0).attr('id');
		var formId = $(this).closest('div #listCard').parent().children('form').attr('id');
		// 위처럼 parent를 10개를 쓰기 이상해서 테이블 최상위 div에 아이디 하나 부여
		if(formId == 'saleInsertForm'){ 
		// 클릭시 계속해서 dom을 추가해서 if문으로 id를 체크, formId를 변경하기 때문에 한번만 실행된다. 
		var saleTable = $('#saleInsertList').dataTable();
//		var data = buyTable.fnGetData(this); // 데이터 테이블 클릭한 곳의 값 반환
		var tr = saleTable.fnGetPosition(this);
		var seq = saleTable.fnGetData(tr)[0];
		$('#listCard').remove(); // 테이블을 남기려고 했으나 그냥 삭제
		$('html').scrollTop(0); // 삭제 후 스크롤 아래있는 것을 최상단으로 이동
		$('#saleInsertForm').attr('id', 'saleUpdateForm');
		$('#title').text('매출 수정');
		$('#insert-btn').remove();
		var updateBtn = '<button type="button" id="update-btn"\
			class="btn btn-rounded btn-outline-primary top-right">\
			수정<span class="btn-icon-right"><i class="fas fa-edit"></i></span>\
				</button>';
		var deleteBtn = '<button type="button" id="delete-btn"\
			class="btn btn-rounded btn-outline-primary top-right">\
		삭제<span class="btn-icon-right"><i class="far fa-trash-alt"></i></span>\
			</button>';
		$('#cancle-btn').before(deleteBtn);
		$('#cancle-btn').after(updateBtn);
		var beforeValue = '<input type="hidden" id="seq" name="seq">\
		<input type="hidden" id="beforeProCode" name="beforeProCode">\
		<input type="hidden" id="beforePrice" name="beforePrice">\
		<input type="hidden" id="beforeQty" name="beforeQty">\
		<input type="hidden" id="beforeTax" name="beforeTax">\
		<input type="hidden" id="beforeTotal" name="beforeTotal">';
		$('#saleUpdateForm').prepend(beforeValue);
		$.ajax({
			type : 'POST',
			data : {
				seq : seq
			},
			datatype : 'json',
			url : 'saleUpdateSetting',
			success : function(sale) {
				$('#seq').val(sale.seq);
				$('#yyyy').val(sale.yyyy);
				$('#mm').val(sale.mm);
				$('#dd').val(sale.dd);
				$('#no').val(sale.no);
				$('#hang').val(sale.hang);
				$('#vendCode').val(sale.vendCode).prop({'selected': true, 'disabled': true});
				$('#proCode').val(sale.proCode).prop('selected', true);
				settingProduct(sale.proCode); // product 나머지 값 입력
				$('#beforeProCode').val(sale.proCode);
				$('#beforePrice').val(sale.price);
				$('#price').val(sale.price);
				$('#beforeQty').val(sale.qty);
				$('#qty').val(sale.qty);
				$('#beforeTax').val(sale.tax);
				$('#tax').val(sale.tax);
				$('#beforeTotal').val(sale.total);
				$('#total').val(sale.total);
				$('#memo').val(sale.memo);
				toastr.success('매출 항목을 수정해 주시기 바랍니다.');
			},
			error : function(xhr, status, error) {
				alert('ajax error');
			}
		});
		} else {
			return;
		}
	});
	
	$(document).on('click', '#delete-btn', function() {
		swal({
			title : '삭제하시겠습니까?',
			icon : 'warning',
			closeOnClickOutside: false,
			closeOnEsc: false,
			buttons : {
				cancle : {
					text : '취소',
					value : false,
					className : 'btn btn-outline-primary'
				},
				confirm : {
					text : '삭제',
					value : true,
					className : 'btn btn-outline-primary'
				}
			}
		}).then((result) => {
			if(result){
				swal({
					title : '정말 삭제하시겠습니까?',
					text : '삭제된 데이터는 복구가 불가능합니다.',
					icon : 'warning',
					closeOnClickOutside: false,
					closeOnEsc: false,
					buttons : {
						cancle : {
							text : '취소',
							value : false,
							className : 'btn btn-outline-primary'
						},
						confirm : {
							text : '삭제',
							value : true,
							className : 'btn btn-outline-primary'
						}
					}
				}).then(function(result) {
					if(result){
						$('#vendCode').prop('disabled', false); // disabled 일 경우 submit, serialize로 값이 넘어가지 않는다.
						$.ajax({
							type : 'POST',
							data : $('#saleUpdateForm').serialize(),
							datatype : 'json',
							url : 'saleDelete',
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
												className : 'btn btn-outline-primary'
											}
										}
									}).then(() => {
										location.reload(); // 삭제 완료 후 페이지 새로고침
									});
								} else {
									swal({
										title : '삭제 실패 ㅠㅠ',
										text : '새로고침 후 다시 한번 확인해 주세요.',
										icon : 'error',
										closeOnClickOutside: false,
										closeOnEsc: false,
										buttons : {
											cancle : {
												text : '확인',
												className : 'btn btn-outline-primary'
											}
										}
									});
								}
							},error : function(xhr, status, error) {
								alert('ajax error');
							}
						});
					} else {
						swal({
							title : '취소하셨습니다.',
							icon : 'info',
							closeOnClickOutside: false,
							closeOnEsc: false,
							buttons : {
								cancle : {
									text : '확인',
									className : 'btn btn-outline-primary'
								}
							}
						});
					}
					$('#vendCode').prop('disabled', true); // 취소를 했으니 다시 disabled로!
				});
			} else {
				swal({
					title : '취소하셨습니다.',
					icon : 'info',
					closeOnClickOutside: false,
					closeOnEsc: false,
					buttons : {
						cancle : {
							text : '확인',
							className : 'btn btn-outline-primary'
						}
					}
				});
			}
		});
	});
	
	$(document).on('click', '#update-btn', function() { // 수정 버튼, update
		if($('#proCode').val() == '' || $('#vendCode').val() == ''){
			swal({
				title : '업체 또는 상품을 선택해주세요',
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
			}).then(function() {
				if(proCode == ''){
					$('#vendCode').focus();
				} else {
					$('#proCode').focus();
				}
			});
			return;
		} else if($('#qty').val() == '' || $('#total').val() == '' || $('#tax').val() == ''){
			swal({
				title : '매출 수량을 입력해주시기 바랍니다.',
				text : '매출수량, 금액 또는 세액이 입력되지 않았습니다.',
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
			title : '수정하시겠습니까?',
			icon : 'warning',
			closeOnClickOutside: false,
			closeOnEsc: false,
			buttons : {
				cancle : {
					text : '취소',
					value : false,
					className : 'btn btn-outline-primary'
				},
				confirm : {
					text : '확인',
					value : true,
					className : 'btn btn-outline-primary'
				}
			}
		}).then((result) => {
			if(result) {
				swal({
					title : '정말 수정하시겠습니까?',
					text : '수정된 데이터는 복구가 불가능 합니다.',
					icon : 'warning',
					closeOnClickOutside: false,
					closeOnEsc: false,
					buttons : {
						cancle : {
							text : '취소',
							value : false,
							className : 'btn btn-outline-primary'
						},
						confirm : {
							text : '확인',
							value : true,
							className : 'btn btn-outline-primary'
						}
					}
				}).then(function(result) {
					if(result) {
						$('#vendCode').prop('disabled', false); // disabled 일 경우 submit, serialize로 값이 넘어가지 않는다.
						$.ajax({
							type : 'POST',
							data : $('#saleUpdateForm').serialize(),
							datatype : 'json',
							url : 'saleUpdate',
							success : function(updateResult) {
								if(updateResult == 'y'){
									swal({
										title : '수정 성공',
										icon : 'success',
										closeOnClickOutside: false,
										closeOnEsc: false,
										buttons : {
											cancle : {
												text : '확인',
												className : 'btn btn-outline-primary'
											}
										}
									}).then(() => {
										location.reload(); // 삭제 완료 후 페이지 새로고침
									});
								} else {
									swal({
										title : '수정 실패 ㅠㅠ',
										text : '새로고침 후 다시 한번 확인해 주세요.',
										icon : 'error',
										closeOnClickOutside: false,
										closeOnEsc: false,
										buttons : {
											cancle : {
												text : '확인',
												className : 'btn btn-outline-primary'
											}
										}
									});
								}
							},error : function(xhr, status, error) {
								alert('ajax error');
							}
						});
					} else {
						swal({
							title : '취소하셨습니다.',
							icon : 'info',
							closeOnClickOutside: false,
							closeOnEsc: false,
							buttons : {
								cancle : {
									text : '확인',
									className : 'btn btn-outline-primary'
								}
							}
						});
					}
					$('#vendCode').prop('disabled', true); // 취소를 했으니 다시 disabled로!
				});
			} else {
				swal({
					title : '취소하셨습니다.',
					icon : 'info',
					closeOnClickOutside: false,
					closeOnEsc: false,
					buttons : {
						cancle : {
							text : '확인',
							className : 'btn btn-outline-primary'
						}
					}
				});
			}
		});  
		}
	});
	
	$(document).on('click', '#cancle-btn', function() { // 취소 버튼, 새로고침
		location.reload();
	});
});

document.addEventListener('DOMContentLoaded', function() {
	$('#vendCode').val(sessionStorage.getItem('vendCode')).prop('selected', true);
	$('#yyyy').val(sessionStorage.getItem('yyyy'));
	$('#mm').val(sessionStorage.getItem('mm'));
	$('#dd').val(sessionStorage.getItem('dd'));
	$('#no').val(sessionStorage.getItem('no'));
	$('#hang').val(sessionStorage.getItem('hang'));
//	sessionStorage.removeItem("yyyy"); // key 값으로 삭제
//	sessionStorage.removeItem("mm"); // key 값으로 삭제
//	sessionStorage.removeItem("dd"); // key 값으로 삭제
//	sessionStorage.removeItem("no"); // key 값으로 삭제
//	sessionStorage.removeItem("hang"); // key 값으로 삭제
	sessionStorage.clear(); // 전체 삭제, 초기화 시켜주지 않을 경우 새로고침시에도 계속 값이 고정되어 초기화 시켜준다.
	
	$('#saleInsertList').dataTable({
		columnDefs : [ {
			width : "20%",
			targets : [ '_all' ]
		}, {
			targets : [ 0, 6 ],
			visible : false,
		}],
		order : [[0, 'desc'], [6, 'desc']], // 0번째 칼럼 즉 seq를 내림차순하고 6번째 date 항목을 내림차순
		lengthMenu : [ [ 5, 10, 25, -1 ], [ 5, 10, 25, 'all' ] ], // show
		// entries
		// 메뉴 설정(앞
		// [] 보여줄
		// 개수, 뒤 []
		// 표시할 문자)
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