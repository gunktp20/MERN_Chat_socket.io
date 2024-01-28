import axios from 'axios'
import React , {useContext, useState} from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from "react-router-dom"

function Register() {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { user} = useContext(AuthContext)

    if(user){
        return <Navigate to="/"/>
    }

    const handleSubmit = async () => {
        if (!username || !password || !email) {
            return alert("Please provide all value!")
        }
        const result = await axios.post("http://localhost:5000/api/v1/auth/register", {
            username, password, email
        })
        console.log(result)
    }

    return (
        <div>
            <input placeholder='username' type="value" value={username} onChange={(event) => setUsername(event.target.value)} name="username"></input>
            <input placeholder='email' type="value" value={email} onChange={(event) => setEmail(event.target.value)} name="email"></input>
            <input placeholder='password' type="value" value={password} onChange={(event) => setPassword(event.target.value)} name="password"></input>
            <button onClick={() => {
                handleSubmit()
            }}>Register</button>
        </div>
    )
}

export default Register