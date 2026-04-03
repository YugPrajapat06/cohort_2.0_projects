import { createSlice, current } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name : "product",
    initialState : {
        products : [],
        currentProduct : null,
        isLoading : false,
        error : null
    },
    reducers : {
        setProducts : (state, action) => {
            state.products = action.payload
        },
        setCurrentProduct : (state, action) => {
            state.currentProduct = action.payload
        },
        setLoading : (state, action) => {
            state.isLoading = action.payload
        },
        setError : (state, action) => {
            state.error = action.payload
        }
    }
})

export const { setProducts, setLoading, setError , setCurrentProduct } = productSlice.actions

export default productSlice.reducer