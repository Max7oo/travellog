import { useEffect, useState } from "react";
import "./placesactivity.css";
import { Link } from "react-router-dom";

function PlacesComments({ id, postedAt, text }) {
  // const [user, setUser] = useState([]);
  const [time, setTime] = useState();
  const [now, setNow] = useState();
  const [then, setThen] = useState();

  if (now == null) {
    setNow(parseInt(Date.now().toString()));
  }
  if (then == null) {
    setThen(parseInt(postedAt.toString()));
  }

  // useEffect(
  //   function () {
  //     fetch(`https://localhost:7209/user/${id}`)
  //       .then((res) => res.json())
  //       .then((data) => setUser(data));
  //   },
  //   [id, setUser]
  // );

  useEffect(
    function () {
      let value = (now - then) / 1000 / 60;

      if (value <= 60) {
        setTime(`${Math.round(value)}m`);
      } else if (value > 60 && value < 1440) {
        value = value / 60;
        setTime(`${Math.round(value)}h`);
      } else if (value >= 1440) {
        value = value / 1440;
        setTime(`${Math.round(value)}d`);
      }
    },
    [now, setTime, then]
  );

  return (
    <>
      <div className="activity__comment__single">
        <Link to={`/user/max-de-ruiter-1690891947066`}>
          <div
            className="profile-picture-mini"
            style={{
              // backgroundImage: `url(${user.profilePicture})`,
              backgroundImage: `url(https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png)`,
            }}
          />
        </Link>
        <div>
          <div className="activity__comment__info">
            <Link to={`/user/max-de-ruiter-1690891947066`} className="bold">
              {/* {user.firstName + " " + user.lastName} */}
              @Too many database instances
            </Link>
            <p>{time}</p>
          </div>
          <p>{text}</p>
        </div>
      </div>
    </>
  );
}

export default PlacesComments;
