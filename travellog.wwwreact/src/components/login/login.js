import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Nav from "../nav/nav";

const initialState = {
  email: "",
  password: "",
};

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);
  const [isShown, setIsShown] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(
      `${process.env.REACT_APP_API_LINK}/users/${formData.email}/${formData.password}`
    )
      .then((res) => {
        if (!res.ok) {
          setIsShown(true);
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          localStorage.setItem("UserId", data.id);
          localStorage.setItem("UserName", data.userName);
          localStorage.setItem("Email", data.email);
          localStorage.setItem("ProfilePicture", data.profilePicture);
          navigate(`/${data.userName}/places`);
        }
      })
      .catch((e) => {});
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Nav />
      <section>
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>

          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="email@email.com"
            required
            onChange={handleChange}
            value={formData.email}
          />

          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            minLength="8"
            required
            onChange={handleChange}
            value={formData.password}
          />
          {isShown && <p className="red">Email and/or password is wrong</p>}
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
        <Link to={`/signup`} className="sub-link">
          Create new account
        </Link>
      </section>
    </>
  );
}

export default Login;
