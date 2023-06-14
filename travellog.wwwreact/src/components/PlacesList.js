import { useState } from "react"
import { Link } from "react-router-dom"

function PlacesList(props) {
  const { loading, places, setPlaces } = props
  const [ order, setOrder ] = useState("ASC");

  const cityList = []
  function addToCityList(place) {
    if (cityList.includes(place.city)) {
      cityList.splice(cityList.indexOf(`${place.city}`), 1)
    } else {
    cityList.push(place.city);
    }
    console.log(cityList);
  }

  const sortingABC = (col) => {
    if (order === "ASC") {
      const sorted = [...places].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      )
      setPlaces(sorted)
      setOrder("DSC")
    }
    if (order === "DSC") {
      const sorted = [...places].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      )
      setPlaces(sorted)
      setOrder("ASC")
    }
  }

  const sortingNUM = (col) => {
    if (order === "ASC") {
      const sorted = [...places].sort((a, b) =>
        a[col] > b[col] ? 1 : -1
      )
      setPlaces(sorted)
      setOrder("DSC")
    }
    if (order === "DSC") {
      const sorted = [...places].sort((a, b) =>
        a[col] < b[col] ? 1 : -1
      )
      setPlaces(sorted)
      setOrder("ASC")
    }
  }

  return (
    <>
      <header>
        <h2>Places</h2>
      </header>
      <table>
        <thead>
          <tr>
            <th></th>
            <th onClick={() => sortingABC("country")}>Country</th>
            <th onClick={() => sortingABC("city")}>City</th>
            <th onClick={() => sortingNUM("rating")}>Rating</th>
            <th>VisitedAt</th>
            <th onClick={() => sortingNUM("stayedFor")}>StayedFor</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (<div className="spinner-container"><div className="loading-spinner"></div></div>) : (<></>)}
          {places.map((place, index) => {
            const { country, city, rating, visitedAt, stayedFor } = place
            return (
              <tr key={index}>
                <th><input type="checkbox" id={place.city} name="addToCityList" onClick={() => addToCityList(place)}/></th>
                <th>{country}</th>
                <th>{city}</th>
                <th>{rating}</th>
                <th>{visitedAt}</th>
                <th>{stayedFor}</th>
                <th><Link to={`/places/${place.id}`}>View</Link>
                    <Link to={`/places/edit/${place.id}`}>Edit</Link>
                    <Link to={`/places/delete/${place.id}`}>Delete</Link></th>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Link to={`/places/request`} state={{ cityList: cityList }}>Request</Link>
    </>
  )
}

export default PlacesList