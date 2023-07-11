import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./home.css";

import Nav from "../nav/nav";
import earth from "../../images/earth.png";
import plane from "../../images/plane.svg";


function Home() {
  const navigate = useNavigate()
  const userName = localStorage.getItem("UserName");

  useEffect(function() {
      if (userName) {
        navigate(`/${userName}/places`);
      }
    }
  )

  if (!userName) {
  return (
    <>
      <Nav />
      <header>
        <div className="header__left">
          <p>Using AI to make travel planning easier</p>
          <h1>Let's Find Your Next Travel Destination</h1>
          <Link to={`/login`}>
            <div className="header__left__cta">
              <span>
                <p>Start by logging previous destinations</p>
                <img
                  src={plane}
                  className="header__left__cta__plane"
                  alt="Plane icon"
                />
              </span>
            </div>
          </Link>
        </div>
        <div className="header__right">
          <img
            src={earth}
            className="header__right__img"
            alt="Earth with plane flying around it"
          />
        </div>
      </header>
    </>
  )} 
}

export default Home;
