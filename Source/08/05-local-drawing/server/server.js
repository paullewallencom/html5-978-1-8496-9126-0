// Settings
var port = 8000;

// Server code
var WebSocketServer = require('ws').Server;
var server = new WebSocketServer({ port: port });

var User = require('./game').User;
var Room = require('./game').Room;

var room1 = new Room();

server.on('connection', function(socket) {

  var user = new User(socket);

  room1.addUser(user);

  console.log("A connection established");

  var message = "Welcome " + user.id + " joining the party. Total connection: " + room1.users.length;

  room1.sendAll(message);
});


console.log("WebSocket server is running.");
console.log("Listening to port " + port + ".");
