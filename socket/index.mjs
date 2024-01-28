import { Server } from "socket.io"

const io = new Server({ cors: "http://localhost:5173/" })

let onlineUsers = []

io.on("connection", (socket) => {
    console.log('new connection', socket.id)

    socket.on("addNewUser", ({userId,username}) => {
        !onlineUsers.some((user) => user.userId === userId) &&
            onlineUsers.push({
                userId,
                username,
                socketId: socket.id
            })
        console.log("onlineUsers", onlineUsers)

        io.emit("getOnlineUsers", onlineUsers)

    })

    socket.on("sendMessage",({message,recipientId}) =>{

        const user = onlineUsers.find(user=> user.userId === recipientId)

        if(user){
            io.to(user.socketId).emit("getMessage",message)
        }
    })


    socket.on("disconnect", () => {
        console.log('disconnect')
        // onlineUsers.map((user)=>{
        //     console.log("TEST : ", socket.id , user.socketId)
        // })
        onlineUsers = onlineUsers.filter(user => {
            return user.socketId !== socket.id
        })
        console.log("onlineUsers in disconnect", onlineUsers)
        io.emit("getOnlineUsers", onlineUsers)
    })
})

io.listen(3000)