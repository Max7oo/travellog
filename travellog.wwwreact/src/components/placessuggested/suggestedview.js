import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Nav from "../nav/nav";
import "./placessuggested.css";
import React from "react";

function SuggestedView() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const suggestion = location.state;
  const userName = localStorage.getItem("UserName")

  useEffect(
    function () {
      if (localStorage.length === 0) {
        navigate(`/`)
      } else if (userName !== params.userName) {
        navigate(`/`)
      }
    }
  )

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
          <div className="item__info">
            <div className="response">
              <div
                dangerouslySetInnerHTML={{
                  __html: suggestion.suggestionText,
                }}
              />
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default SuggestedView;
