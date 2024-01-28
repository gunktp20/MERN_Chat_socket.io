import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null)
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null)
    const [chatSelected, setChatSelected] = useState(null)
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [newMessage, setMessage] = useState(null)
    const [recipientId , setRecipientId] = useState(null)
    useEffect(() => {
        const newSocket = io("http://localhost:3000");
        setSocket(newSocket)

        return () => {
            newSocket.disconnect()
        }

    }, [user])

    //receive message
    // useEffect(() => {
    //     if (socket === null) return;

    //     socket.on("getMessage", () => {
    //         if (currentChat) {

    //         }
    //     })

    //     return () => {
    //         socket.off("getMessage")
    //     }
    // })

    //send message
    useEffect(() => {
        if (socket === null) return;

        if (!chatSelected) return;

        const recipientId = chat?.members?.find((id) => id !== user?._id)

        socket.emit("sendMessage", { ...newMessage, recipientId })

    }, [newMessage])

    useEffect(() => {
        if (socket === null) return;

        const userInfo = {
            userId: user?._id,
            username: user?.username
        }
        socket.emit("addNewUser", userInfo)
        socket.on("getOnlineUsers", (res) => {
            setOnlineUsers(res)
        })
        return () => {
            socket.off("getOnlineUsers")
        }
    },[socket])

    useEffect(() => {
        const getUserChats = async () => {
            if (user?._id) {
                const response = await axios.get(`http://localhost:5000/api/v1/chat/${user?._id}`)
                if (response.error) {
                    return setUserChatsError(response)
                }
                setUserChats(response.data)
            }
        }
        getUserChats()
    }, [user])

    return (
        <ChatContext.Provider value={{
            userChats,
            isUserChatsLoading,
            userChatsError,
            chatSelected,
            setChatSelected,
            onlineUsers,
            socket,
            recipientId,
            setRecipientId
        }}>
            {children}
        </ChatContext.Provider>
    )
}