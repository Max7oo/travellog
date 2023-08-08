import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Nav from "../nav/nav";
import "./placesactivity.css";
import SearchBar from "../search/searchbar";
import SearchResults from "../search/searchresults";
import PlacesComments from "./placescomments";
import Mapbox from "../mapbox/mapbox";

function PlacesActivity() {
  const [loading, setLoading] = useState(false);
  const [places, setPlaces] = useState([]);
  const userName = localStorage.getItem("UserName");
  const [results, setResults] = useState([]);

  useEffect(
    function () {
      setLoading(true);
      fetch(`${process.env.REACT_APP_API_LINK}/activity/${userName}`)
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
        <div className="flex">
          <div className="first">
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
              {loading === false && places.length === 0 ? (
                <tr>
                  <th className="bold">
                    Whenever you start following other users, this will be the
                    place to view newly added places by them.
                  </th>
                </tr>
              ) : (
                <>
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
                                  style={{
                                    backgroundImage: `url(${followerPicture})`,
                                  }}
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
                        <div className="activity__place__text">
                          <p>
                            <a
                              href={`/user/${followerUserName}`}
                              className="sub-link"
                            >
                              @{follower}
                            </a>{" "}
                            has visited {city}, {country} on {visitedAt} and
                            stayed there for {stayedFor} days.
                          </p>
                          <p>"{story}"</p>
                        </div>
                        {fileUrl ? (
                          <div className="activity__image">
                            <div className="activity__image__overlay">
                              <div className="activity__image__rating">
                                <h2>{rating}</h2>
                                <p className="medium-small-hide bold">/10</p>
                              </div>
                            </div>
                            <img
                              src={fileUrl}
                              alt={city}
                              className="item__info__image"
                            />
                          </div>
                        ) : (
                          <></>
                        )}
                        <PlacesComments id={id} />
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
          <div className="second">
            <Mapbox />
          </div>
        </div>
      </section>
    </>
  );
}

export default PlacesActivity;
