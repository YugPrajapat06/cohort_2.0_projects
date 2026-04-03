import { Router } from "express";
import chatController from "../controllers/chat.controller.js";
import { IdentifyUser } from "../middlewares/auth.middleware.js";

const chatRouter = Router();


chatRouter.post("/message", IdentifyUser, chatController.sendMessageController)
chatRouter.post("/", IdentifyUser, chatController.createChatController)
// chatRouter.get("/:productId", IdentifyUser, chatController.getChatsController)
chatRouter.get("/:chatId/messages", IdentifyUser, chatController.getMessagesController)
chatRouter.delete("/delete/:chatId",  IdentifyUser, chatController.deleteChatController)


export default chatRouter