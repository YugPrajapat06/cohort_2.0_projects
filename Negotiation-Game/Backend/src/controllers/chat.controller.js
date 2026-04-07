import { number } from "zod";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";
import productModel from "../models/product.model.js";
import { generateChatTitle, getResponse } from "../services/ai.service.js";

async function sendMessageController(req, res) {
    const { message, chatId } = req.body;
    
    
    // let title = null, chat = null;

    if (!chatId) {
        return res.status(400).json({
            success: false,
            message: "chatId is required"
        });
    }

    const userMessage = await messageModel.create({
        chat: chatId,
        content: message,
        role: "user"
    })
    // console.log("userMessage");
    
    const messages = await messageModel.find({
        chat: chatId
    })

    const chat = await chatModel.findOne({
        _id: chatId,
        user: req.user.id
    });

    if (!chat) {
        return res.status(404).json({
            success: false,
            message: "Chats not found"
        })
    }
    const productId = chat.product;
    const product = await productModel.findById(productId);

    const {result, finalPrice} = await getResponse(messages, product);
    const discount = product.maxSellingPrice - finalPrice;
    await productModel.findByIdAndUpdate(productId, { discount: discount });

    const aiMessage = await messageModel.create({
        chat: chatId,
        content: JSON.stringify(result),
        role: "ai"
    })
    
    

    res.status(200).json({
        success: true,
        message: "Message sent successfully",
        chat,
        aiMessage,
        finalPrice
    });
}

async function createChatController(req, res) {
    const { productId } = req.body;
    const userId = req.user.id;

    const chat = await chatModel.create({ product: productId, user: userId });

    res.status(200).json({
        success: true,
        message: "Chat created successfully",
        chat
    });
}
// async function getChatsController(req, res) {
//     const userId = req.user.id;
//     const productId = req.params.productId;
//     const chats = await chatModel.find({ product: productId, user: userId });

//     res.status(200).json({
//         success: true,
//         message: "Chats fetched successfully",
//         chats
//     });
// }



async function getMessagesController(req, res) {
    const chatId = req.params.chatId

    const chat = await chatModel.findOne({
        _id: chatId,
        user: req.user.id
    })

    if (!chat) {
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

    if (!chat) {
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
    // getChatsController,
    getMessagesController,
    deleteChatController,
    createChatController
}