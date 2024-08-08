import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../container/auth.store'; // Adjust the import path accordingly

const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);

    // Access Zustand store actions
    const { setUser } = useAuthStore((state) => ({
        setUser: state.setUser
    }));


    const login = async (username, password, setUsername, setPassword) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_AUTH}/login`, {
                username,
                password
            });

            const userData = response.data;

            if (response.status === 200) {
                console.log("user", userData);
                setUsername('');
                setPassword('');

                // Use Zustand to set the user state
                setUser(userData);

                // Optional: redirect or perform other actions
                // navigate('/'); // Uncomment if using react-router-dom

                // Show a success message
                toast.success('Login successful!');
            }
        } catch (error) {
            console.error("Error while logging in", error);
            toast.error(error.response?.data?.error || 'Error while logging in.');
        } finally {
            setIsLoading(false); // Ensure loading state is reset regardless of success or failure
        }
    };

    return {
        login,
        isLoading
    };
};

export default useLogin;
