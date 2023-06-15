import { Link, useParams } from "react-router-dom"

import Login from "./Login";
import SignUp from "./SignUp";
import PlacesList from "./PlacesList";
import PlacesPost from "./PlacesPost";

function Nav() {
    const params = useParams()

    if (!params.userName) {
    return (
        <>
            <nav>
                <h2>Menu</h2>
                <ul>
                    <li><Link to="/login" element={<Login />}>Login</Link></li>
                    <li><Link to="/signup" element={<SignUp />}>SignUp</Link></li>
                </ul>
            </nav>
        </>
    )} else {
    return (
        <>
            <nav>
                <h2>Menu</h2>
                <ul>
                    <li><Link to="/places" element={<PlacesList />}>Places you have been</Link></li>
                    <li><Link to="/places/add" element={<PlacesPost />}>Add new place</Link></li>
                    <li><Link to="/login" element={<Login />}>Log out</Link></li>
                </ul>
            </nav>
        </>
    )}
}

export default Nav
