import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import Nav from "../nav/nav";
import Mapbox from "../mapbox/mapbox";

function PlacesDelete(props) {
  const navigate = useNavigate();
  const params = useParams();

  const { setPlaces } = props;
  const userName = localStorage.getItem("UserName");
  const [place, setPlace] = useState();

  useEffect(function () {
    if (localStorage.length === 0) {
      navigate(`/`);
    } else if (userName !== params.userName) {
      navigate(`/`);
    }
  });

  useEffect(function () {
    fetch(`https://localhost:7209/${userName}/places/${params.id}`)
      .then((res) => res.json())
      .then((data) => setPlace(data));
  }, []);

  const deletePlace = async (e) => {
    await fetch(
      `https://api.upload.io/v2/accounts/${process.env.REACT_APP_ID_UPLOAD}/files?filePath=${place.filePath}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + process.env.REACT_APP_SECRET_UPLOAD,
          "Content-Type": "image/jpeg",
        },
      }
    );
    await fetch(`https://localhost:7209/${userName}/places/${params.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigate(`/${userName}/places`);
  };

  const goBack = () => {
    navigate(-1);
  };

  if (!place) {
    return (
      <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div>
    );
  } else {
    return (
      <>
        <Nav />
        <section>
          <h2>You are deleting: {place.city}</h2>
          <div className="flex">
            <div className="first">
              <div className="item__info">
                <table>
                  <thead>
                    <tr>
                      <th>The country:</th>
                      <th>{place.country}</th>
                    </tr>
                    <tr>
                      <th>The city:</th>
                      <th>{place.city}</th>
                    </tr>
                    <tr>
                      <th>Your given rating:</th>
                      <th>{place.rating}/10</th>
                    </tr>
                    <tr>
                      <th>You visited on:</th>
                      <th>{place.visitedAt}</th>
                    </tr>
                    <tr>
                      <th>You stayed for:</th>
                      <th>{place.stayedFor} days</th>
                    </tr>
                  </thead>
                </table>
                {place.fileUrl ? (
                  <img
                    src={place.fileUrl}
                    alt={place.city}
                    className="item__info_image"
                  />
                ) : (
                  <></>
                )}
              </div>
              <div className="item__options">
                <p className="bold">
                  Are you sure you want to delete this place?
                </p>
                <button onClick={deletePlace}>Yes</button>
                <Link onClick={goBack}>
                  <button className="cancel">No</button>
                </Link>
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
}

export default PlacesDelete;
