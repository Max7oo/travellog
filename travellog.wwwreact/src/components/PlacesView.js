import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import Nav from "./Nav";

function PlacesView() {
  const params = useParams()

  const [ place, setPlace ] = useState(false)

  useEffect(function() {
    fetch(`https://localhost:7209/${params.userName}/places/${params.id}`)
      .then(res => res.json())
      .then(data => setPlace(data))
  })

  if (!place) {
      return <div className="spinner-container"><div className="loading-spinner"></div></div>
  } else {
  return (
    <>
      <Nav />
      <div>
        <p>{place.country}</p>
        <p>{place.city}</p>
        <p>{place.rating}</p>
        <p>{place.visitedAt}</p>
        <p>{place.stayedFor}</p>
      </div>
    </>
  )}
}

export default PlacesView