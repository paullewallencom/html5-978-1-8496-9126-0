var websocketGame = {
	// Contants
	LINE_SEGMENT : 0,
	CHAT_MESSAGE : 1,

	// indictes if it is drawing now.
	isDrawing : false,

	// the starting point of next line drawing.
	startX : 0,
	startY : 0,
}

// canvas context
var canvas = document.getElementById('drawing-pad');
var ctx = canvas.getContext('2d');

// init script when the DOM is ready.
$(function(){
	// check if existence of WebSockets in browser
	if (window["WebSocket"]) {

		// create connection
		websocketGame.socket = new WebSocket("ws://localhost:8000");

		// on open event
		websocketGame.socket.onopen = function(e) {
			console.log('WebSocket connection established.');
		};

		// on message event
		websocketGame.socket.onmessage = function(e) {
			// check if the received data is chat message or line segment
			console.log("onmessage event:",e.data);
			var data = JSON.parse(e.data);
			if (data.dataType === websocketGame.CHAT_MESSAGE)
			{
				$("#chat-history").append("<li>"+data.sender+" said: "+data.message+"</li>");
			}
			else if (data.dataType === websocketGame.LINE_SEGMENT)
			{
				drawLine(ctx, data.startX, data.startY, data.endX, data.endY, 1);
			}

		};

		// on close event
		websocketGame.socket.onclose = function(e) {
			console.log('WebSocket connection closed.');
		};
	}

	$("#send").click(sendMessage);

	$("#chat-input").keypress(function(event) {
		if (event.keyCode === 13) {
			sendMessage();
		}
	});


	// the logic of drawing on canvas
	$("#drawing-pad").mousedown(function(e) {
		// get the mouse x and y reltaive to the canvas top-left point.
  	var mouseX = e.originalEvent.layerX || e.offsetX || 0;
  	var mouseY = e.originalEvent.layerY || e.offsetY || 0;

		websocketGame.startX = mouseX;
		websocketGame.startY = mouseY;

		websocketGame.isDrawing = true;
  });

  // we draw lines when the mouse is pressing
  $("#drawing-pad").mousemove(function(e) {
		// draw lines when is drawing
  	if (websocketGame.isDrawing) {
			// get the mouse x and y reltaive to the canvas top-left point.
    	var mouseX = e.originalEvent.layerX || e.offsetX || 0;
  		var mouseY = e.originalEvent.layerY || e.offsetY || 0;

			if (!(mouseX == websocketGame.startX && mouseY == websocketGame.startY))
			{
				drawLine(ctx,websocketGame.startX,websocketGame.startY,mouseX,mouseY,1);

				// send the line segment to server
				var data = {};
				data.dataType = websocketGame.LINE_SEGMENT;
				data.startX = websocketGame.startX;
				data.startY = websocketGame.startY;
				data.endX = mouseX;
				data.endY = mouseY;
				websocketGame.socket.send(JSON.stringify(data));

				websocketGame.startX = mouseX;
				websocketGame.startY = mouseY;
			}

		}
  });

  // We clear the drawing state when mouse up.
  $("#drawing-pad").mouseup(function(e) {
		websocketGame.isDrawing = false;
  });

});

function drawLine(ctx, x1, y1, x2, y2, thickness) {
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.lineWidth = thickness;
	ctx.strokeStyle = "#444";
	ctx.stroke();
}

function sendMessage()
{
	var message = $("#chat-input").val();

	// pack the message into an object.
	var data = {};
	data.dataType = websocketGame.CHAT_MESSAGE;
	data.message = message;

	websocketGame.socket.send(JSON.stringify(data));
	$("#chat-input").val("");
}
