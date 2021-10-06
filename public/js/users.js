//function that take userID, username, and the roomname they are joining
//array that keep track of who joins
let users = [] ;
function userJoining(socketId, userName, roomName){
    //Create an object that contains user info
    const user=
    {id:socketId,
    username:userName,
    roomname: roomName
    }
    users.push(user)
    return user;
}
// function findUser(id) {
//     return users.find((user)=>{
//       user.id === id;
//     })
//   }

//If the element was found (index is not 0), 
//then delete the element in the array and return this deleted element(to show who left).
//

function userLeaving(id){
    const getID = users => users.socketID === id;
    const index =  users.findIndex(getID);
    if (index !== -1) {
        return users.splice(index, 1)[0];
  }
}

// export any literal, function or object as a module. 
//It is used to include JavaScript file into node. js applications
//exporting the
module.exports ={ userJoining, userLeaving}


