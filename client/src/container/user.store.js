import { create } from 'zustand';
import axios from 'axios';

// Create the Zustand store
export const useUserStore = create((set) => ({
    friends: [], // State to store friends
    fetchFriends: async (token) => {
        
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_USER}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            // Set the friends in the store
            set({ friends: response.data });
        } catch (error) {
            console.error('Error fetching friends:', error);
            set({ friends: [] }); // Handle the error case
        }
    }
}));
