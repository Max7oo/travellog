import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"

import PlacesList from './components/PlacesList';
import PlacesView from './components/PlacesView';
import PlacesPost from './components/PlacesPost';
import PlacesEdit from './components/PlacesEdit';
import PlacesDelete from './components/PlacesDelete';

import './App.css';

function App() {
  const [places, setPlaces] = useState([])
  const [loading, setLoading] = useState(false);
  
  useEffect(function() {
    setLoading(true)
    fetch('https://localhost:7209/places/')
      .then(res => res.json())
      .then(data => setPlaces(data))
      .then((e) => {setLoading(false)})
  }, [])

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          <li><Link to="/" element={<PlacesList/>}>Places you have been</Link></li>
          <li><Link to="/places/add" element={<PlacesPost/>}>Add new place</Link></li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path='/' element={<PlacesList loading={loading} places={places} />} />
          <Route path='/places/:id' element={<PlacesView />} />
          <Route path='/places/add' element={<PlacesPost setPlaces={setPlaces} places={places}/>} />
          <Route path='/places/edit/:id' element={<PlacesEdit setPlaces={setPlaces} places={places}/>} />
          <Route path='/places/delete/:id' element={<PlacesDelete setPlaces={setPlaces} places={places}/>} />
        </Routes>
      </main>
    </>
  )
}

export default App;
