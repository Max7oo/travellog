import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

import Nav from "../nav/nav";
import "./placesrequest.css";

const initialState = {
  basedOn: "",
  suggestionText: "",
};

function PlacesRequest() {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const [messageChatGPT, setMessageChatGPT] = useState();
  const [loading, setLoading] = useState(false);
  const cityList = location.state;
  const userName = localStorage.getItem("UserName")
  const [isRequested, setIsRequested] = useState(true);
  const [isShown, setIsShown] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [suggestion, setSuggestion] = useState(initialState);

  useEffect(
    function () {
      if (localStorage.length === 0) {
        navigate(`/`)
      } else if (userName !== params.userName) {
        navigate(`/`)
      }
    }
  )

  const systemMessage = {
    role: "system",
    content:
      "Format the following response in html, first sentence is h3. Recall the given list of cities. Based on the given list of cities, make three suggestions for cities to visit and give a top three to do list for each of those suggested cities.",
  };

  const theMessage = {
    role: "user",
    content: `Where should I go next based on the following cities: ${cityList.toString()}`,
  };

  const apiRequestBody = {
    model: "gpt-3.5-turbo",
    messages: [systemMessage, theMessage],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsRequested((current) => !current);
    setIsShown((current) => !current);
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.REACT_APP_CHATGPT_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setMessageChatGPT(data.choices[0].message.content);
        setSuggestion({
          basedOn: cityList.toString(),
          suggestionText: data.choices[0].message.content,
        });
      })
      .then(() => {
        setLoading(false);
        setIsSaved((current) => !current);
      });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await fetch(`https://localhost:7209/${userName}/suggestions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(suggestion),
    });
    setIsSaved((current) => !current);
  };

  return (
    <>
      <Nav />
      <section>
        <h2>Request</h2>
        <div className="item">
          {cityList?.map((name, index) => {
            return (
              <p key={index}>
                City {index}: {name}
              </p>
            );
          })}
        </div>
        {isRequested && (
          <>
            <div className="item">
              <p>
                By clicking on 'Send request' you are asking for travel advise
                based on the list of cities above.
              </p>
            </div>
            <button onClick={handleSubmit}>Send request</button>
          </>
        )}
        {isShown && (
          <div className="response">
            <h2>Response:</h2>
            {loading ? (
              <div className="spinner-container">
                <div className="loading-spinner"></div>
              </div>
            ) : (
              <></>
            )}
            <div dangerouslySetInnerHTML={{ __html: messageChatGPT }} />
          </div>
        )}
        {isSaved && <button onClick={handleSave}>Save suggestion</button>}
      </section>
    </>
  );
}

export default PlacesRequest;
