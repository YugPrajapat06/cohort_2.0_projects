import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";
import { generateChatTitle, getResponse } from "../services/ai.service.js";

async function sendMessageController(req, res) {
    const { message, chat: chatId } = req.body;

    let title = null, chat = null;

    if (!chatId) {
        title = await generateChatTitle(message);
        chat = await chatModel.create({
            user: req.user.id,
            title
        })
    }

    const userMessage = await messageModel.create({
        chat: chatId || chat._id,
        content: message,
        role: "user"
    })

    const messages = await messageModel.find({
        chat: chatId || chat._id
    })

    const result = await getResponse(messages);

    const aiMessage = await messageModel.create({
        chat: chatId || chat._id,
        content: result,
        role: "ai"
    })

    res.status(200).json({
        success: true,
        message: "Message sent successfully",
        title,
        chat,
        aiMessage
    });
}

async function getChatsController(req, res) {
    const userId = req.user.id;

    const chats = await chatModel.find({ user: userId });

    res.status(200).json({
        success: true,
        message: "Chats fetched successfully",
        chats
    });
}

async function getMessagesController(req, res) {
    const chatId = req.params.chatId

    const chat = await chatModel.find({
        _id: chatId,
        user: req.user.id
    })

    if(!chat){
        return res.status(404).json({
            success: false,
            message: "Chats not found"
        })
    }

    const messages = await messageModel.find({
        chat: chatId
    })

    res.status(200).json({
        success: true,
        message: "Messages fetched successfully",
        messages
    });
}

async function deleteChatController(req, res) {
    const chatId = req.params.chatId
    const user = req.user.id

    const chat = await chatModel.findOneAndDelete({
        _id: chatId,
        user
    })
    
    await messageModel.deleteMany({
        chat: chatId
    })

    if(!chat){
        return res.status(404).json({
            success: false,
            message: "Chats not found"
        })
    }

    res.status(200).json({
        success: true,
        message: "Chat deleted successfully"
    });
}

export default {
    sendMessageController,
    getChatsController,
    getMessagesController,
    deleteChatController
}