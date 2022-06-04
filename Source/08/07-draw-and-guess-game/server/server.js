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
