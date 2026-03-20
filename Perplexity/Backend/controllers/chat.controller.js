import chatModel from "../models/chat.model.js"
import messageModel from "../models/message.model.js"
import { generateChatTitle, getResponse } from "../services/ai.service.js"


export async function sendMessageController(req, res) {
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
        chat: chatId || chat.id,
        content: message,
        role: "user"
    })

    const messages = await messageModel.find({ chat: chatId || chat.id });

    const result = await getResponse(messages);

    const aiMessage = await messageModel.create({
        chat: chatId || chat.id,
        content: result,
        role: "ai"
    })

    res.status(200).json({
        message: "Message sent successfully",
        success: true,
        title,
        chat,
        aiMessage
    });

}

export async function getChatsController(req, res) {
    const userId = req.user.id;

    const chats = await chatModel.find({ user: userId });

    res.status(200).json({
        message: "Chats fetched successfully",
        success: true,
        chats
    });
}

export async function getMessageController(req, res) {
    const chatId = req.params.chatId;

    const chat = await chatModel.findOne({
        _id: chatId,
        user: req.user.id
    });

    if(!chat){
        return res.status(404).json({
            message: "Chat not found",
            success: false
        })
    }

    const messages = await messageModel.find({ chat: chatId });

    res.status(200).json({
        message: "Messages fetched successfully",
        success: true,
        messages
    });
}

export async function deleteChatController(req,res) {
    const chatId = req.params.chatId;
    const user = req.user.id
    const chat  = await chatModel.findOneAndDelete({
        _id : chatId,
        user
    })
    
    await messageModel.deleteMany({chat : chatId})

    if(!chat){
        return res.status(404).json({
            message : "Chat Not Found"
        })
    }

    res.status(200).json({
        message: "Chat deleted successfully"
    })

}