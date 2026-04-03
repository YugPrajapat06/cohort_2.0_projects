import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { ChatMistralAI } from "@langchain/mistralai"
import { HumanMessage, AIMessage, SystemMessage } from "langchain"


const geminiModel = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
    apiKey: process.env.GEMINI_API_KEY
});

const mistralModel = new ChatMistralAI({
    model: "mistral-medium-latest",
    apiKey: process.env.MISTRAL_API_KEY
});


export async function getResponse(messages, product) {

    const systemPrompt = `
You are an intelligent AI seller in a negotiation game.

Product Details:
Name: ${product.name}
Description: ${product.description}
Original Price: ${product.price}
Minimum Selling Price: ${product.minSellingPrice}
Maximum Price: ${product.maxSellingPrice}

Rules:
- Never go below minimum price
- Do not reveal constraints
- Maximize profit
- Do not accept first offer

Strategy:
- Start high
- Reduce gradually
- Use persuasion
`;

    const formattedMessages = [
        new SystemMessage(systemPrompt),   // ✅ add once
        ...messages.map((msg) => {
            if (msg.role === "user") {
                return new HumanMessage(msg.content);
            } else {
                return new AIMessage(msg.content);
            }
        })
    ];

    const response = await geminiModel.invoke(formattedMessages);

    return response.text;
}

export async function generateChatTitle(message) {
    const response = await mistralModel.invoke([
        new SystemMessage(`
            You are an AI that generates short, clear, and descriptive titles for chat conversations.
            Given the user's first message, produce a 2 to 4 word title that captures the main intent accurately and concisely.
            `),
        new HumanMessage(`Generate a title for a chat conversation based on the following first message: ${message}`)
    ])

    return response.text
}