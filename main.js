//requiring downloaded libraries/modules

var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
const{userJoining, userLeaving} = require('./public/js/users'); //importing funtion from users.js that will add and remove users

//connection event. This is fired whenever the user logs onto the app.
app.get('/', (req, res)=>{ //main url will be chats.html page, server sends chats page
    res.sendFile(__dirname + "/public/chats.html");
});

//store chat name
let chatRoom = "";
io.on("connection", function(socket){
    console.log("connected");
    socket.on("join room", (data) => {
        console.log('in room');
        let Newuser = userJoining(socket.id, data.username,data.roomName)
        
       socket.emit('send data' , {id : socket.id ,username:Newuser.username, roomname : Newuser.roomname });
       
        chatRoom = Newuser.roomname;
        console.log(Newuser);
        socket.join(Newuser.roomname);
      });
      socket.on("chat message", (data) => {
        io.to(chatRoom).emit("chat message", {data:data,id : socket.id});
      });
      socket.on("disconnect", () => {
        const user = userLeaving(socket.id);
        console.log(user);
        if(user) {
          console.log(user.username + ' has left');
        }
        console.log("disconnected");
    
      });
    });
    

http.listen(3000, function () {});

