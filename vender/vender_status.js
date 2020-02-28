$(document).ready(function() {
});


document.addEventListener('DOMContentLoaded', function() { // 그린 후 수정을 해야 정상적으로 변경이 되어서 ready가 아닌 addenvent로 사용
	$('#venderStatus').dataTable({
 		columnDefs : [{width: "15%", targets : [0, 1] },
 			{width: "5.38%", targets : '_all' },
 			{orderable : false, targets : [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]} // 자동정렬하지 못하게(상단)
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