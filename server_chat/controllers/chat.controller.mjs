//createChat 
//getUserChats
//getAllChats
//findChat

import Chat from "../models/Chat.mjs";

const createChat = async (req, res) => {
    const { firstId, secondId } = req.body;

    try {
        const chat = await Chat.findOne({
            members: { $all: [firstId, secondId] }
        })
        if (chat) return res.status(200).json(chat)
        const newChat = new Chat({
            members: [firstId, secondId]
        })

        const response = await newChat.save()

        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const findUserChats = async (req, res) => {
    const userId = req.params.userId
    try {
        const chats = await Chat.find({
            members: { $in: [userId] }
        })
        res.status(200).json(chats)
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
}

const findChat = async (req, res) => {
    const { firstId, secondId } = req.params
    try {
        const chats = await Chat.find({
            members: { $all: [firstId, secondId] }
        })
        res.status(200).json(chats)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

export { createChat, findUserChats, findChat }