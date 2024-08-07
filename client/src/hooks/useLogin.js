import axios from 'axios';
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
// import { useAuthContext } from './useAuthContext';

const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    
    // const navigate = useNavigate();
    // const { dispatch } = useAuthContext();

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

                // navigate('/');
                // Dispatch login action or perform any necessary operations
                // dispatch({ type: 'LOGIN', payload: userData })

                // Store user data in local storage or state
                localStorage.setItem('user', JSON.stringify(userData));

                // context
                // setUser(userData)
            }
        } catch (error) {
            console.error("error while logging", error);
            toast.error(error.response?.data?.error || 'Error while logging in.');
        }
        setIsLoading(false);
    };

    return {
        login,
        isLoading
    };
};

export default useLogin;