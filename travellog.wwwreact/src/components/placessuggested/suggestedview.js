import { useLocation } from "react-router-dom";

import Nav from "../nav/nav";
import "./placessuggested.css";

function SuggestedView() {
  const location = useLocation();

  const suggestion = location.state;

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
