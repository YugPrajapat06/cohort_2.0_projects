import "dotenv/config"
import app from "./src/app.js";
import connectToDb from "./config/database.js"
import { initSocket } from "./src/sockets/server.socket.js";
import http from "http";


const httpServer = http.createServer(app)
initSocket(httpServer)

connectToDb()

httpServer.listen(3000, () => {
    console.log("Server is running on port no 3000");
})