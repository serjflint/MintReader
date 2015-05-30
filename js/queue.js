$(function(){

	var docQueue = [];
	var selectedDoc = '';
	var gui = require('nw.gui');
	var win = gui.Window.get();

	var ul = $('.flipster ul');

	function getDocQueue() {		

		if (localStorage["docQueue"] !== undefined){
			docQueue = JSON.parse(localStorage["docQueue"]);
			for (var i = 0; i < docQueue.length; i++){
				var li = $('<li><a target="_self"><img /></a></li>');

				var path = docQueue[i];
				var reg=/^.*(\\|\/)(.*?)$/; 
        var result = reg.exec(path);
        var name = RegExp.$2;

				li.find('a')
					.attr('href', '../html/read.html')
					.data('path', path)
					.attr('data-path', path)
					.append(name);

				li.find('img').attr('src', '../sources/book.png');

				li.appendTo(ul);
			}
		}
		else{
			var li = $('<li><a target="_self"><img /></a></li>');

			li.find('a')
				.attr('href', '../html/read.html')
				.append('');

			li.find('img').attr('src', '../sources/empty.png');

			li.appendTo(ul);
		}

		$('.flipster').flipster({
			style: 'coverflow',
			start: 0
		});
	}

	getDocQueue();

	$('.flipster').on('click', 'a', function (e) {
		localStorage['curDoc'] = $( this ).data('path');  	
	});

	$(document).bind('keyup', 'F11', function(){
			win.toggleFullscreen();
	});

	$(".header").hover(function(){
		$(".header").css({top: '0vh'});
	}, function(){
		$(".header").css({top: '-5vh'});
	});

});