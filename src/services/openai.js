import { Configuration, OpenAIApi } from "openai"

const apiKey = process.env.OPENAI_API_KEY

const configuration = new Configuration({
    apiKey,
})

const openai = new OpenAIApi(configuration)

export const getChat = async (messageUser) => {
    try {
        console.log(`[openai]`, messageUser)

        const responseGpt = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "voce é um incrivel assistente" },
                { role: "user", content: messageUser },
            ],
        })

        return responseGpt
    } catch (error) {

        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
        console.log(`[openAI]`, err.stack)
    }
}
