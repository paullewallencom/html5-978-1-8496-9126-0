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

  // handle user closing
  user.socket.onclose = function(){
    console.log("A connection left.");
    room.removeUser(user);
  }
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