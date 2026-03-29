import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import { IdentifyUser } from "../middlewares/auth.middleware.js";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";

const authRouter = Router();


authRouter.post("/register", registerValidator, authController.registerController)
authRouter.post("/login", loginValidator, authController.loginController)
authRouter.get("/verify-email", authController.verifyEmailController)
authRouter.get("/get-me", IdentifyUser, authController.getMeController)

export default authRouter

