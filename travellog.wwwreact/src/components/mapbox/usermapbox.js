import { useState, useEffect } from "react";

import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl";

import "./mapbox.css";
import pin from "../../images/pin.svg";

function UserMapbox() {
  const [userCityData] = useState([]);
  const userplaces = JSON.parse(localStorage.getItem("UserPlaces"));

  useEffect(function () {
    userplaces.map((place) => {
      const { country, city } = place;
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}%2C%20${country}.json?proximity=ip&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
      )
        .then((res) => res.json())
        .then((data) => {
          userCityData.push({
            name: place.city,
            latitude: data.features[0].center[1],
            longitude: data.features[0].center[0],
          });
        });
      return userCityData;
    });
  }, []);

  return (
    <>
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
          {userCityData.map((place, index) => {
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
    </>
  );
}

export default UserMapbox;
