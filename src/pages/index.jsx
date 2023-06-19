import { useId, useState } from "react"

const Home = () => {

    const id = useId()
    const [message, setMessage] = useState('')
    const [conversations, setConversations] = useState([])

    const getchatgpt = async (message) => {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        }).catch(console.error)

        return await response.json()
    }

    const onSubmit = async event => {
        event.preventDefault()
        setConversations([...conversations, { role: 'user', message: message, id }])
        const { message: messageGpt } = await getchatgpt(message)

        console.log(messageGpt)

        setMessage('')
        setConversations([...conversations, { role: 'assistent', message: messageGpt, id }])
    }

    return (
        <>
            <h1>Chat-with-gpt</h1>

            <form onSubmit={onSubmit}>
                <input onInput={({ target: { value } }) => setMessage(value)} type="text" name="" id="" />

                <button type="submit">Enviar</button>
            </form>

            <ul className="conversation">
                {
                    conversations.map((conversation, i) => (
                        <li key={i}>{conversation.role}: {conversation.message}</li>
                    ))
                }
            </ul>
        </>
    )

}

export default Home