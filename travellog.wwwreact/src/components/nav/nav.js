import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./nav.css";

import location from "../../images/location.svg";
import Home from "../home/home";
import SearchBar from "../search/searchbar";
import SearchResults from "../search/searchresults";

function Nav() {
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);
  const userName = localStorage.getItem("UserName");
  const profilePicture = localStorage.getItem("ProfilePicture");
  const [results, setResults] = useState([]);

  const handleLogOut = async (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate(`/`);
  };

  const handleClick = async (e) => {
    setOpenMenu((openMenu) => !openMenu);
  };

  if (!userName) {
    return (
      <>
        <nav>
          <ul>
            <Link to="/" element={<Home />}>
              <span>
                <img src={location} alt="Location marker" />
                <li>Travellog</li>
              </span>
            </Link>
            <div className="nav__cta">
              <Link to="/login">
                <li
                  className={
                    window.location.pathname.toString() === "/login"
                      ? "current-page-desktop"
                      : ""
                  }
                >
                  Login
                </li>
              </Link>
              <Link to="/signup">
                <li
                  className={
                    window.location.pathname.toString() === "/signup"
                      ? "current-page-desktop"
                      : ""
                  }
                >
                  Sign up
                </li>
              </Link>
            </div>
            <div
              className={openMenu ? "nav__mobile is-active" : "nav__mobile"}
              onClick={handleClick}
            >
              <li>Menu</li>
            </div>
            <nav
              className={
                openMenu ? "nav__mobile__items__active" : "nav__mobile__items"
              }
            >
              <Link to="/" onClick={handleClick}>
                <li
                  className={
                    window.location.pathname.toString() === "/"
                      ? "current-page"
                      : ""
                  }
                >
                  Home
                </li>
              </Link>
              <Link to="/login" onClick={handleClick}>
                <li
                  className={
                    window.location.pathname.toString() === "/login"
                      ? "current-page"
                      : ""
                  }
                >
                  Login
                </li>
              </Link>
              <Link to="/signup" onClick={handleClick}>
                <li
                  className={
                    window.location.pathname.toString() === "/signup"
                      ? "current-page"
                      : ""
                  }
                >
                  Sign up
                </li>
              </Link>
            </nav>
          </ul>
        </nav>
      </>
    );
  } else {
    return (
      <>
        <nav>
          <ul>
            <Link to={`/${userName}/places`}>
              <span>
                <img src={location} alt="Location marker" />
                <li>Travellog</li>
              </span>
            </Link>
            <div className="nav__cta">
              <Link to={`/${userName}`}>
                <li
                  className={
                    window.location.pathname.toString() === "/" + userName
                      ? "current-page-desktop"
                      : ""
                  }
                >
                  Profile
                </li>
              </Link>
              <Link to={`/${userName}/places`}>
                <li
                  className={
                    window.location.pathname.toString() ===
                    "/" + userName + "/places"
                      ? "current-page-desktop"
                      : ""
                  }
                >
                  Places
                </li>
              </Link>
              <Link to={`/${userName}/activity`}>
                <li
                  className={
                    window.location.pathname.toString() ===
                    "/" + userName + "/activity"
                      ? "current-page-desktop"
                      : ""
                  }
                >
                  Activity
                </li>
              </Link>
              <Link to={`/${userName}/places/advice`}>
                <li
                  className={
                    window.location.pathname.toString() ===
                    "/" + userName + "/places/advice"
                      ? "current-page-desktop"
                      : ""
                  }
                >
                  Travel advice
                </li>
              </Link>
              <div className="searchbar">
                <SearchBar setResults={setResults} />
                <SearchResults results={results} />
              </div>
              <Link onClick={handleLogOut}>
                <li>Log out</li>
              </Link>
            </div>
            <div
              className={openMenu ? "nav__mobile is-active" : "nav__mobile"}
              onClick={handleClick}
            >
              <li>Menu</li>
            </div>
            <nav
              className={
                openMenu ? "nav__mobile__items__active" : "nav__mobile__items"
              }
            >
              <Link to={`/${userName}`}>
                <img
                  src={profilePicture}
                  className="profile-picture-mini"
                  alt={userName}
                />
              </Link>
              <Link to={`/${userName}/places`}>
                <li
                  className={
                    window.location.pathname.toString() ===
                    "/" + userName + "/places"
                      ? "current-page"
                      : ""
                  }
                >
                  Places
                </li>
              </Link>
              <Link to={`/${userName}/activity`}>
                <li
                  className={
                    window.location.pathname.toString() ===
                    "/" + userName + "/activity"
                      ? "current-page-desktop"
                      : ""
                  }
                >
                  Activity
                </li>
              </Link>
              <Link to={`/${userName}/places/advice`}>
                <li
                  className={
                    window.location.pathname.toString() ===
                    "/" + userName + "/places/advice"
                      ? "current-page-desktop"
                      : ""
                  }
                >
                  Travel advice
                </li>
              </Link>
              <Link onClick={handleLogOut}>
                <li>Log out</li>
              </Link>
            </nav>
          </ul>
        </nav>
      </>
    );
  }
}

export default Nav;
