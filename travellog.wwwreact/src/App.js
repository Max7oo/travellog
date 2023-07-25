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
import PlacesSuggested from "./components/placessuggested/placessuggested";
import SuggestedView from "./components/placessuggested/suggestedview";
import Footer from "./components/footer/footer";

import "./App.css";

function App() {
  const [places, setPlaces] = useState([]);

  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/:userName" element={<Profile />} />
          <Route path="/:userName/edit" element={<EditProfile />} />
          <Route path="/user/:userName" element={<UserProfile />} />
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
          <Route path="/:userName/activity" element={<PlacesActivity />} />
          <Route
            path="/:userName/places/advice"
            element={<PlacesAdvice places={places} setPlaces={setPlaces} />}
          />
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
