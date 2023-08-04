import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Nav from "../nav/nav";
import "./profile.css";
import Mapbox from "../mapbox/mapbox";

const initialState = {
  id: "",
  profilePicture: "",
  firstName: "",
  lastName: "",
  userName: "",
  citiesVisited: null,
  email: "",
};

function Profile() {
  const params = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(initialState);
  const [followerAmount, setFollowerAmount] = useState(0);
  const [followingAmount, setFollowingAmount] = useState(0);

  const userName = localStorage.getItem("UserName");
  const email = localStorage.getItem("Email");

  useEffect(function () {
    if (localStorage.length === 0) {
      navigate(`/`);
    } else if (userName !== params.userName) {
      navigate(`/`);
    }
  });

  useEffect(
    function () {
      fetch(`https://localhost:7209/${userName}/${email}`)
        .then((res) => res.json())
        .then((data) => setUser(data));
    },
    [userName, email, setUser]
  );

  useEffect(
    function () {
      fetch(`https://localhost:7209/followeramount/${userName}`)
        .then((res) => res.json())
        .then((data) => setFollowerAmount(data));
    },
    [userName]
  );

  useEffect(
    function () {
      fetch(`https://localhost:7209/followingamount/${userName}`)
        .then((res) => res.json())
        .then((data) => setFollowingAmount(data));
    },
    [userName]
  );

  if (!user) {
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
          <h2>
            {user.firstName} {user.lastName}
          </h2>
          <div className="flex">
            <div className="first">
              <div className="item__info">
                {user.profilePicture ? (
                  <div
                    className="profile-picture-normal"
                    style={{ backgroundImage: `url(${user.profilePicture})` }}
                  />
                ) : (
                  <></>
                )}
                <table>
                  <thead>
                    <tr>
                      <th>Cities visited:</th>
                      <th>{user.citiesVisited}</th>
                    </tr>
                    <tr>
                      <th>Your first name:</th>
                      <th>{user.firstName}</th>
                    </tr>
                    <tr>
                      <th>Your last name:</th>
                      <th>{user.lastName}</th>
                    </tr>
                    <tr>
                      <th>Your username:</th>
                      <th>{userName}</th>
                    </tr>
                    <tr>
                      <th>Your email:</th>
                      <th>{email}</th>
                    </tr>
                    <tr>
                      <th>Followers:</th>
                      <th>{followerAmount}</th>
                    </tr>
                    <tr>
                      <th>Following:</th>
                      <th>{followingAmount}</th>
                    </tr>
                    <tr>
                      <th>Share profile:</th>
                      <th>{`www.travellog.com/${userName}`}</th>
                    </tr>
                  </thead>
                </table>
              </div>
              <Link to={`/${userName}/edit`}>
                <button className="edit">Edit profile</button>
              </Link>
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

export default Profile;
