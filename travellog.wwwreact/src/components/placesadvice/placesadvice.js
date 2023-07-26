import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate, Link } from "react-router-dom";

import Nav from "../nav/nav";
import "./placesadvice.css";

const initialState = {
  basedOn: "",
  suggestionText: "",
};

function PlacesRequest(props) {
  const params = useParams();
  const navigate = useNavigate();

  const { places, setPlaces } = props;
  const userName = localStorage.getItem("UserName");
  const [cityList] = useState([]);

  const [messageChatGPT, setMessageChatGPT] = useState();
  const [loading, setLoading] = useState(false);
  const [isRequested, setIsRequested] = useState(true);
  const [isShown, setIsShown] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [suggestion, setSuggestion] = useState(initialState);

  useEffect(function () {
    if (localStorage.length === 0) {
      navigate(`/`);
    } else if (userName !== params.userName) {
      navigate(`/`);
    }
  });

  useEffect(
    function () {
      setLoading(true);
      fetch(`https://localhost:7209/${userName}/places`)
        .then((res) => res.json())
        .then((data) => {
          data.sort((a, b) => (a.city > b.city ? 1 : -1));
          setPlaces(data);
        })
        .then((e) => {
          setLoading(false);
        });
    },
    [userName, setPlaces]
  );

  function addToCityList(place) {
    if (cityList.includes(place.city)) {
      cityList.splice(cityList.indexOf(`${place.city}`), 1);
    } else {
      cityList.push(place.city);
    }
  }

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
        <span>
          <h2>Request</h2>
          <Link to={`/${userName}/places/suggested`}>
            <button>Previous suggestions</button>
          </Link>
        </span>
        <p className="item">
          Select cities, from the list of cities you have been to, that you want
          to base the travel advice on.
        </p>
        {loading ? (
          <div className="spinner-container">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <></>
        )}
        <table>
          <tbody>
            {places.map((place, index) => {
              const { country, city } = place;
              return (
                <tr className="tr-align-center" key={index}>
                  <th className="th-small">
                    <input
                      type="checkbox"
                      id={place.city}
                      name="addToCityList"
                      onClick={() => addToCityList(place)}
                    />
                  </th>
                  <th>
                    {city}, {country}
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>

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
