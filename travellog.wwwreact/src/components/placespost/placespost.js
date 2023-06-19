import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

import Nav from "../nav/nav";

const initialState = {
  country: "",
  city: "",
  rating: "",
  visitedAt: "",
  stayedFor: ""
};

function PlacesPost(props) {
  const navigate = useNavigate()
  const params = useParams()

  const { setPlaces, places } = props
  const [ formData, setFormData ] = useState(initialState)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`https://localhost:7209/${params.userName}/places`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    });
    res.json().then(data => {
      setPlaces([...places, data])
      navigate(`/${params.userName}/places`)
    })
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value })
  };

  return (
    <>
      <Nav />
      <section>
        <form className="form-stack contact-form" onSubmit={handleSubmit}>
          <h2>Create place</h2>

          <label htmlFor="country">country</label>
          <input id="country" name="country" type="text" onChange={handleChange} value={formData.country}  />

          <label htmlFor="city">city:</label>
          <input id="city" name="city" type="text" onChange={handleChange} value={formData.city} />

          <label htmlFor="rating">rating:</label>
          <input id="rating" name="rating" type="number" onChange={handleChange} value={formData.rating} />

          <label htmlFor="visitedAt">visitedAt:</label>
          <input id="visitedAt" name="visitedAt" type="date" onChange={handleChange} value={formData.visitedAt} />

          <label htmlFor="stayedFor">stayedFor:</label>
          <input id="stayedFor" name="stayedFor" type="number" onChange={handleChange} value={formData.stayedFor} />

          <div className="actions-section">
            <button className="button blue" type="submit">
              Create
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default PlacesPost