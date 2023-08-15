import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./components/home/home";
import Login from "./components/login/login";
import SignUp from "./components/signup/signup";
import Profile from "./components/profile/profile";
import EditProfile from "./components/profile/editprofile";
import UserProfile from "./components/profile/userprofile";
import PlacesList from "./components/placeslist/placeslist";
import PlacesView from "./components/placesview/placesview";
import PlacesPost from "./components/placespost/placespost";
import PlacesEdit from "./components/placesedit/placesedit";
import PlacesDelete from "./components/placesdelete/placesdelete";
import PlacesAdvice from "./components/placesadvice/placesadvice";
import PlacesActivity from "./components/placesactivity/placesactivity";
import UserPlacesList from "./components/placeslist/userplaceslist";
import PlacesSuggested from "./components/placessuggested/placessuggested";
import SuggestedView from "./components/placessuggested/suggestedview";
import Footer from "./components/footer/footer";

import "./App.css";

import ReactGA from "react-ga";
const TRACKING_ID = "G-9RXB64N0SD"; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

function App() {
  const [places, setPlaces] = useState([]);

  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/:userName" element={<Profile places={places} />} />
          <Route path="/:userName/edit" element={<EditProfile />} />
          <Route path="/user/:userName" element={<UserProfile />} />
          <Route
            path="/:userName/places"
            element={<PlacesList places={places} setPlaces={setPlaces} />}
          />
          <Route path="/user/:userName/places" element={<UserPlacesList />} />
          <Route
            path="/:userName/places/:id"
            element={<PlacesView places={places} setPlaces={setPlaces} />}
          />
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
          <Route
            path="/:userName/activity"
            element={<PlacesActivity places={places} setPlaces={setPlaces} />}
          />
          <Route
            path="/:userName/places/advice"
            element={<PlacesAdvice places={places} setPlaces={setPlaces} />}
          />
          <Route
            path="/:userName/places/suggested"
            element={<PlacesSuggested places={places} setPlaces={setPlaces} />}
          />
          <Route
            path="/:userName/places/suggested/:id"
            element={<SuggestedView places={places} setPlaces={setPlaces} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
