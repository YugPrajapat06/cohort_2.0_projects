import {Router} from "express"
import { IdentifyUser } from "../middlewares/auth.middleware.js";
import { deleteChatController, getChatsController, getMessageController, sendMessageController } from "../controllers/chat.controller.js";

const chatRouter = Router()

chatRouter.post("/message",IdentifyUser,sendMessageController),
chatRouter.get("/",IdentifyUser,getChatsController),
chatRouter.get("/:chatId/messages",IdentifyUser,getMessageController),
chatRouter.delete("/delete/:chatId",IdentifyUser,deleteChatController)


export default chatRouter;