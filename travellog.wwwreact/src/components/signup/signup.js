import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Nav from "../nav/nav";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("https://localhost:7209/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    navigate("/login");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Nav />
      <section>
        <form onSubmit={handleSubmit}>
          <h2>Sign up</h2>

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

          <div>
            <button type="submit">Create account</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default SignUp;
