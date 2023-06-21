import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import Nav from "../nav/nav";
import "./placessuggested.css";

function PlacesSuggested() {
  const params = useParams();

  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(
    function () {
      setLoading(true);
      fetch(`https://localhost:7209/${params.userName}/suggestions`)
        .then((res) => res.json())
        .then((data) => setSuggestions(data))
        .then((e) => {
          setLoading(false);
        });
    },
    [params.userName, setSuggestions]
  );

  return (
    <>
      <Nav />
      <section>
        <h2>Previous suggestions</h2>

        <table>
          <thead>
            <tr>
              <th>Based on</th>
              <th>Suggestion</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                {loading ? (
                  <div className="spinner-container">
                    <div className="loading-spinner"></div>
                  </div>
                ) : (
                  <></>
                )}
              </th>
            </tr>
            {suggestions.map((suggestion, index) => {
              const { basedOn } = suggestion;
              return (
                <tr key={index}>
                  <th>{basedOn}</th>
                  <th>
                    <Link
                      to={`/${params.userName}/places/suggested/${suggestion.id}`}
                      state={suggestion}
                    >
                      <button className="view">View</button>
                    </Link>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default PlacesSuggested;
