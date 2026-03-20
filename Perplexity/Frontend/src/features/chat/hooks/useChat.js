import { initializeSocketConnection } from "../service/chat.socket.js";
import { sendMessage, getChats, getMessages, deleteChat } from "../service/chat.api.js";
import { createChat, addNewMessage, addMessages, setCurrentChat, setChats, setLoading, setError } from "../chat.slice.js";
import { useDispatch } from "react-redux";
import { store } from "../../../app/app.store.js";

export function useChat() {

    const dispatch = useDispatch();

    async function handleSendMessage({ message, chatId }) {
        try {
            dispatch(setLoading(true));
            const data = await sendMessage({ message, chatId });
            const { chat, aiMessage } = data
  
            // Determine the actual chat ID to use
            const actualChatId = chat?._id || chatId;
            
            // For new chats, create the chat object in state
            if (!chatId) {
                if (!chat?._id || !chat?.title) {
                    throw new Error("Invalid chat data from server");
                }
                dispatch(createChat({
                    chatId: chat._id,
                    title: chat.title
                }))
            }
            
            // Ensure chat exists in state before adding messages
            const currentState = store.getState();
            if (!currentState.chat.chats[actualChatId]) {
                console.error(`Chat ${actualChatId} does not exist in Redux state`);
                dispatch(setError("Chat not found in state"));
                return;
            }
            
            // Set current chat
            dispatch(setCurrentChat(actualChatId))
            
            // Add user message
            dispatch(addNewMessage({
                chatId: actualChatId,
                content: message,
                role: "user"
            }))
            
            // Add AI response message
            if (aiMessage?.content) {
                dispatch(addNewMessage({
                    chatId: actualChatId,
                    content: aiMessage.content,
                    role: aiMessage.role
                }))
            }
            
        } catch (error) {
            console.error("Error sending message:", error);
            dispatch(setError(error.response?.data?.message || "Failed to send message"));
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleGetChats() {
        try {
            dispatch(setLoading(true));
            const data = await getChats();
            const { chats } = data;
            dispatch(setChats(chats.reduce((acc, chat) => {
                acc[chat._id] = {
                    id: chat._id,
                    title: chat.title,
                    messages: [],
                    lastUpdated: chat.lastUpdated
                }
                return acc
            }, {})));

        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Failed to fetch chats"));
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleOpenChat(currentChatId, chats) {
        // console.log(currentChatId,chats)
        console.log("INSIDE handleOpenChat:", currentChatId)
        try {
            if (chats[currentChatId]?.messages.length === 0) {
                dispatch(setLoading(true))
                const data = await getMessages({ chatId: currentChatId });
                const { messages } = data;
                const formatedMessage = messages.map(msg => ({
                    content: msg.content,
                    role: msg.role
                }))

                dispatch(addMessages({
                    chatId: currentChatId,
                    messages: formatedMessage
                }))
            }
            dispatch(setCurrentChat(currentChatId))
            // console.log("SETTING CHAT ID:", currentChatId)

        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Failed to open chat"));
        } finally {
            dispatch(setLoading(false));
        }
    }
    async function handleOpenNewChat() {
        try {
            dispatch(setLoading(true))
            dispatch(setCurrentChat(null))
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Failed to open chat"));
        } finally{
            dispatch(setLoading(false));
        }
    }

    return { initializeSocketConnection, handleSendMessage, handleGetChats, handleOpenChat,handleOpenNewChat }

}