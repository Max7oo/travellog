import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Nav from "../nav/nav";

const initialState = {
  userName: "",
  password: "",
};

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);
  const [isShown, setIsShown] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(
      `https://localhost:7209/users/${formData.userName}/${formData.password}`
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
          navigate(`/${formData.userName}/places`);
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
      <section className="fs">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>

          <label htmlFor="userName">Username:</label>
          <input
            id="userName"
            name="userName"
            type="text"
            placeholder="username"
            required
            onChange={handleChange}
            value={formData.userName}
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
      </section>
    </>
  );
}

export default Login;
