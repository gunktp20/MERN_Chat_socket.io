import { createContext, useState } from "react";

export const AuthContext = createContext()

const user = localStorage.getItem("user")
const token = localStorage.getItem("token")

const initialState = {
    user: user ? JSON.parse(user) : null,
    token: token,
}

export const AuthContextProvider = ({ children }) => {

    const [state, setState] = useState(initialState)

    const setupUser = (user,token) =>{
        setState({...state,user:user,token:token})
    }

    return <AuthContext.Provider value={{
        ...state,
        setupUser
    }}>
        {children}
    </AuthContext.Provider>
}