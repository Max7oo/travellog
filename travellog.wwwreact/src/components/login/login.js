import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Nav from "../nav/nav";

const initialState = {
  email: "",
  password: "",
};

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);
  const [users, setUsers] = useState([]);
  const [isEmailPassword, setIsEmailPassword] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  useEffect(function () {
    fetch("https://localhost:7209/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (var i = 0; i < users.length; i++) {
      if (users[i].email === formData.email) {
        if (users[i].password === formData.password) {
          const user = { id: users[i].id, userName: users[i].userName };
          navigate(`/${user.userName}/places`);
        } else {
          setIsPassword((current) => !current);
        }
      } else {
        setIsEmailPassword((current) => !current);
      }
    }
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
            type="email"
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
          {isPassword && <p className="red">Password is wrong.</p>}
          {isEmailPassword && (
            <p className="red">Email and/or password is wrong.</p>
          )}

          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
