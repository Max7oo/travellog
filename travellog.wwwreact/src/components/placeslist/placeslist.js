import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import Nav from "../nav/nav";
import "./placeslist.css";

function PlacesList(props) {
  const params = useParams();

  const { places, setPlaces } = props;
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState("ASC");

  useEffect(
    function () {
      setLoading(true);
      fetch(`https://localhost:7209/${params.userName}/places`)
        .then((res) => res.json())
        .then((data) => setPlaces(data))
        .then((e) => {
          setLoading(false);
        });
    },
    [params.userName, setPlaces]
  );

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

  return (
    <>
      <Nav />
      <section>
        <h2>Places</h2>

        <table>
          <thead>
            <tr>
              <th></th>
              <th onClick={() => sortingABC("country")}>Country</th>
              <th onClick={() => sortingABC("city")}>City</th>
              <th onClick={() => sortingNUM("rating")}>Rating</th>
              <th>Visited at</th>
              <th onClick={() => sortingNUM("stayedFor")}>Stayed for (days)</th>
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
                    <Link to={`/${params.userName}/places/${place.id}`}>
                      <button className="view">View</button>
                    </Link>
                    <Link to={`/${params.userName}/places/edit/${place.id}`}>
                      <button className="edit">Edit</button>
                    </Link>
                    <Link to={`/${params.userName}/places/delete/${place.id}`}>
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
        <Link
          to={`/${params.userName}/places/request`}
          state={{ cityList: cityList }}
        >
          <button className="request">Request</button>
        </Link>
      </section>
    </>
  );
}

export default PlacesList;
