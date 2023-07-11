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
  const [currentPage, setCurrentPage] = useState(1);
  const [placesPerPage] = useState(10);
  const userName = localStorage.getItem("UserName");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState("ASC");
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

  const indexOfLastPlace = currentPage * placesPerPage;
  const indexOfFirstPlace = indexOfLastPlace - placesPerPage;
  const currentPlaces = places.slice(indexOfFirstPlace, indexOfLastPlace);

  const pageNumbers = [];
  const totalPlaces = places.length;

  for (let i = 1; i <= Math.ceil(totalPlaces / placesPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Nav />
      <section>
        <h2>Places</h2>

        <div className="content">
          <div className="table">
          {loading ? (
                      <div className="spinner-container">
                        <div className="loading-spinner"></div>
                      </div>
                    ) : (
                      <></>
                    )}
            <table>
              <thead>
                <tr>
                  <th
                    className="medium-small-hide"
                    onClick={() => sortingABC("country")}
                  >
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
                  <th
                    className="small-hide"
                    onClick={() => sortingNUM("visitedAt")}
                  >
                    <span>
                      Visited on
                      <img src={filter} alt="filter" />
                    </span>
                  </th>
                  <th
                    className="medium-hide"
                    onClick={() => sortingNUM("stayedFor")}
                  >
                    <span>
                      Stayed for (days)
                      <img src={filter} alt="filter" />
                    </span>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentPlaces.map((place, index) => {
                  const { country, city, rating, visitedAt, stayedFor } = place;
                  return (
                    <tr key={index}>
                      <th className="medium-small-hide">{country}</th>
                      <th>{city}</th>
                      <th>{rating}</th>
                      <th className="small-hide">{visitedAt}</th>
                      <th className="medium-hide">{stayedFor}</th>
                      <th>
                        <Link to={`/${userName}/places/${place.id}`}>
                          <button className="view">View</button>
                        </Link>
                        <Link
                          className="large-hide"
                          to={`/${userName}/places/edit/${place.id}`}
                        >
                          <button className="edit">Edit</button>
                        </Link>
                        <Link
                          className="large-hide"
                          to={`/${userName}/places/delete/${place.id}`}
                        >
                          <button className="delete">Delete</button>
                        </Link>
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="pagination">
              {pageNumbers.map((number) => (
                <p
                  key={number}
                  onClick={() => paginate(number)}
                  className={
                    number === currentPage ? "page-link-highlight" : "page-link"
                  }
                >
                  {number}
                </p>
              ))}
            </div>
          </div>

          <div className="mapbox">
            <Map
              mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
              initialViewState={{
                latitude: 50.1109,
                longitude: 8.6821,
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
        </div>
      </section>
    </>
  );
}

export default PlacesList;
