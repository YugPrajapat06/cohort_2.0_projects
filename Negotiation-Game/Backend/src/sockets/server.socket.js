import {Server} from "socket.io"

let io;

export function initSocket(httpServer) {
    io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true
        }
    });
    console.log("Socket.io Server is running");

    io.on("connection", (socket) => {
        console.log("New client connected" + socket.id);
    });

    
}
export function getId(){
    if(!io){
        console.log("Socket.io is not connected yet");
    }
    return io
}