import { useState } from "react"
import { Route, Routes } from "react-router-dom"

import Home from "./components/home/home";
import Login from "./components/login/login";
import SignUp from "./components/signup/signup";
import PlacesList from './components/placeslist/placeslist';
import PlacesView from './components/placesview/placesview';
import PlacesPost from './components/placespost/placespost';
import PlacesEdit from './components/placesedit/placesedit';
import PlacesDelete from './components/placesdelete/placesdelete';
import PlacesRequest from "./components/placesrequest/placesrequest";

import './App.css';

function App() {
  const [ places, setPlaces ] = useState([])

  return (
    <>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
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
