$(document).ready(function() {
	var strArr = new Array();
	var code = new Array();
	var request = new XMLHttpRequest();
	$.ajax({
		type : 'GET',
		datatype : 'json',
		url : 'getNoticeLiveTitleData',
		success : function(data) {
			var i = 0;
			$.each(data, function(i, item) {
				strArr[i] = item.title;
				code[i] = item.no;
			});
			$('#noticeLiveTitle').html("<h5>" + strArr[0] + "</h5>");
			$('#noticeLiveNo').val(code[0]);
			setInterval(function() {
				i++;
				if(i == strArr.length)
					i = 0;
				$('#noticeLiveTitle').html("<h5>" + strArr[i] + "</h5>");
				$('#noticeLiveNo').val(code[i]);
			}, 5000);
			return;
		},
		error : function(xhr, status, error) {
			alert("ajax error");
		}
	});
	
	$('#noticeLiveTitle').on('click', function(){
		location.href = "noticeDetail?noCode=" + $("#noticeLiveNo").val();
	});
});