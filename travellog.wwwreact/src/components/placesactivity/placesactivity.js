import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Nav from "../nav/nav";
import "./placesactivity.css";
import SearchBar from "../search/searchbar";
import SearchResults from "../search/searchresults";
import PlacesComments from "./placescomments";

const initialState = {
  text: "",
  postedAt: "",
  placeId: null,
  userId: 1,
};

function PlacesActivity() {
  const [loading, setLoading] = useState(false);
  const [places, setPlaces] = useState([]);
  const userName = localStorage.getItem("UserName");
  const [results, setResults] = useState([]);
  const [formData, setFormData] = useState(initialState);

  useEffect(
    function () {
      setLoading(true);
      fetch(`https://localhost:7209/activity/${userName}`)
        .then((res) => res.json())
        .then((data) => setPlaces(data))
        .then((e) => {
          setLoading(false);
        });
    },
    [userName, setPlaces]
  );

  const handleComments = (id) => {
    fetch(`https://localhost:7209/${id}/comments`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (id) => {
    let date = new Date();
    formData.postedAt = date.toString();
    formData.placeId = id;
    fetch(`https://localhost:7209/${userName}/add/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <>
      <Nav />
      <section>
        <h2>Activity feed</h2>
        <div className="searchbar-activity">
          <SearchBar setResults={setResults} />
          <SearchResults results={results} />
        </div>
        <div className="item__info">
          {loading ? (
            <div className="spinner-container">
              <div className="loading-spinner"></div>
            </div>
          ) : (
            <></>
          )}
          {places.map((place, index) => {
            const {
              id,
              follower,
              followerUserName,
              followerPicture,
              country,
              city,
              rating,
              visitedAt,
              stayedFor,
              fileUrl,
              story,
            } = place;
            return (
              <div className="activity__place" key={index}>
                <div className="activity__place__user">
                  <Link to={`/user/${followerUserName}`}>
                    <div className="activity__place__profile">
                      {followerPicture ? (
                        <div
                          className="activity__place__profile__picture"
                          style={{ backgroundImage: `url(${followerPicture})` }}
                        />
                      ) : (
                        <></>
                      )}
                      <div className="activity__place__profile__info">
                        <h3>{follower}</h3>
                        <p>{followerUserName}</p>
                      </div>
                    </div>
                  </Link>
                </div>
                <p className="activity__place__text">
                  <a href={`/user/${followerUserName}`} className="sub-link">
                    @{follower}
                  </a>{" "}
                  has visited {city}, {country} on {visitedAt} and stayed there
                  for {stayedFor} days.
                </p>
                <p className="activity__place__text">"{story}"</p>
                {fileUrl ? (
                  <div className="activity__image">
                    <div className="activity__image__overlay">
                      <div className="activity__image__rating">
                        <h2>{rating}</h2>
                        <p className="medium-small-hide">/10</p>
                      </div>
                    </div>
                    <img
                      src={fileUrl}
                      alt={city}
                      className="item__info_image"
                    />
                  </div>
                ) : (
                  <></>
                )}
                <PlacesComments id={id} />
                <input
                  id="text"
                  name="text"
                  type="textarea"
                  placeholder="Add a comment..."
                  required
                  onChange={handleChange}
                  value={formData.text}
                />

                <div className="actions-section">
                  <button
                    className="button blue"
                    onClick={() => handleSubmit(id)}
                  >
                    Comment
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default PlacesActivity;
