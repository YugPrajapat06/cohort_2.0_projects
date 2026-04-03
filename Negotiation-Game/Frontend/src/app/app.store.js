import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../features/auth/slices/auth.slice"
import chatReducer from "../features/chat/slices/chat.slice"
import productReducer from "../features/product/slices/product.slice"

export const store = configureStore({
    reducer: {
        auth : authReducer,
        chat : chatReducer,
        product : productReducer
    }
})