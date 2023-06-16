import { useState } from "react"
import { Route, Routes } from "react-router-dom"

import Nav from "./components/Nav"
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import PlacesList from './components/PlacesList';
import PlacesView from './components/PlacesView';
import PlacesPost from './components/PlacesPost';
import PlacesEdit from './components/PlacesEdit';
import PlacesDelete from './components/PlacesDelete';
import PlacesRequest from "./components/PlacesRequest";

import './App.css';

function App() {
  const [places, setPlaces] = useState([])

  return (
    <>
      <main>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/:userName/places' element={<PlacesList setPlaces={setPlaces} places={places} />} />
          <Route path='/:userName/places/:id' element={<PlacesView />} />
          <Route path='/:userName/places/add' element={<PlacesPost setPlaces={setPlaces} places={places} />} />
          <Route path='/:userName/places/edit/:id' element={<PlacesEdit setPlaces={setPlaces} places={places} />} />
          <Route path='/:userName/places/delete/:id' element={<PlacesDelete />} />
          <Route path='/:userName/places/request' element={<PlacesRequest />} />
        </Routes>
      </main>
    </>
  )
}

export default App;
