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
    socket.join(roomId) //making a new room named w the socket id, also if it exists then it just adds to the existing socket and if the id doesnt exist it creates the socket
    //we nned to notify users when a new user joins in 
    const clients=getAllConnectedClients(roomId);
    console.log(clients)
   
    })
})
const PORT=process.env.PORT||5000
server.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})