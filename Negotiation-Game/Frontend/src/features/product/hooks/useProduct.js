import { addProduct, getProducts } from "../services/product.api";
import { setProducts, setLoading, setError, setCurrentProduct } from "../slices/product.slice";
import { useDispatch } from "react-redux";


export function useProduct() {
    const dispatch = useDispatch()

    async function handleAddProduct({ name, description, price, minSellingPrice, maxSellingPrice, image }) {
        try {
            dispatch(setLoading(true))
            dispatch(setError(null))
            const formData = new FormData()
            formData.append("name", name)
            formData.append("description", description)
            formData.append("price", price)
            formData.append("minSellingPrice", minSellingPrice)
            formData.append("maxSellingPrice", maxSellingPrice)
            formData.append("image", image)
            const data = await addProduct(formData)
            return true
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to add product"
            dispatch(setError(errorMessage))
            return false
        } finally {
            dispatch(setLoading(false))
        }

    }

    async function handleGetProducts() {
        try {
            dispatch(setLoading(true))
            dispatch(setError(null))
            const data = await getProducts()
            dispatch(setProducts(data.products))
            return true
        } catch (error) {
            dispatch(setError("Failed to get products"))
            return false
        } finally {
            dispatch(setLoading(false))
        }

    }

    async function handleSetCurrentProduct(prod) {
        try {
            dispatch(setLoading(true))
            dispatch(setError(null))
            dispatch(setCurrentProduct(prod))
            return true
        } catch (error) {
            dispatch(setError("Failed to get products"))
            return false
        } finally {
            dispatch(setLoading(false))
        }
    }

    return { handleAddProduct, handleGetProducts , handleSetCurrentProduct}
}