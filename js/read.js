var gui = require('nw.gui');
var win = gui.Window.get();
var file = require('file.js');
var key = "trnsl.1.1.20150521T155207Z.9b72e49482832200.59568a83bbdc5417553499b72d5ff8d0f3cfdd8c";
var translate = require('yandex-translate')(key);

$(function(){

	function addDocToQueue(path) {
		var docQueue = [];
		if (localStorage["docQueue"] !== undefined){
			docQueue = JSON.parse(localStorage["docQueue"]);
		}		
		if ($.inArray(path, docQueue) == -1) {
			while(docQueue.length > 9){
				docQueue.shift();
			}

			docQueue.push(path);
			localStorage["docQueue"] = JSON.stringify(docQueue);
		}		
	}

	function txtToHTML(text) {
		var result;
		if (text.indexOf("<br>") == -1) {
			result = '<p>' + text.replace(/(?:\r\n|\r|\n)/g, '</p><p>') + '</p>';
		}
		else {
			result = text;
		}
		return result;
	}

	// function fb2ToHTML(text) {
	// 	var xml = $(text);
	// 	var result = xml[2].innerHTML;
	// 	var img = document.createElement('img');
	// 	var bin = xml.find('binary')[0].innerText;
	// 	console.log(bin.replace(/(?:\r\n|\r|\n)/g, ''));
	// 	//	console.log(xml.find('binary').innerText().replace('\n', ''));
	// 	img.src = 'data:image/jpeg;base64,' + btoa(bin);
	// 	document.body.appendChild(img);
	// 	return result;
	// }

	function openFile(object, path, document) {
		var text = file.open(path);
		if (text !== undefined) {	
			$(object).html(txtToHTML(text));
			document.title = file.getName(path);
			localStorage['curDoc'] = path;
		}
		else {
			alert('Документ не выбран или выбран не верно.');
		}
	}

	function chooseFile(name) {
		var chooser = $(name);
		chooser.change(function(evt) {
			var curDoc = $(this).val();
			addDocToQueue(curDoc);
			openFile('#reader', this.value, document);
		});
		chooser.trigger('click');  
	}

	$(document).bind('keyup', 'ctrl+o', function(){
			chooseFile('#open'); 
	});

    $(document).bind('keyup', 'ctrl+t', function(){
        var selectedText = window.getSelection();
        translate.translate(selectedText, { to: 'ru' }, function(err, res) {
            console.log(res.text);
            alert(res.text);
        });
    });

	$(".header").hover(function(){
		$(".header").css({top: '0vh'});
	}, function(){
		$(".header").css({top: '-5vh'});
	});

	if(localStorage['curDoc'] !== undefined) {
		openFile('#reader', localStorage['curDoc'], document);
	}
	else {
		chooseFile('#open');		
		console.log($('#open').files);
	}

	$(document).bind('keyup', 'F11', function(){
			win.toggleFullscreen();
	});

});
