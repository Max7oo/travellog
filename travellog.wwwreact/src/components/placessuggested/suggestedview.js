import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Nav from "../nav/nav";
import "./placessuggested.css";
import React from "react";
import Mapbox from "../mapbox/mapbox";

function SuggestedView({ places }) {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const suggestion = location.state;
  const userName = localStorage.getItem("UserName");
  const [sure, setSure] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(function () {
    if (localStorage.length === 0) {
      navigate(`/`);
    } else if (userName !== params.userName) {
      navigate(`/`);
    }
  });

  const areYouSure = async (e) => {
    setSure(true);
  };

  const cancel = async (e) => {
    setSure(false);
  };

  const deleteSuggestion = async (e) => {
    setIsButtonDisabled(true);
    await fetch(
      `${process.env.REACT_APP_API_LINK}/${userName}/suggestions/${params.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 5000);
    navigate(`/${userName}/places/suggested`);
  };

  if (!suggestion) {
    return (
      <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div>
    );
  } else {
    return (
      <>
        <Nav />
        <section>
          <h2>The saved suggestion below is based on: {suggestion.basedOn}</h2>
          <div className="flex">
            <div className="first">
              <div className="item__info">
                <div className="response">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: suggestion.suggestionText,
                    }}
                  />
                </div>
              </div>
              {sure ? (
                <>
                  {isButtonDisabled ? (
                    <>
                      <div className="spinner-container">
                        <div className="loading-spinner-mini"></div>
                      </div>
                    </>
                  ) : (
                    <>
                      <button onClick={deleteSuggestion}>Yes</button>
                      <button className="cancel" onClick={cancel}>
                        Cancel
                      </button>
                    </>
                  )}
                </>
              ) : (
                <>
                  <button onClick={areYouSure}>Delete suggestion</button>
                </>
              )}
            </div>
            <div className="second">
              <Mapbox places={places} />
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default SuggestedView;
