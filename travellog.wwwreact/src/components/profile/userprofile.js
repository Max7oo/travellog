import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Nav from "../nav/nav";
import "./profile.css";

const initialState = {
  id: "",
  profilePicture: "",
  firstName: "",
  lastName: "",
  userName: "",
  citiesVisited: null,
};

function UserProfile() {
  const params = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(initialState);
  const [following, setFollowing] = useState(false);
  const [followerAmount, setFollowerAmount] = useState(0);
  const [followingAmount, setFollowingAmount] = useState(0);

  const userName = localStorage.getItem("UserName");

  useEffect(function () {
    if (localStorage.length === 0) {
      navigate(`/`);
    } else if (userName === params.userName) {
      navigate(`/${userName}`);
    }
  });

  useEffect(
    function () {
      fetch(`${process.env.REACT_APP_API_LINK}/${params.userName}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          localStorage.setItem("OtherUser", JSON.stringify(data));
        });
    },
    [params.userName, setUser]
  );

  useEffect(
    function () {
      fetch(
        `${process.env.REACT_APP_API_LINK}/checkfollowing/${userName}/${params.userName}`
      )
        .then((res) => res.json())
        .then((data) => setFollowing(data));
    },
    [params.userName, userName]
  );

  useEffect(
    function () {
      fetch(
        `${process.env.REACT_APP_API_LINK}/followeramount/${params.userName}`
      )
        .then((res) => res.json())
        .then((data) => setFollowerAmount(data));
    },
    [params.userName]
  );

  useEffect(
    function () {
      fetch(
        `${process.env.REACT_APP_API_LINK}/followingamount/${params.userName}`
      )
        .then((res) => res.json())
        .then((data) => setFollowingAmount(data));
    },
    [params.userName]
  );

  const followUser = async (e) => {
    e.preventDefault();
    await fetch(
      `${process.env.REACT_APP_API_LINK}/addfollower/${userName}/${params.userName}`
    )
      .then(setFollowing(!following))
      .then(
        following
          ? setFollowerAmount(followerAmount - 1)
          : setFollowerAmount(followerAmount + 1)
      );
  };

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
                <div
                  className="profile-picture-normal"
                  style={{ backgroundImage: `url(${user.profilePicture})` }}
                />
                <table>
                  <thead>
                    <tr>
                      <th>Cities visited:</th>
                      <th>{user.citiesVisited}</th>
                    </tr>
                    <tr>
                      <th>First name:</th>
                      <th>{user.firstName}</th>
                    </tr>
                    <tr>
                      <th>Last name:</th>
                      <th>{user.lastName}</th>
                    </tr>
                    <tr>
                      <th>Username:</th>
                      <th>{user.userName}</th>
                    </tr>
                    <tr>
                      <th>Followers:</th>
                      <th>{followerAmount}</th>
                    </tr>
                    <tr>
                      <th>Following:</th>
                      <th>{followingAmount}</th>
                    </tr>
                  </thead>
                </table>
              </div>
              <Link to={`/user/${user.userName}/places`}>
                <button className="view">View places</button>
              </Link>
              {following ? (
                <Link onClick={followUser}>
                  <button className="view">Unfollow</button>
                </Link>
              ) : (
                <Link onClick={followUser}>
                  <button className="view">Follow</button>
                </Link>
              )}
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default UserProfile;
