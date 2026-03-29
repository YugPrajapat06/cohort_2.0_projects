import { Router } from "express";
import chatController from "../controllers/chat.controller";
import { IdentifyUser } from "../middlewares/auth.middleware";

const chatRouter = Router();


chatRouter.post("/message", IdentifyUser, chatController.sendMessageController)
chatRouter.get("/", IdentifyUser, chatController.getChatsController)
chatRouter.get("/:chatId/messages", IdentifyUser, chatController.getMessagesController)
chatRouter.delete("/delete/:chatId",  IdentifyUser, chatController.deleteChatController)


export default chatRouter