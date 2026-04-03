import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
    name : "chat",
    initialState : {
        chats: {},
        currentChatId : null,
        isLoading : false,
        error : null
    },
    reducers : {
        createChat: (state, action) => {
            const {chatId , title, productId} = action.payload
            state.chats[chatId] = {
                id : chatId,
                title,
                productId,
                messages : [],
                lastUpdated : new Date().toISOString()
            }
        },
        addNewMessage : (state, action)=>{
            const {chatId, content, role} = action.payload
            if(!state.chats[chatId]) return
            if(!Array.isArray(state.chats[chatId].messages)) state.chats[chatId].messages = []
            state.chats[chatId].messages.push({content, role})
        },
        addMessages : (state, action)=>{
            const {chatId, messages} = action.payload
            if(!state.chats[chatId]) return
            if(!Array.isArray(state.chats[chatId].messages)) state.chats[chatId].messages = []
            state.chats[chatId].messages.push(...messages) 
        },

        setCurrentChat: (state, action) => {
            state.currentChatId = action.payload;
        },
        setChats: (state, action) => {
            state.chats = action.payload || {};
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    }
})

export const {createChat, addNewMessage, addMessages, setCurrentChat, setChats, setLoading, setError} = chatSlice.actions

export default chatSlice.reducer