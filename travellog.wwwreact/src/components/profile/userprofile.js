import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Nav from "../nav/nav";
import "./profile.css"

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
          fetch(`https://localhost:7209/${params.userName}`)
            .then((res) => res.json())
            .then((data) => setUser(data))
        },
        [params.userName, setUser]
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
                <h2>{user.firstName} {user.lastName}</h2>
                <div className="item__info">
                            <div className="profile-picture-normal" style={{backgroundImage: `url(${user.profilePicture})`}}/>
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
                        </thead>
                    </table>
                </div>
                            <Link to={`/${user.userName}/places`}>
                              <button className="view">View places</button>
                            </Link>
            </section>
        </>
    );
      }
}

export default UserProfile;