import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Nav from "../nav/nav";

const initialState = {
  country: "",
  city: "",
  rating: "",
  visitedAt: "",
  stayedFor: "",
  uploadImage: ""
};

function PlacesPost(props) {
  const navigate = useNavigate();
  const params = useParams();

  const { setPlaces, places } = props;
  const userName = localStorage.getItem("UserName");
  const [formData, setFormData] = useState(initialState);

  useEffect(function () {
    if (localStorage.length === 0) {
      navigate(`/`);
    } else if (userName !== params.userName) {
      navigate(`/`);
    }
  });

  const handleSubmit = async (e) => {
    console.log(formData)
    e.preventDefault();
    const res = await fetch(`https://localhost:7209/${userName}/places`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    res.json().then((data) => {
      setPlaces([...places, data]);
      navigate(`/${userName}/places`);
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Nav />
      <section>
        <form className="form-stack contact-form" onSubmit={handleSubmit}>
          <h2>Add place</h2>

          <label htmlFor="country">Country:</label>
          <input
            id="country"
            name="country"
            type="text"
            placeholder="The Netherlands"
            onChange={handleChange}
            value={formData.country}
          />

          <label htmlFor="city">City:</label>
          <input
            id="city"
            name="city"
            type="text"
            placeholder="Amsterdam"
            onChange={handleChange}
            value={formData.city}
          />

          <label htmlFor="rating">Rating:</label>
          <input
            id="rating"
            name="rating"
            type="number"
            placeholder="10"
            onChange={handleChange}
            value={formData.rating}
          />

          <label htmlFor="visitedAt">Visited at:</label>
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
            placeholder="∞"
            onChange={handleChange}
            value={formData.stayedFor}
          />

          <label htmlFor="uploadImage">Upload image:</label>
          <input id="uploadImage" name="uploadImage" type="file" accept="image/png, image/jpeg" onChange={handleChange} />

          <div className="actions-section">
            <button className="button blue" type="submit">
              Create
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default PlacesPost;
