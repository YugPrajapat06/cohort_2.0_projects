import { sendMessage, createChatAPI,  getMessages, deleteChat } from "../services/chat.api";
import { createChat, addNewMessage, addMessages, setCurrentChat, setChats, setLoading, setError , setUserCurrentMessage, setAICurrentMessage, setFinalPrice } from "../slices/chat.slice";
import { useDispatch, useSelector } from "react-redux";
import {initializeSocketConnection} from "../services/chat.socket";


export const useChat = () => {
    const dispatch = useDispatch()
    const { currentChatId } = useSelector(state => state.chat)
    async function handleCreateChat({ productId }) {
        try {
            dispatch(setLoading(true))
            dispatch(setError(null))
            const res = await createChatAPI({ productId })
            
            dispatch(createChat({
                chatId: res.chat._id,
                title: res.chat.title,
                productId: res.chat.product
            }))
            dispatch(setCurrentChat(res.chat._id))

            return true
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to create chat"
            dispatch(setError(errorMessage))
            return false
        } finally {
            dispatch(setLoading(false))
        }

    }

    async function handleGetMessages({ chatId }) {
        try {
            dispatch(setLoading(true))
            dispatch(setError(null))
            const res = await getMessages(chatId)
            dispatch(addMessages({ chatId, messages: res.messages }))
            return true
        } catch (error) {
            dispatch(setError("Failed to get messages"));
            return false
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleSendMessage({ message, productId }) {
        let chatId = currentChatId

        
            try {
                dispatch(setLoading(true))
                dispatch(setError(null))

                if(!chatId){
                    const res = await createChatAPI({ productId })
                    chatId = res.chat._id
                    dispatch(createChat({
                        chatId: chatId,
                        title: res.chat.title,
                        productId: res.chat.product
                    }))
                    dispatch(setCurrentChat(chatId))
                    
                }
                dispatch(addNewMessage({ chatId , content: message , role: "user" }))
                dispatch(setUserCurrentMessage(message))
                const res = await sendMessage({ message : message, chatId})
                dispatch(addNewMessage({ chatId , content: res.aiMessage.content , role: res.aiMessage.role }))
                dispatch(setAICurrentMessage(res.aiMessage.content))
                dispatch(setFinalPrice(res.finalPrice))
                return true
            } catch (error) {
                dispatch(setError("Failed to send message"));
                return false
            } finally {
                dispatch(setLoading(false))
            }
    }

    return {initializeSocketConnection, handleCreateChat, handleSendMessage }
}