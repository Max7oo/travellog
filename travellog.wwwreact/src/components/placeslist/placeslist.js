import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl";

import Nav from "../nav/nav";
import "./placeslist.css";
import filter from "../../images/filter.png";
import pin from "../../images/pin.svg";

function PlacesList(props) {
  const navigate = useNavigate();
  const params = useParams();

  const { places, setPlaces } = props;
  const userName = localStorage.getItem("UserName");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState("ASC");
  const [isShown, setIsShown] = useState(false);
  const [cityData] = useState([]);

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
        .then((data) => setPlaces(data))
        .then((e) => {
          setLoading(false);
        });
    },
    [userName, setPlaces]
  );

  useEffect(function () {
    places.map((place) => {
      const { country, city } = place;
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}%2C%20${country}.json?proximity=ip&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
      )
        .then((res) => res.json())
        .then((data) => {
          cityData.push({
            name: place.city,
            latitude: data.features[0].center[1],
            longitude: data.features[0].center[0],
          });
        });
      return cityData;
    });
  });

  const cityList = [];
  function addToCityList(place) {
    if (cityList.includes(place.city)) {
      cityList.splice(cityList.indexOf(`${place.city}`), 1);
    } else {
      cityList.push(place.city);
    }
  }

  const sortingABC = (col) => {
    if (order === "ASC") {
      const sorted = [...places].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setPlaces(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...places].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setPlaces(sorted);
      setOrder("ASC");
    }
  };

  const sortingNUM = (col) => {
    if (order === "ASC") {
      const sorted = [...places].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setPlaces(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...places].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setPlaces(sorted);
      setOrder("ASC");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cityList.length > 0) {
      navigate(`/${userName}/places/request`, { state: cityList });
    } else {
      setIsShown((current) => !current);
    }
  };

  return (
    <>
      <Nav />
      <section>
        <h2>Places</h2>

        <table>
          <thead>
            <tr>
              <th></th>
              <th onClick={() => sortingABC("country")}>
                <span>
                  Country
                  <img src={filter} alt="filter" />
                </span>
              </th>
              <th onClick={() => sortingABC("city")}>
                <span>
                  City
                  <img src={filter} alt="filter" />
                </span>
              </th>
              <th onClick={() => sortingNUM("rating")}>
                <span>
                  Rating
                  <img src={filter} alt="filter" />
                </span>
              </th>
              <th onClick={() => sortingNUM("visitedAt")}>
                <span>
                  Visited on
                  <img src={filter} alt="filter" />
                </span>
              </th>
              <th onClick={() => sortingNUM("stayedFor")}>
                <span>
                  Stayed for (days)
                  <img src={filter} alt="filter" />
                </span>
              </th>
              <th></th>
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
            {places.map((place, index) => {
              const { country, city, rating, visitedAt, stayedFor } = place;
              return (
                <tr key={index}>
                  <th>
                    <input
                      type="checkbox"
                      id={place.city}
                      name="addToCityList"
                      onClick={() => addToCityList(place)}
                    />
                  </th>
                  <th>{country}</th>
                  <th>{city}</th>
                  <th>{rating}</th>
                  <th>{visitedAt}</th>
                  <th>{stayedFor}</th>
                  <th>
                    <Link to={`/${userName}/places/${place.id}`}>
                      <button className="view">View</button>
                    </Link>
                    <Link to={`/${userName}/places/edit/${place.id}`}>
                      <button className="edit">Edit</button>
                    </Link>
                    <Link to={`/${userName}/places/delete/${place.id}`}>
                      <button className="delete">Delete</button>
                    </Link>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p>
          Receive travel advise based on the selected cities above by clicking
          on the 'Request' button.
        </p>
        <button className="request" onClick={handleSubmit}>
          Request
        </button>
        {isShown && <p className="red">Select one or more cities.</p>}
        <div className="mapbox">
          <Map
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            initialViewState={{
              latitude: 48.2082,
              longitude: 16.3738,
              zoom: 3,
            }}
            width="100%"
            height="100%"
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            {cityData.map((place, index) => {
              const { name, latitude, longitude } = place;
              return (
                <Marker
                  key={index}
                  latitude={latitude}
                  longitude={longitude}
                  anchor="bottom"
                >
                  <div className="marker">
                    <img src={pin} className="marker__img" alt={name} />
                  </div>
                </Marker>
              );
            })}
          </Map>
        </div>
      </section>
    </>
  );
}

export default PlacesList;
