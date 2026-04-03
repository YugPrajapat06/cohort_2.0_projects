import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRouter from "./routes/auth.routes.js"
import chatRouter from "./routes/chat.routes.js"
import productRouter from "./routes/product.routes.js"

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/api/auth",authRouter)
app.use("/api/chat",chatRouter)
app.use("/api/product",productRouter)

export default app