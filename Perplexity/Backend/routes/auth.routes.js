import { Router } from "express"
import { loginValidator, registerValidator } from "../validators/auth.validator.js"
import { getMeController, loginController, registerController, verifyEmailController } from "../controllers/auth.controller.js"
import { IdentifyUser } from "../middlewares/auth.middleware.js"

const authRouter = Router()


authRouter.post("/register", registerValidator, registerController)
authRouter.post("/login", loginValidator, loginController)
authRouter.get("/get-me", IdentifyUser, getMeController)
authRouter.get("/verify-email",verifyEmailController)
export default authRouter