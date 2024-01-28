import axios from "axios";
import { useEffect, useState } from "react";

export const useFetchRecipientUser = (chat, user) => {
    const [recipientUser, setRecipientUser] = useState(null)

    const recipientId = chat?.members.find((id) => id !== user?._id)

    useEffect(() => {
        const getUser = async () => {
            if (!recipientId) return null;

            const response = await axios.get(`http://localhost:5000/api/v1/auth/find/${recipientId}`)

            if (response.error) {
                return response.error;
            }
            
            setRecipientUser(response.data)
        }
        getUser()
    }, [])

    return { recipientUser }
}

