// Constants
var LINE_SEGMENT = 0;
var CHAT_MESSAGE = 1;

function User(socket) {
  this.socket = socket;

  // assign a random number to User. Long enough to make duplication chance less.
  this.id = "1" + Math.floor( Math.random() * 1000000000);

}

function Room() {
  this.users = [];

}
Room.prototype.addUser = function(user){
  this.users.push(user);

  var room = this;

  // tell others that someone joins the room
  var data = {
    dataType: CHAT_MESSAGE,
    sender: "Server",
    message: "Welcome " + user.id + " joining the party. Total connection: " + this.users.length
  };
  this.sendAll(JSON.stringify(data));

  this.handleOnUserMessage(user);

  // handle user closing
  user.socket.onclose = function(){
    console.log("A connection left.");
    room.removeUser(user);
  }
};
Room.prototype.handleOnUserMessage = function(user) {
  var room = this;

  // handle on message
  user.socket.on("message", function(message){
    console.log("Receive message from " + user.id + ": " + message);

    // construct the message
    var data = JSON.parse(message);
    if (data.dataType === CHAT_MESSAGE) {
      // add the sender information into the message data object.
      data.sender = user.id;
    }

    // send to all clients in room.
    room.sendAll(JSON.stringify(data));
  });
};
Room.prototype.removeUser = function(user) {
  // loop to find the user
  for (var i=this.users.length; i >= 0; i--) {
    if (this.users[i] === user) {
      this.users.splice(i, 1);
    }
  }
};
Room.prototype.sendAll = function(message) {
  for (var i=0, len=this.users.length; i<len; i++) {
    this.users[i].socket.send(message);
  }
};


module.exports.User = User;
module.exports.Room = Room;