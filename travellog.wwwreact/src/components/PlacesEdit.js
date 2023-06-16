import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom";

import Nav from "./Nav"

const initialState = {
    country: "",
    city: "",
    rating: "",
    visitedAt: "",
    stayedFor: ""
  };

function PlacesEdit(props) {
  const navigate = useNavigate()
  const params = useParams()

  const { setPlaces } = props
  const [ formData, setFormData ] = useState(initialState)

  useEffect(function() {
    fetch(`https://localhost:7209/${params.userName}/places/${params.id}`)
      .then(res => res.json())
      .then(data => setFormData(data))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`https://localhost:7209/${params.userName}/places`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    });
    await fetch(`https://localhost:7209/${params.userName}/places`)
    .then(res => res.json())
    .then(data => setPlaces(data))
    navigate(`/${params.userName}/places`)
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value })
  };

  return (
    <>
      <Nav />
      <form className="form-stack contact-form" onSubmit={handleSubmit}>
        <h2>Edit place</h2>

        <label htmlFor="country">country:</label>
        <input id="country" name="country" type="text" onChange={handleChange} value={formData.country}  />

        <label htmlFor="city">city:</label>
        <input id="city" name="city" type="text" onChange={handleChange} value={formData.city} />

        <label htmlFor="rating">rating:</label>
        <input id="rating" name="rating" type="number" onChange={handleChange} value={formData.rating} />

        <label htmlFor="visitedAt">City:</label>
        <input id="visitedAt" name="visitedAt" type="date" onChange={handleChange} value={formData.visitedAt} />

        <label htmlFor="stayedFor">stayedFor:</label>
        <input id="stayedFor" name="stayedFor" type="number" onChange={handleChange} value={formData.stayedFor} />

        <div className="actions-section">
          <button className="button blue" type="submit">
            Save edits
          </button>
          <button className="button blue">
          <Link to={`/${params.userName}/places`}>Cancel</Link>
          </button>
        </div>
      </form>
    </>
  )
}

export default PlacesEdit
