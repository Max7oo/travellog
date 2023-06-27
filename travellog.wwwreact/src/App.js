import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./components/home/home";
import Login from "./components/login/login";
import SignUp from "./components/signup/signup";
import PlacesList from "./components/placeslist/placeslist";
import PlacesView from "./components/placesview/placesview";
import PlacesPost from "./components/placespost/placespost";
import PlacesEdit from "./components/placesedit/placesedit";
import PlacesDelete from "./components/placesdelete/placesdelete";
import PlacesRequest from "./components/placesrequest/placesrequest";
import Footer from "./components/footer/footer";

import "./App.css";
import PlacesSuggested from "./components/placessuggested/placessuggested";
import SuggestedView from "./components/placessuggested/suggestedview";


function App() {
  const [places, setPlaces] = useState([]);

  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/:userName/places"
            element={<PlacesList places={places} setPlaces={setPlaces} />}
          />
          <Route path="/:userName/places/:id" element={<PlacesView />} />
          <Route
            path="/:userName/places/add"
            element={<PlacesPost places={places} setPlaces={setPlaces} />}
          />
          <Route
            path="/:userName/places/edit/:id"
            element={<PlacesEdit places={places} setPlaces={setPlaces} />}
          />
          <Route
            path="/:userName/places/delete/:id"
            element={<PlacesDelete places={places} setPlaces={setPlaces} />}
          />
          <Route path="/:userName/places/request" element={<PlacesRequest />} />
          <Route
            path="/:userName/places/suggested"
            element={<PlacesSuggested />}
          />
          <Route
            path="/:userName/places/suggested/:id"
            element={<SuggestedView />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
