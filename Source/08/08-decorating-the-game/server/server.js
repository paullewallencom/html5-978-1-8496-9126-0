// Settings
var port = 8000;

// Server code
var WebSocketServer = require('ws').Server;
var server = new WebSocketServer({ port: port });

var User = require('./game').User;
var GameRoom = require('./game').GameRoom;

var room1 = new GameRoom();

server.on('connection', function(socket) {

  var user = new User(socket);

  room1.addUser(user);

  console.log("A connection established");

});


console.log("WebSocket server is running.");
console.log("Listening to port " + port + ".");

// var ws = require(__dirname + '/lib/ws/server');
// var server = ws.createServer();

// server.addListener("connection", function(conn){
// 	// init stuff on connection
// 	console.log("A connection established with id",conn.id);
// 	var message = "Welcome "+conn.id+" joining the party. Total connection:"+server.manager.length;
// 	server.sendAll(message);

// 	// listen to the message
// 	conn.addListener("message", function(message){
// 		console.log("Got data '"+message+"' from connection "+conn.id);
// 	});
// });

// server.listen(8000);

// console.log("WebSocket server is running.");
// console.log("Listening to port 8000.");