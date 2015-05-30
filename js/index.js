var gui = require('nw.gui');
var win = gui.Window.get();

$(function(){

	// Node webkit's native UI library. We will need it for later



	$('.flipster').flipster({
		style: 'carousel'
	});

	$('#openLink').on('click', function() {
		localStorage.removeItem("curDoc");
	})

	$(document).bind('keyup', 'F11', function(){
			win.toggleFullscreen();
	});

	$(".header").hover(function(){
		$(".header").css({top: '0vh'});
	}, function(){
		$(".header").css({top: '-5vh'});
	});

	//localStorage.removeItem("docQueue");//delete queue

});