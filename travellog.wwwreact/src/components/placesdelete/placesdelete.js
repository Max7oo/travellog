import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom";

import Nav from "../nav/nav";

function PlacesDelete(props) {
    const navigate = useNavigate()
    const params = useParams()

    const { setPlaces } = props
    const [ place, setPlace ] = useState()

    useEffect(function() {
        fetch(`https://localhost:7209/${params.userName}/places/${params.id}`)
          .then(res => res.json())
          .then(data => setPlace(data))
    }, [])

    const deletePlace = async (e) => {
        await fetch(`https://localhost:7209/${params.userName}/places/${params.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }});
        await fetch(`https://localhost:7209/${params.userName}/places`)
        .then(res => res.json())
        .then(data => setPlaces(data))
        navigate('/')
    }

    if (!place) {
        return <div className="spinner-container"><div className="loading-spinner"></div></div>
    } else {
    return (
        <>
            <Nav />
            <section>
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
            </section>
        </>
    )}
}

export default PlacesDelete