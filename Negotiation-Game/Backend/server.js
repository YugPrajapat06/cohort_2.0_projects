import "dotenv/config"
import app from "./src/app.js"
import connectDB from "./src/config/database.js"
import { initSocket } from "./src/sockets/server.socket.js"
import http from "http"

connectDB()

const httpServer = http.createServer(app)
initSocket(httpServer)

httpServer.listen(3000, () => {
    console.log(`Server running on port 3000`)
})