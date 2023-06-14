import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom";

function PlacesDelete(props) {
    const { setPlaces } = props
    const [place, setPlace] = useState()
  
    const navigate = useNavigate()
    const params = useParams()

    useEffect(function() {
        fetch(`https://localhost:7209/places/${params.id}`)
          .then(res => res.json())
          .then(data => setPlace(data))
    }, [])

    const deletePlace = async (e) => {
        await fetch(`https://localhost:7209/places/${params.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }});
        await fetch("https://localhost:7209/places")
        .then(res => res.json())
        .then(data => setPlaces(data))
        navigate('/')
    }

    if (!place) {
        return <p>Loading</p>
    }

    return (
        <div>
            <div>
                <p>{place.country}</p>
                <p>{place.city}</p>
                <p>{place.rating}</p>
                <p>{place.visitedAt}</p>
                <p>{place.stayedFor}</p>
            </div>
            <div>
                <p>Are you sure you want to delete this place?</p>
                <button className="button blue" onClick={deletePlace}>
                Yes
                </button>
                <button className="button blue">
                <Link to={'/'}>No</Link>
                </button>
            </div>
        </div>
    )
}

export default PlacesDelete