$(document).ready(function() {
	
	var windowHeight = window.outerHeight;
	
	$('#noticeTableDiv').height(windowHeight - 300);
	$(window).resize(function() {
		windowHeight = window.outerHeight;
		$('#noticeTableDiv').height(windowHeight - 300);
	});
	$('#noticeTable tr').on('click', function() {
		var tr = $(this);
		var row = tr.children();
		var noCode = row.eq(0).text();
		location.href = 'noticeDetail?noCode=' + noCode;
	});
});
