import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { ChatContext } from "../../context/ChatContext"
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient"
import { IoPersonSharp } from "react-icons/io5";

const UserChat = ({ chat, user }) => {
    const { recipientUser } = useFetchRecipientUser(chat, user)
    const { setChatSelected , setRecipientId} = useContext(ChatContext)
    const { onlineUsers } = useContext(ChatContext)

    const isOnline = onlineUsers?.some((user) => {
        return user?.userId === recipientUser?.user._id
    })

    useEffect(() => {

    }, [])

    return < div className="relative w-100 h-[60px] flex items-center pl-5 hover:bg-blue-50 rounded-md" onClick={() => {
        setChatSelected(chat?._id)
        setRecipientId(recipientUser?.user._id)
    }}>
        <IoPersonSharp className="text-[40px]  text-[#00000052] rounded-[100%] border-[#00000052] border-[1px] p-[2px] mr-3" />
        <div className="text-[15px]">
            {recipientUser?.user.username}
            <br></br>
        </div>
        <div className={isOnline ? `absolute bg-green-500 w-[12px] h-[12px] top-[-0.2rem] right-0 rounded-[100%] border-[#fff] border-[1px]`:`absolute bg-red-500 w-[12px] h-[12px] top-[-0.2rem] right-0 rounded-[100%] border-[#fff] border-[1px]`}>

        </div>
    </div >
}

export default UserChat  