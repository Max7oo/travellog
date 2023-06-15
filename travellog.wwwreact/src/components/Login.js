import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

import Nav from "./Nav";

const initialState = {
    email: "",
    password: ""
};

function Login() {
    const navigate = useNavigate()

    const [ formData, setFormData ] = useState(initialState)
    const [ users, setUsers ] = useState([])
  
    useEffect(function() {
        fetch('https://localhost:7209/users')
        .then(res => res.json())
        .then(data => setUsers(...users, data))
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        for (var i = 0; i < users.length; i++) {
            if (users[i].email === formData.email) {
                if (users[i].password === formData.password) {
                    navigate(`/${users[i].userName}/places`);
                } else {
                    console.log("Wrong password")
                }
            } else {
                console.log("Wrong email and/or password")
            }
        }
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value })
    };

    return (
        <>
            <Nav />
            <form className="form-stack contact-form" onSubmit={handleSubmit}>
                <h2>Login</h2>

                <label htmlFor="email">email:</label>
                <input id="email" name="email" type="email" required onChange={handleChange} value={formData.email}  />

                <label htmlFor="password">password:</label>
                <input id="password" name="password" type="password" minLength="8" required onChange={handleChange} value={formData.password} />

                <div className="actions-section">
                    <button className="button blue" type="submit">
                    Login
                    </button>
                </div>
            </form>
        </>
    )
}

export default Login