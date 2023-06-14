import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


function PlacesView() {
  const [place, setPlace] = useState(false)

  const params = useParams()

  useEffect(function() {
    fetch(`https://localhost:7209/places/${params.id}`)
      .then(res => res.json())
      .then(data => setPlace(data))
  }, [])

  if (!place) {
    return <p>Loading</p>
  }

  return (
    <div>
      <p>{place.country}</p>
      <p>{place.city}</p>
      <p>{place.rating}</p>
      <p>{place.visitedAt}</p>
      <p>{place.stayedFor}</p>
    </div>
  )
}

export default PlacesView