import { create } from 'zustand';
import axios from 'axios';

export const useMessageStore = create((set) => ({
    chats: [], // State to store messages
    isLoading: false, // State to track loading state
    fetchMessages: async (token, friendId) => {

        try {
            set({ isLoading: true }); // Set loading state to true before fetching

            const response = await axios.get(`${process.env.REACT_APP_API_CHAT}/getMessages/${friendId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            set({ chats: response.data, isLoading: false }); // Update chats and set loading state to false
            
        } catch (error) {
            console.error('Error fetching messages:', error);
            set({ chats: [], isLoading: false }); // Handle the error case and set loading state to false
        }
    }
}));