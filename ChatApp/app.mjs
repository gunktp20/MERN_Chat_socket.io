import express from "express"
import path from "path"
import { fileURLToPath } from 'url';
const app = express()
const PORT = process.env.PORT || 4000
const server = app.listen(PORT,()=> console.log('server is running on port : ' + PORT))
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { Server } from 'socket.io';
const io = new Server(server)

let socketsConnected = new Set()

app.use(express.static(path.join(__dirname,"public")))

io.on('connection',onConnected)

function onConnected(socket){
    console.log(socket.id)
    socketsConnected.add(socket.id)

    io.emit('clients-total',socketsConnected.size)

    socket.on('disconnect',()=>{
        console.log('Socket disconnected', socket.id)
        socketsConnected.delete(socket.id)

        io.emit('clients-total',socketsConnected.size)
    })

    socket.on('message',(data)=>{
        console.log(data)
        socket.broadcast.emit('chat-message',data)
    })

}
