import { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Wrapper } from "@googlemaps/react-wrapper";
import { createRoot } from "react-dom/client";

import Nav from "../nav/nav";
import "./placeslist.css";
import filter from "../../images/filter.png";

function PlacesList(props) {
  const navigate = useNavigate();
  const params = useParams();

  const { places, setPlaces } = props;
  const userName = localStorage.getItem("UserName")
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState("ASC");
  const [isShown, setIsShown] = useState(false);
  const google = window.google;

  useEffect(
    function () {
      if (localStorage.length === 0) {
        navigate(`/`)
      } else if (userName !== params.userName) {
        navigate(`/`)
      }
    }
  )

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

  const mapOptions = {
    madId: process.env.NEXT_PUBLIC_MAP_ID,
    center: { lat: 43.66, lng: -79.39 },
    zoom: 10,
    disableDefaultUI: true,
  }

  function MyMap() {
    const [ map, setMap ] = useState();
    const ref = useRef();

    useEffect(() => {
      setMap(new google.maps.Map(ref.current, mapOptions))
    }, [])
    return (
      <>
        <div ref={ref} id="map"/>
        {map && <City map={map} />}
      </>
    )
  }

  const cityData = {
    A: {
      name: "Toronto",
      position: { lat: 43.66, lng: -79.39  }
    },
    B: {
      name: "Amsterdam",
      position: { lat: 53.66, lng: -79.39 }
    }
  }

  function City({map}) {
    const [ data, setData ] = useState(cityData);

    return (
      <>
        {Object.entries(data).map(([key, city]) => (
          <Marker key={key} map={map} position={city.position}>
            <div className="marker">
              <h2>{city.name}</h2>
            </div>
          </Marker>
        ))}
      </>
    )
  }

   function Marker({map, children, position}) {
    const markerRef = useRef();
    const rootRef = useRef();
    
    useEffect(() => {
      if (!rootRef.current) {
        const container = document.createElement("div");
        rootRef.current = createRoot(container);
        
        markerRef.current = new google.maps.marker.AdvancedMarkerView({
          position,
          content: container,
        });
      }
    }, []);

    useEffect(() => {
      rootRef.current.render(children)
      markerRef.current.position = position;
      console.log(markerRef.current.map = map);
    }, [map, position, children])
  }

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

        <Wrapper apiKey={process.env.REACT_APP_GOOGLE_API_KEY} version="beta" libraries={["marker"]}>
          <MyMap />
        </Wrapper>

      </section>
    </>
  );
}

export default PlacesList;
