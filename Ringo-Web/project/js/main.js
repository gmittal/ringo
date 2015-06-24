//setup before functions
var typingTimer;                //timer identifier
var doneTypingInterval = 1000;  //time in ms, 5 second for example

// VERY TERMPORARY
var project_id = "JsXa3C3BxIPUomUwLk5"; //prompt("Type your Ringo Project ID");
var files = [];

var currentFile = "";

loadFiles(); // load the file menu

// need to come up with a better way of asking for project ID


//on keyup, start the countdown
$('#editor').keyup(function(){
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
});

//on keydown, clear the countdown 
$('#editor').keydown(function(){
    clearTimeout(typingTimer);
});

$("#statusTime").text(moment().calendar());

// var contentType ="application/x-www-form-urlencoded; charset=utf-8";

//user is "finished typing," do something
function doneTyping () {
    var code = editor.getValue();



}


function loadFiles() {
	$.ajax({
		type: 'POST',
		url: 'http://66737bb1.ngrok.io/get-project-contents',
		data: {"id": project_id},
		error: function (err) {
			console.log(err);
		},
		success: function (data) {
			console.log(data);
			data.files.shift();

			files = data.files;


			for (var i = 0; i < data.files.length; i++) {

				console.log(data.files[i].name);

				$("#fileMenu").append('<div name="'+ data.files[i].name +'" onclick=\"javascript: currentFile = $(this).attr(\'name\'); $(\'#fileMenu div\').css({\'background-color\': \'transparent\', \'font-weight\': \'normal\', \'color\': \'black\'}); $(this).css({\'background-color\': \'rgb(14, 101, 227)\', \'font-weight\':\'bold\', \'color\':\'white\'}); updateEditor();\">'+start_and_end(data.files[i].name) + '</div>');
			}

			editor.setValue(files[0].data);
			currentFile = files[0].name;



		},
		dataType: "json"
	});

}



// run the app on the iOS simulator
$("#runButton").click(function() {
	$("#statusValue").html('<img src="img/loading.gif" />&nbsp;&nbsp;Building');
	$("#outputArea").html('<center>Building your application...</center>');

	$.ajax({
		type: 'POST',
		url: 'http://66737bb1.ngrok.io/build-project',
		data: {"id": project_id},
		error: function (err) {
			console.log(err);
		}, 
		success: function (data) {
			console.log(data);

			$("#statusValue").text("Ready");
		  	$("#statusTime").text(moment().calendar());

			$("#outputArea").html("<center>"+ data.fullDeviceEmbedCode +"</center>");


		},
		dataType: "json"
	});


});


$("#fileMenu").click(function() {
	console.log(currentFile);

	console.log($(this).attr("name"));



});

function updateEditor() {
	for (var j = 0; j < files.length; j++) {
		if (files[j].name == currentFile) {
			editor.setValue(files[j].data);
		}
	}
}

// Truncating strings, but Mac style
function start_and_end(str) {
  if (str.length > 20) {
    return str.substr(0, 10) + '...' + str.substr(str.length-7, str.length);
  }
  return str;
}






