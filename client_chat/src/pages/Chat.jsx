import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../context/ChatContext'
import UserChat from '../components/chat/UserChat'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import ChatBox from '../components/chat/ChatBox'

function Chat() {

  const { userChats, chatSelected, onlineUsers } = useContext(ChatContext)
  const { user } = useContext(AuthContext)
  const [allUsers, setAllUsers] = useState([])

  const getAllUsers = async () => {
    const response = await axios.get("http://localhost:5000/api/v1/auth/user")
    setAllUsers(response.data)
  }


  useEffect(() => {

    getAllUsers()
  }, [chatSelected])

  return (
    <div className='flex w-[100wh] h-[100vh]'>
      <div className="chat-sidebar flex flex-col pt-7 pl-3 pr-3 border-r-[1px] border-[#0000003b]">
        <input type="text" placeholder='Search...' className='placeholder-gray-800 text-[14px] focus:outline-none text-[#333] w-[330px] h-[48px] border border-[1px] pl-4 rounded-[2rem] bg-[#f0f2f5]'></input>
        <div className='flex overflow-x-auto p-2 mt-2'>
        {allUsers.length > 0 &&
            allUsers.map((u)=> {

              if (u._id === user._id) return;

              const isOnline = onlineUsers?.some((user) => {
                return u?._id === user?.userId
              })

                  return <div className='relative rounded-[100px] flex items-center mr-3 bg-[#0064d1] text-[#fff] pt-2 pb-2 pl-5 pr-5'>
                    {u.username}
                    <div className={isOnline ? `absolute bg-green-500 w-[12px] h-[12px] top-[-0.2rem] right-0 rounded-[100%] border-[#fff] border-[1px]`:`absolute bg-red-500 w-[12px] h-[12px] top-[-0.2rem] right-0 rounded-[100%] border-[#fff] border-[1px]`}>

                    </div>
                  </div>
                
              })

            }
        </div>
        <div className='flex mt-1'>
          <div className='bg-[#ebf5ff] text-[14px] font-bold text-[#0064d1] rounded-[10px] pl-5 pr-5 pt-2 pb-2'>กล่องข้อความ</div>
        </div>

        <div className='flex flex-col h-[100vh] mt-3'>
          {userChats?.length > 0 && userChats.map((chat, index) => {
            return <UserChat key={index} chat={chat} user={user} />
          })}
        </div>
      </div>

      <ChatBox />

      {/* <div className='bg-white w-[700px]'>

      </div> */}
      
      {/* <div className='text-[30px] font-bold'>Chat App</div>
      <div className=''>{user.username}</div>
      {userChats?.data.length < 1 ? null :
        <div></div>
      } */}

      {/* {userChats?.data.map((chat, index) => {
        console.log("Test", chat)
        return <UserChat user={user}/>
      })} */}

      {/* <div>
        {userChats?.data.length > 0 && userChats.data.map((chat, index) => {
          return <UserChat chat={chat} user={user}/>
        })}
      </div> */}

    </div>
  )
}

export default Chat