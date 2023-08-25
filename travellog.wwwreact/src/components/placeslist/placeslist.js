import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import Nav from "../nav/nav";
import "./placeslist.css";
import filter from "../../images/filter.png";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl";

import "../mapbox/mapbox.css";
import pin from "../../images/pin.svg";

function PlacesList(props) {
  const navigate = useNavigate();
  const params = useParams();

  const { places, setPlaces } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [placesPerPage] = useState(10);
  const userName = localStorage.getItem("UserName");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState("DSC");
  const [cityData] = useState([]);

  useEffect(function () {
    if (localStorage.length === 0) {
      navigate(`/`);
    }
  });

  useEffect(
    function () {
      setLoading(true);
      fetch(`${process.env.REACT_APP_API_LINK}/${params.userName}/places`)
        .then((res) => res.json())
        .then((data) => {
          setPlaces(data);
          localStorage.setItem("Places", JSON.stringify(data));
        })
        .then((e) => {
          setLoading(false);
        });
    },
    [params.userName, setPlaces]
  );

  useEffect(
    function () {
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
      localStorage.setItem("CityData", JSON.stringify(cityData));
    },
    [cityData, places]
  );

  var widths = [0, 1135];

  function navigateTo(id) {
    if (window.innerWidth >= widths[0] && window.innerWidth < widths[1]) {
      navigate(`/${userName}/places/${id}`);
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
        <span>
          <h2>Places</h2>
          <Link to={`/${userName}/places/add`}>
            <button>Add place</button>
          </Link>
        </span>

        <div className="flex-list">
          <div className="first-list">
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th
                      className="mini-hide"
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
                    <th className="large-hide"></th>
                  </tr>
                </thead>
                <tbody>
                  {loading === false && currentPlaces.length === 0 ? (
                    <tr>
                      <th className="bold">Start by adding some places</th>
                    </tr>
                  ) : (
                    <>
                      {currentPlaces.map((place, index) => {
                        const {
                          id,
                          country,
                          city,
                          rating,
                          visitedAt,
                          stayedFor,
                        } = place;
                        return (
                          <tr key={index} onClick={() => navigateTo(id)}>
                            <th className="mini-hide">{country}</th>
                            <th>{city}</th>
                            <th>{rating}</th>
                            <th className="small-hide">{visitedAt}</th>
                            <th className="medium-hide">{stayedFor}</th>
                            <th className="large-hide">
                              <Link to={`/${userName}/places/${place.id}`}>
                                <button className="view">View</button>
                              </Link>
                              <Link to={`/${userName}/places/edit/${place.id}`}>
                                <button className="edit">Edit</button>
                              </Link>
                              <Link
                                to={`/${userName}/places/delete/${place.id}`}
                              >
                                <button className="delete">Delete</button>
                              </Link>
                            </th>
                          </tr>
                        );
                      })}
                    </>
                  )}
                </tbody>
              </table>
              {loading ? (
                <div className="spinner-container">
                  <div className="loading-spinner"></div>
                </div>
              ) : (
                <></>
              )}
              <div className="pagination">
                {pageNumbers.map((number) => (
                  <p
                    key={number}
                    onClick={() => paginate(number)}
                    className={
                      number === currentPage
                        ? "page-link-highlight"
                        : "page-link"
                    }
                  >
                    {number}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="second-list">
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
        </div>
      </section>
    </>
  );
}

export default PlacesList;
