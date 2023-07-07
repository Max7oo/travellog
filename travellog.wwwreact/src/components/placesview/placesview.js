import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Nav from "../nav/nav";

function PlacesView() {
  const params = useParams();
  const navigate = useNavigate();

  const [place, setPlace] = useState(false);
  const userName = localStorage.getItem("UserName");

  useEffect(function () {
    if (localStorage.length === 0) {
      navigate(`/`);
    } else if (userName !== params.userName) {
      navigate(`/`);
    }
  });

  useEffect(function () {
    fetch(`https://localhost:7209/${userName}/places/${params.id}`)
      .then((res) => res.json())
      .then((data) => setPlace(data));
  }, []);

  if (!place) {
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
          <h2>You are viewing: {place.city}</h2>
          <div className="item__info">
            <table>
              <thead>
                <tr>
                  <th>The country:</th>
                  <th>{place.country}</th>
                </tr>
                <tr>
                  <th>The city:</th>
                  <th>{place.city}</th>
                </tr>
                <tr>
                  <th>Your given rating:</th>
                  <th>{place.rating}/10</th>
                </tr>
                <tr>
                  <th>You visited on:</th>
                  <th>{place.visitedAt}</th>
                </tr>
                <tr>
                  <th>You stayed for:</th>
                  <th>{place.stayedFor} days</th>
                </tr>
              </thead>
            </table>
          </div>
          <Link to={`/${userName}/places/edit/${place.id}`}>
            <button className="edit">Edit</button>
          </Link>
          <Link to={`/${userName}/places/delete/${place.id}`}>
            <button className="delete">Delete</button>
          </Link>
        </section>
      </>
    );
  }
}

export default PlacesView;
