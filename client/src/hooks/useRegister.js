import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../container/auth.store'; // Adjust the import path accordingly

const useRegister = () => {
    const [isLoading, setIsLoading] = useState(false);

    // Access Zustand store actions
    const { setUser } = useAuthStore((state) => ({
        setUser: state.setUser
    }));

    const handleError = (error) => {
        // Check if error response and data are present
        if (error.response && error.response.data) {
            const errorData = error.response.data;

            // Handle multiple error messages
            if (Array.isArray(errorData.errors)) {
                errorData.errors.forEach((err) => toast.error(err));
            } else if (errorData.error) {
                // Handle a single error message
                toast.error(errorData.error);
            } else {
                // Fallback error message if the structure is unknown
                toast.error('An unknown error occurred.');
            }
        } else {
            // Handle cases where error response or data is not available
            toast.error('Error while registering.');
        }
    };


    const register = async (username, fullName, password, confirmPassword, gender,) => {



        setIsLoading(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_AUTH}/signup`, {
                username,
                fullName,
                password,
                confirmPassword,
                gender,
            });

            const userData = response.data;

            if (response.status === 200) {
                console.log("user", userData);


                // Use Zustand to set the user state
                setUser(userData);

                // Optional: redirect or perform other actions
                // navigate('/'); // Uncomment if using react-router-dom

                // Show a success message
                toast.success('Register successful!');
            }
        } catch (error) {
            console.error("Error while register", error);
            handleError(error);
        } finally {
            setIsLoading(false); // Ensure loading state is reset regardless of success or failure
        }
    };

    return {
        register,
        isLoading
    };
};

export default useRegister;
