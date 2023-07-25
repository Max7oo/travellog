import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Nav from "../nav/nav";
import "./placesactivity.css";
import SearchBar from "../search/searchbar";
import SearchResults from "../search/searchresults";

function PlacesActivity() {
  const [loading, setLoading] = useState(false);
  const [places, setPlaces] = useState([]);
  const userName = localStorage.getItem("UserName");
  const [results, setResults] = useState([]);

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
                <p className="activity__place__text">{story}</p>
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
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default PlacesActivity;
