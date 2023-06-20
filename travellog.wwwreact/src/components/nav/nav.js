import { Link, useParams } from "react-router-dom";

import "./nav.css";

import location from "../../images/location.svg";
import Home from "../home/home";

function Nav() {
  const params = useParams();

  if (!params.userName) {
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
                <li>Login</li>
              </Link>
              <Link to="/signup">
                <li>Sign up</li>
              </Link>
            </div>
          </ul>
        </nav>
      </>
    );
  } else {
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
              <Link to={`/${params.userName}/places`}>
                <li>Places you have been</li>
              </Link>
              <Link to={`/${params.userName}/places/add`}>
                <li>Add new place</li>
              </Link>
              <Link to="/login">
                <li>Log out</li>
              </Link>
            </div>
          </ul>
        </nav>
      </>
    );
  }
}

export default Nav;