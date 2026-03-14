import "dotenv/config"
import readline from "readline/promises"
import { createAgent, HumanMessage, tool } from "langchain";
import { ChatMistralAI } from "@langchain/mistralai";
import * as z from "zod"
import { sendEmail } from "./mail.service.js";


const emailTool = tool(
    sendEmail,
    {
        name: "emailTool",
        description: 'Use this tool to send an email',
        schema: z.object({
            to: z.string().describe("The recipient's email address"),
            html: z.string().describe("The HTML content of the email"),
            subject: z.string().describe("The subject of the email")
        })
    }
)

const rl = readline.createInterface({ //Readline is use to take input from user in terminal.
    input: process.stdin,
    output: process.stdout
});

const model = new ChatMistralAI({
    model: "mistral-small-latest", //type of mistral model what we use in over application.
})

const agent = createAgent({
    model,
    tools: [emailTool]
})

const message = []; //Storage where all chats are maintail give to ai so that he remember all the chats in one conversation.

while (true) {
    const userInput = await rl.question("\x1b[32mYou:\x1b[0m ")

    message.push(new HumanMessage(userInput))

    // const response = await model.invoke(message) //Ai model ko invoke karna and uska responce lena

    // message.push(response);

    const response = await agent.invoke({
        messages: message
    })

    // console.log(`\x1b[34m[AI]\x1b[0m ${response.content}`);

    message.push(response.messages[response.messages.length - 1])
    console.log(`\x1b[34m[AI]\x1b[0m ${response.messages[response.messages.length - 1].content}`)
}

//  To close Taking Inputs from terminal --> use -->  rl.close()