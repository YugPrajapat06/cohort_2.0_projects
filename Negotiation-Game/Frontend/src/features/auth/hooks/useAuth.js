import { register, login, getMe } from "../services/auth.api.js";
import { setUser, setLoading, setError } from "../slices/auth.slice.js"
import { useDispatch } from "react-redux"

export function useAuth() {

    const dispatch = useDispatch()
    
    async function handleRegister({ username, email, password }) {
        try {
            dispatch(setLoading(true))
            dispatch(setError(null))
            const data = await register({ username, email, password })
            return true
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Registration Failed"
            dispatch(setError(errorMessage))
            return false
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleLogin({email, password}) {
        try {
            dispatch(setLoading(true))
            dispatch(setError(null))
            const data = await login({email, password})
            dispatch(setUser(data.user))
            return true
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Login Failed"
            dispatch(setError(errorMessage))
            return false
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleGetMe() {
        try {
            dispatch(setLoading(true))
            dispatch(setError(null))
            const data = await getMe()
            dispatch(setUser(data.user))
            return true
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to get user data"
            dispatch(setError(errorMessage))
            return false
        } finally {
            dispatch(setLoading(false))
        }
    }

    return {
        handleRegister,
        handleLogin,
        handleGetMe
    }
}