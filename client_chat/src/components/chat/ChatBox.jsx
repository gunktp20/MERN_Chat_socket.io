import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { ChatContext } from '../../context/ChatContext'
import moment from 'moment'
import { AuthContext } from '../../context/AuthContext'


function ChatBox() {

    const { chatSelected, socket, recipientId } = useContext(ChatContext)
    const { user } = useContext(AuthContext)
    const [message, setMessage] = useState("")
    const [currentChat, setCurrentChat] = useState([])
    const messageEndRef = useRef(null)

    const getChat = async () => {
        const response = await axios.get(`http://localhost:5000/api/v1/message/${chatSelected}`)
        setCurrentChat(response.data)
        messageEndRef.current?.scrollIntoView();
    }

    const sendMessage = async (e) => {
        e.preventDefault()
        if (!message) return alert('กรุณากรอกข้อความของคุณ')
        if (!recipientId) return alert('กรุณาเลือกคู่สนทนา')

        console.log("MESSAGE",message)

        const response = await axios.post(`http://localhost:5000/api/v1/message/`, {
            chatId: chatSelected,
            senderId: user._id,
            text: message
        })
        setMessage("")
        socket.emit("sendMessage", {
            message: response.data,
            recipientId,
        })
        
        setCurrentChat([...currentChat,response.data])
    }

    useEffect(() => {
        getChat()

    }, [chatSelected])

    useEffect(() => {
        if (socket === null) return;

        socket.on("getMessage", (res) => {
            console.log('GET_MSG')
            setCurrentChat([...currentChat,res])
        })

        messageEndRef.current?.scrollIntoView();
    }, [socket, currentChat])

    return (
        <div className='relative chat-box flex-col w-[100%] p-5'>
            <div className='chat-message-box w-[100%] h-[95%] overflow-y-auto'>
                {(chatSelected && currentChat.length === 0) && <div className='w-[100%] flex justify-center'>
                    เริ่มคุยกับเพื่อนของคุณ
                </div>}

                {!chatSelected && 
                    <div className='w-[100%] flex justify-center'>คุณยังไม่ได้เลือกคู่สนทนา</div>
                }
                {currentChat.length > 0 && currentChat.map((m) => {
                    if (m?.senderId === user?._id) {
                        return <div className='flex w-[100%] justify-end mt-8'>
                            <div className='w-[40%] flex justify-end'>
                                <div className='relative bg-[#0084ff] text-[#fff] pt-2 pb-2 text-sm pl-5 pr-5 rounded-[10px] flex w-fit'>{m?.text}
                                    <div className='absolute bottom-[-1.3rem] text-[11px] w-max right-1 text-[#00000098]'>{moment(m?.createdAt).calendar()}</div>
                                </div>
                            </div>
                        </div>
                    } else {
                        return <div className='flex w-[100%] justify-start mt-8'>
                            <div className='w-[40%]'>
                                <div className='relative bg-[#f0f0f0] text-[#000] pt-2 pb-2 text-sm pl-5 pr-5 rounded-[10px] flex w-fit'>{m?.text}
                                    <div className='absolute bottom-[-1.3rem] text-[11px] w-max left-1 text-[#00000098]'>{moment(m?.createdAt).calendar()}</div>
                                </div>
                            </div>
                        </div>
                    }

                })}
                <div ref={messageEndRef}></div>
            </div>

            {/* <div className='flex w-[100%] mt-3 justify-start'>
                <div className='w-[40%]'>
                    <div className='bg-[#f0f0f0] text-[#000] pt-2 pb-2 pl-5 pr-5 rounded-[10px] flex w-fit'>How are you ?</div>
                </div>
            </div>

            <div className='flex w-[100%] mt-3 justify-end'>
                <div className='w-[40%] flex justify-end'>
                    <div className='bg-[#0084ff] pt-2 pb-2 text-white pl-5 pr-5 rounded-[10px] flex w-fit'>I'm find Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse praesentium in obcaecati consequatur tempore. Porro delectus aperiam, odit quisquam ut eligendi cumque culpa laudantium ipsum minima rerum aliquid sed dolores non sequi ipsam natus, rem distinctio fugit harum dolorum vero quas velit? Quos dolore sit rerum, recusandae autem voluptate tenetur.</div>
                </div>
            </div> */}
            <form onSubmit={(e)=>{
                sendMessage(e)
            }} className='left-0 absolute bottom-0 bg-white pt-3 pb-3 w-[100%] border-t-[1px] border-[#00000048] pl-5 pr-5'>
                <input value={message} onChange={(e) => {
                    setMessage(e.target.value)
                }} type="text" placeholder='Aa' className='bg-[#f0f2f5] text-[#333] rounded-[100px] focus : outline-none pt-[0.5rem] pb-[0.5rem] pl-5 w-[100%]'></input>
            </form>
        </div>
    )
}

export default ChatBox