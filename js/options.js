var file = require('file.js');
var gui = require('nw.gui');
var win = gui.Window.get();

$(function(){

	function openFile(object, path, document) {
		$(object).val(file.open(path));
	}

	function saveFile(object, path, document) {
		var text = $(object).val();
		file.save(path, text);
	}

	$("#save-btn").on('click', function() {
		saveFile('#editCSS', './css/text-styles/text.css', document);
		saveFile('#editCSS', './css/text-styles/option-text.css', document);
		location.reload();
	})

	$("#apply-btn").on('click', function() {
		saveFile('#editCSS', './css/text-styles/option-text.css', document);
		location.reload();
	})

	$("#default-btn").on('click', function() {
		openFile('#editCSS', './css/text-styles/text-default.css', document);
		saveFile('#editCSS', './css/text-styles/option-text.css', document);
		location.reload();
	})

	$('#reader').html(file.open('./css/text-styles/example.txt'));//open example

	openFile('#editCSS', './css/text-styles/option-text.css', document);//load config

	$(document).bind('keyup', 'F11', function(){
			win.toggleFullscreen();
	});

});
