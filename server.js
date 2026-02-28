const express=require("express")
const ACTIONS=require("./src/Actions")
const app=express()
const http=require("http")
const {Server}=require("socket.io")
const server=http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // if using CRA
        methods: ["GET", "POST"],
    },
});
const userSocketMap={}
function getAllConnectedClients(roomId) {
    // Map
     //type is map->gets all the rooms - if not retirn an empty array
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
        (socketId) => {
            return {
                socketId,
                username: userSocketMap[socketId],
            };
        }
    );
}
io.on('connection',(socket)=>{
    console.log("socket connected",socket.id) 
    socket.on(ACTIONS.JOIN,({roomId,username})=>{//this roomid and username comes from the emitted socket from editorpage
    userSocketMap[socket.id]=username; //mapping each unique socket to the username
    socket.join(roomId) //making a new room named w the socket id, also if it exists then it just adds to the existing socket and if the id doesnt exist it creates the socket //*also this socket.id is from the client that wants to join
    //we nned to notify users when a new user joins in 
    const clients=getAllConnectedClients(roomId);
    console.log(clients) //emitting to all the clients present in the room
            io.to(socket.id).emit(ACTIONS.JOINED, {
                clients, 
                username,
                socketId: socket.id,
            });
        }); //now the ui in the editorpage will be updated(all old members in the room will be notified about the newly joined member)
      socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => { //this code change os from the client to the server
        socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code }); //emiiting the code to the client from the server ->gokmg to the editor
    });
       socket.on('disconnecting', () => { //another event->if someone closes the browser or goes to another page
        const rooms = [...socket.rooms]; //getting all the rooms
        rooms.forEach((roomId) => { //for each room
            socket.in(roomId).emit(ACTIONS.DISCONNECTED, { //notify insode the room
                socketId: socket.id,
                username: userSocketMap[socket.id], //broadcasting that user w username and id has been disconnected
            });
        }); //deleting the disconnected user from the map //*now moving on to the ui changes
        socket.leave();
    });
 
    })
   

  
const PORT=process.env.PORT||5000
server.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})