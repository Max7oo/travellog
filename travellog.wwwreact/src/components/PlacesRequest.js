import { useState } from "react"
import { useLocation } from 'react-router-dom'

function PlacesRequest() {
    const [messageChatGPT, setMessageChatGPT] = useState()
    const [loading, setLoading] = useState(false);

    const location = useLocation()
    const { cityList } = location.state
    
    const API_KEY = ""

    console.log(cityList.toString())

    const systemMessage = {
        role: "system",
        content: "Recall the given list of cities and make three suggestions for cities to visit based on the list, including a top three to do list."
    }

    const theMessage = {
        role: "user",
        content: `Where should I go next based on the following cities: ${cityList.toString()}`
    }
    const apiRequestBody = {
        "model": "gpt-3.5-turbo",
        "messages": [systemMessage, theMessage]
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + API_KEY,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(apiRequestBody)
        }).then((data) => {
            return data.json();
        }).then((data) => {
            setMessageChatGPT(data.choices[0].message.content)
        }).then(() => {setLoading(false)});
    };

    return (
        <>
            <header>
                <h2>Request</h2>
            </header>
            <ul>
                {cityList?.map((name, index) => {
                    return (
                        <li key={index}>
                            <p>{name}</p>
                        </li>
                    );
                })}
                <button onClick={handleSubmit}>Send request</button>
            </ul>
            <h2>Response</h2>
            {loading ? (<div className="spinner-container"><div className="loading-spinner"></div></div>) : (<></>)}
            <p>Click the request button to receive a response.</p>
            <p>{messageChatGPT}</p>
        </>
    )
}

export default PlacesRequest