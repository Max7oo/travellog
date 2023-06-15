import { useNavigate } from "react-router-dom";
import { useState } from "react"

import Nav from "./Nav";

const initialState = {
    userName: "",
    email: "",
    password: ""
};

function SignUp() {
    const navigate = useNavigate()
    
    const [ formData, setFormData ] = useState(initialState)

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch("https://localhost:7209/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
        });
        navigate('/login')
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value })
    };

    return (
        <>
            <Nav />
            <form className="form-stack contact-form" onSubmit={handleSubmit}>
                <h2>Sign up</h2>

                <label htmlFor="userName">userName:</label>
                <input id="userName" name="userName" type="text" required onChange={handleChange} value={formData.userName}  />

                <label htmlFor="email">email:</label>
                <input id="email" name="email" type="email" required onChange={handleChange} value={formData.email} />

                <label htmlFor="password">password:</label>
                <input id="password" name="password" type="password" minLength="8" required onChange={handleChange} value={formData.password} />

                <div className="actions-section">
                    <button className="button blue" type="submit">
                    Create account
                    </button>
                </div>
            </form>
        </>
    )
}

export default SignUp