import { Server, Socket } from "socket.io"

let io;

export function initSocket(httpServer) {
    io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true
        }
    })
    console.log("Socket.io server is Running")

    io.on("connection", (Socket) => {
        console.log("A user connected : " + Socket.id);

    })

}
export function getId() {
    if (!io){
        console.log("Socket.io is not initialize yet.");
        
    }
    return io;
}