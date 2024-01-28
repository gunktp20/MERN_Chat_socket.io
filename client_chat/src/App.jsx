import "./App.css"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from "./pages/Login"
import Register from "./pages/Register"
import Chat from "./pages/Chat"
import { useContext } from "react"
import { ChatContextProvider } from "./context/ChatContext"
import { AuthContext } from "./context/AuthContext"

function App() {

  const { user } = useContext(AuthContext)

  return (
    <ChatContextProvider user={user}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <Chat /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} /> 
        </Routes>
      </BrowserRouter>
    </ChatContextProvider>
  )
}

export default App
