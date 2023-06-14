import { Link } from "react-router-dom"

function PlacesList(props) {
  
  const { loading, places } = props

  return (
    <>
      <header>
        <h2>Places</h2>
      </header>
      <ul className="contacts-list">
      {loading ? <div className="spinner-container"><div className="loading-spinner"></div></div> : <></>}
        {places.map((place, index) => {
          const { country, city, rating, visitedAt, stayedFor } = place
          return (
            <li className="place" key={index}>
              <p>
                {country} {city} {rating} {visitedAt} {stayedFor}
              </p>
              <p>
                <Link to={`/places/${place.id}`}>View</Link>
                <Link to={`/places/edit/${place.id}`}>Edit</Link>
                <Link to={`/places/delete/${place.id}`}>Delete</Link>
              </p>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default PlacesList