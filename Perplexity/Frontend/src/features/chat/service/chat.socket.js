import {io} from "socket.io-client"
import { store } from "../../../app/app.store.js";
import { addNewMessage, setLoading } from "../chat.slice.js";

let socket = null;

export const initializeSocketConnection = () => {
    if (socket) {
        console.log("Socket already connected");
        return socket;
    }

    socket = io("http://localhost:3000", {
        withCredentials: true
    })

    socket.on("connect", () => {
        console.log("Connected to socket.io server");
    })

    // Listen for incoming messages from server
    socket.on("message", (data) => {
        console.log("Received message from socket:", data);
        const { chatId, content, role } = data;
        
        if (chatId && content) {
            store.dispatch(addNewMessage({
                chatId,
                content,
                role: role || "assistant"
            }))
        }
    })

    socket.on("error", (error) => {
        console.error("Socket error:", error);
    })

    socket.on("disconnect", () => {
        console.log("Disconnected from socket.io server");
    })

    return socket;
}