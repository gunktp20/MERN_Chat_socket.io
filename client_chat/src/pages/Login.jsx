import React, { useContext, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const { setupUser , user} = useContext(AuthContext)

    if(user){
        return <Navigate to="/"/>
    }

    const handleSubmit = async () => {

        if (!username || !password) {
            return alert("Please provide all value!")
        }
        const result = await axios.post("http://localhost:5000/api/v1/auth/login", {
            username, password
        })

        localStorage.setItem("user",JSON.stringify(result.data.user))
        localStorage.setItem("token",result.data.token)
        setupUser(JSON.stringify(result.data.user,result.data.token))
    }

    return (
        <div>
            <input placeholder='username' type="value" value={username} onChange={(event) => setUsername(event.target.value)} name="username"></input>
            <input placeholder='password' type="value" value={password} onChange={(event) => setPassword(event.target.value)} name="password"></input>
            <button onClick={() => {
                handleSubmit()
            }}>Login</button>
        </div>
    )
}

export default Login