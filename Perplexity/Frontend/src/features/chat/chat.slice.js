import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
    name: "chat",
    initialState: {
        chats: {},
        currentChatId: null,
        isLoading: false,
        error: null
    },
    reducers: {
        createChat: (state, action) => {
            const { chatId, title } = action.payload;
            state.chats[chatId] = {
                id: chatId,
                title,
                messages: [],
                lastUpdated: new Date().toISOString()
            }
        },
        addNewMessage: (state, action) => {
            const { chatId, content, role } = action.payload;
            // Defensive check: ensure chat exists and has messages array
            if (!state.chats[chatId]) {
                console.warn(`Chat ${chatId} does not exist in state`);
                return;
            }
            if (!Array.isArray(state.chats[chatId].messages)) {
                state.chats[chatId].messages = [];
            }
            state.chats[chatId].messages.push({ content, role });
        },
        addMessages: (state, action) => {
            const { chatId, messages } = action.payload;
            // Defensive check: ensure chat exists
            if (!state.chats[chatId]) {
                console.warn(`Chat ${chatId} does not exist in state`);
                return;
            }
            if (!Array.isArray(state.chats[chatId].messages)) {
                state.chats[chatId].messages = [];
            }
            state.chats[chatId].messages.push(...messages);
        },
        setCurrentChat: (state, action) => {
            state.currentChatId = action.payload   // ✅ correct
        },
        setChats: (state, action) => {
            state.chats = action.payload
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        }
    }
})

export const { setChats, createChat, addNewMessage, addMessages, setCurrentChat, setLoading, setError } = chatSlice.actions;
export default chatSlice.reducer