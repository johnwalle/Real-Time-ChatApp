import { create } from 'zustand';
import axios from 'axios';

export const useMessageStore = create((set) => ({
    chats: [], // State to store messages
    fetchMessages: async (token, friendId) => {
        console.log("friendId", friendId, 'token', token, "api-url", process.env.REACT_APP_API_CHAT);

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_CHAT}/getMessages/${friendId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            set({ chats: response.data });
            console.log('fetched messages', response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
            set({ chats: [] }); // Handle the error case
        }
    }
}));