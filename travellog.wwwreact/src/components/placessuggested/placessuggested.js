import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import Nav from "../nav/nav";
import "./placessuggested.css";

function PlacesSuggested() {
  const params = useParams();
  const navigate = useNavigate();

  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const userName = localStorage.getItem("UserName");

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
      fetch(`https://localhost:7209/${userName}/suggestions`)
        .then((res) => res.json())
        .then((data) => setSuggestions(data))
        .then((e) => {
          setLoading(false);
        });
    },
    [userName, setSuggestions]
  );

  return (
    <>
      <Nav />
      <section className="fs">
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
                      to={`/${userName}/places/suggested/${suggestion.id}`}
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
