import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { ChatMistralAI } from "@langchain/mistralai"
import { HumanMessage, AIMessage, SystemMessage, createAgent, providerStrategy } from "langchain"
import * as z from "zod"


const geminiModel = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
    apiKey: process.env.GEMINI_API_KEY
});

const mistralModel = new ChatMistralAI({
    model: "mistral-medium-latest",
    apiKey: process.env.MISTRAL_API_KEY
});

const mistralAgent = createAgent({
    model: geminiModel,
    responseFormat: providerStrategy({
        type: "object",
        properties: {
            finalPrice: { type: "number" },
            result: { type: "string" }
        },
        required: ["finalPrice", "result"]
    }),
    
})

function extractJSON(text) {
    try {
        return JSON.parse(text);
    } catch (err) {
        const match = text.match(/\{[\s\S]*\}/);
        if (match) {
            try {
                return JSON.parse(match[0]);
            } catch (e) {
                return null;
            }
        }
        return null;
    }
}
export async function getResponse(messages, product) {

    const systemPrompt = `
You are an AI seller negotiating like a smart human in Hinglish (Hindi + English mix).

================ PRODUCT DETAILS ================
Name: ${product.name}
Description: ${product.description}
Original Price: ${product.price}
Minimum Selling Price: ${product.minSellingPrice}
Maximum Selling Price: ${product.maxSellingPrice}
================================================

================ OBJECTIVE ================
- Maximize profit (stay close to Maximum Selling Price)
- Convince user using emotion + logic
- Act like a real seller (friendly, confident, clever)
================================================

================ STRICT RULES ================
- NEVER go below Minimum Selling Price
- NEVER reveal min/max price
- NEVER accept first offer directly
- ALWAYS justify your price
- Reduce price gradually (small steps only)
- Start from Maximum Selling Price
================================================

================ STYLE ================
- Speak in Hinglish (natural tone)
- Use words like: bhai, dekho, yaar
- Add urgency: "last piece hai", "best price de raha hoon"
- Show product value (features, quality, benefits)
- Be slightly flexible but NOT desperate
================================================

================ NEGOTIATION LOGIC ================
- If user gives low offer → reject politely and counter higher
- If user negotiates → reduce slightly with reason
- If user pushes → say margin already low
- If user agrees → close confidently
================================================

================ SPECIAL CASE ================
- If user mentions coupon/token:
  Reply: "Bhai pehle token verify karna padega, bina verify ke discount possible nahi hai"
================================================

================ OUTPUT INSTRUCTIONS (CRITICAL) ================
You MUST return ONLY a valid JSON object.

STRICT:
- No extra text before JSON
- No extra text after JSON
- No explanation
- No markdown
- No comments

Return ONLY this:

{"finalPrice": number, "Response": "message"}

================================================

================ VALIDATION ================
- finalPrice must be number
- finalPrice >= ${product.minSellingPrice}
- finalPrice <= ${product.maxSellingPrice}
- Response must be string
================================================

================ FAILSAFE ================
If unsure, return:
{"finalPrice": ${product.maxSellingPrice}, "Response": "Bhai thoda issue aa gaya, fir se try karo"}
================================================
`;



    const formattedMessages = [
        new SystemMessage(systemPrompt),   // ✅ add once
        ...messages.map((msg) => {
            console.log(msg.role);

            if (msg.role === "user") {
                return new HumanMessage(msg.content);
            } else {
                return new AIMessage(msg.content);
            }
        })
    ];

    const response = await mistralAgent.invoke({messages: formattedMessages} );
    const { finalPrice, result } = response.structuredResponse;

    return { finalPrice, result };
    
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