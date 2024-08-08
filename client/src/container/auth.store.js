import { create } from 'zustand';

// Function to get user from localStorage
const getUserFromLocalStorage = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

// Function to save user to localStorage
const saveUserToLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};

// Create the store
export const useAuthStore = create((set) => ({
    user: getUserFromLocalStorage(), // Initialize state from localStorage

    setUser: (user) => {
        set({ user });
        saveUserToLocalStorage(user); // Save user to localStorage
    },

    logout: () => {
        set({ user: null });
        localStorage.removeItem('user'); // Remove user from localStorage on logout
    }
}));
