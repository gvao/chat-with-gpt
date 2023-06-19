import { getChat } from "@/services/openai"

export default async function ApiHandler(req, res, next) {
    const {
        body,
        method,
    } = req

    try {
        if (method === 'POST') {

            const { data } = await getChat(body.message)

            console.log(data)

            const messageGpt = data.choices[0].message

            res.status(200).json({
                message: messageGpt,
            })
        }
    } catch (err) {
        console.error(`[api]`, err)
        
        res.status(500).json({
            message: err.message,
        })
    }

}