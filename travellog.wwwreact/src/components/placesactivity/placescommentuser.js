import { useEffect, useState } from "react";
import "./placesactivity.css";

function PlacesComments({ id }) {
  const [user, setUser] = useState([]);

  useEffect(
    function () {
      fetch(`https://localhost:7209/user/${id}`)
        .then((res) => res.json())
        .then((data) => setUser(data));
    },
    [id, setUser]
  );

  return (
    <>
      <div
        className="profile-picture-mini"
        style={{ backgroundImage: `url(${user.profilePicture})` }}
      />
    </>
  );
}

export default PlacesComments;
