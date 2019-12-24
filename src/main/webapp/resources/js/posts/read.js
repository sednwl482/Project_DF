var url = window.location.pathname;
url = url.split('/');
console.log(url);
var id = url[url.length - 1];

// 게시물 불러오기
$.ajax({
	url : '/post/read/' + id,
	type : 'get',
	dataType : "json",
	success : function(response) {
		console.log(response);
		$("#title").val(response.title);
		$("#id").val(response.id);
		$("#writer").val(response.writer);
		$("#content").append(response.content);
		$("#modifyDate").val(response.modifyDate);
	},
	fail : function(error) {
		alert('???');
	},
	always : function(response) {
		console.log("call always()");
	}
});

$.ajax({
	url : '/comment/' + id,
	type : 'get',
	dataType : "json",
	success : function(response) {
		console.log(response);

		for (var i = 0; i < response.length; i++) {
			$("table").append(
					'<tr>' + '<td width="10%">' + response[i].id + '</td>' + '<td width="10%">'
							+ response[i].writer + '</td>' + '<td width="10%">'
							+ response[i].writeDate + '</td>' + '<td width="50%">'
							+ response[i].content + '</td>' 
							+ '<td width="15%">' + '<a href="/comment/delete/'+response.id 
							+'"class="btn btn-red">'+'삭제'+'</a>' +'</td>'
							+ '</tr>');
		}
	}

});
