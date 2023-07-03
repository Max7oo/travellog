import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import Nav from "../nav/nav";
import "./placesedit.css";

const initialState = {
  country: "",
  city: "",
  rating: "",
  visitedAt: "",
  stayedFor: "",
};

function PlacesEdit(props) {
  const navigate = useNavigate();
  const params = useParams();

  const { setPlaces } = props;
  const userName = localStorage.getItem("UserName")
  const [formData, setFormData] = useState(initialState);

  useEffect(
    function () {
      if (localStorage.length === 0) {
        navigate(`/`)
      } else if (userName !== params.userName) {
        navigate(`/`)
      }
    }
  )

  useEffect(function () {
    fetch(`https://localhost:7209/${userName}/places/${params.id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`https://localhost:7209/${userName}/places`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    await fetch(`https://localhost:7209/${userName}/places`)
      .then((res) => res.json())
      .then((data) => setPlaces(data));
    navigate(`/${params.userName}/places`);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Nav />
      <section>
        <h2>You are editing: {formData.city}</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="country">Country:</label>
          <input
            id="country"
            name="country"
            type="text"
            onChange={handleChange}
            value={formData.country}
          />

          <label htmlFor="city">City:</label>
          <input
            id="city"
            name="city"
            type="text"
            onChange={handleChange}
            value={formData.city}
          />

          <label htmlFor="rating">Rating:</label>
          <input
            id="rating"
            name="rating"
            type="number"
            onChange={handleChange}
            value={formData.rating}
          />

          <label htmlFor="visitedAt">Visited on:</label>
          <input
            id="visitedAt"
            name="visitedAt"
            type="date"
            onChange={handleChange}
            value={formData.visitedAt}
          />

          <label htmlFor="stayedFor">Stayed for (days):</label>
          <input
            id="stayedFor"
            name="stayedFor"
            type="number"
            onChange={handleChange}
            value={formData.stayedFor}
          />

          <div>
            <button type="submit">Save edits</button>
            <Link to={`/${userName}/places`}>
              <button className="cancel">Cancel</button>
            </Link>
          </div>
        </form>
      </section>
    </>
  );
}

export default PlacesEdit;
