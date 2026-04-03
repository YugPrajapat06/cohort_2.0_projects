import {createBrowserRouter} from "react-router"
import Login from "../features/auth/pages/Login"
import Register from "../features/auth/pages/Register"
import AddProduct from "../features/product/pages/AddProduct"
import Products from "../features/product/pages/Products"
import Deshboard from "../features/chat/pages/Deshboard"
import Protected from "../features/auth/components/Protected"

// import Dashboard from "../features/chat/pages/Dashboard"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Products/>
    },
    {
        path: "/add-product",
        element: <AddProduct/>
    },
    {
        path: "/deshboard",
        element: <Protected><Deshboard/></Protected>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/register",
        element: <Register/>
    }
])