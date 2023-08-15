import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl";
import "./mapbox.css";
import pin from "../../images/pin.svg";

function Mapbox() {
  const cityData = JSON.parse(localStorage.getItem("CityData"));

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
    </>
  );
}

export default Mapbox;
