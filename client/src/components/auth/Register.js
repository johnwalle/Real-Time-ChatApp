import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdRemoveRedEye } from 'react-icons/md';
import { IoEyeOffSharp } from 'react-icons/io5';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useRegister from '../../hooks/useRegister';


const RegisterPage = () => {
    const [gender, setGender] = useState('');
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const inputRef = useRef();

    const { error, isLoading, register } = useRegister()

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const togglePasswordVisibility2 = () => {
        setShowPassword2(!showPassword2);
    };

    // useEffect(() => {
    //     if (isLoading) {

    //     }
    //     inputRef.current.focus()
    // }, [])




    const handleSubmit = async (e) => {
        e.preventDefault();
        await register(username, fullName, password, confirmPassword, gender, setConfirmPassword, setFullName, setGender, setPassword, setUsername)
    };

    return (
        <div className="flex flex-col  items-center justify-center h-screen">
            <div className="bg-white px-6 py-8 shadow-md rounded-md w-80">
                <h2 className="instagarm-heading text-center text-4xl font-bold mb-6">Chat App</h2>
                <h1 className="font-thin text-center pb-6">Sign up to chat and share thoughts  with your friends.</h1>
                <hr className="pb-6" />
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        required
                        placeholder="full name"
                        value={fullName}
                        ref={inputRef}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                        style={{ fontSize: '14px' }}
                    />
                    <input
                        type="text"
                        required
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                        style={{ fontSize: '14px' }}
                    />
                    <select
                        required
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                        style={{ fontSize: '14px', backgroundColor: 'white' }}
                    >
                        <option value="">select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <div className="relative">
                        <div className="flex">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="password"
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full py-2 px-4 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                style={{ fontSize: '14px' }}
                            />
                            <button
                                type="button"
                                className="flex items-center px-3 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md focus:outline-none"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <MdRemoveRedEye /> : <IoEyeOffSharp />}
                            </button>
                        </div>
                        <div className='flex  mt-4'>
                            <input
                                type={showPassword2 ? 'text' : 'password'}
                                placeholder="confirm password"
                                value={confirmPassword}
                                required
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full py-2 px-4 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                style={{ fontSize: '14px' }}
                            />
                            <button
                                type="button"
                                className="flex items-center px-3 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md focus:outline-none"
                                onClick={togglePasswordVisibility2}
                            >
                                {showPassword2 ? <MdRemoveRedEye /> : <IoEyeOffSharp />}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-blue-500 text-center w-full hover:bg-blue-600 text-white font-semibold py-2 rounded mt-4 relative"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin">
                                    <AiOutlineLoading3Quarters className="text-xl" />
                                </div>
                            </div>
                        ) : (
                            "Sign Up"
                        )}
                    </button>
                </form>
            </div>
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="flex items-center justify-center border border-gray-500 px-4 mt-2 py-6 shadow-md rounded-md w-80">
                    <p className="text-sm pr-2">Have an account?</p>
                    <Link className="text-md text-blue-500 hover:text-blue-700 hover:underline" to="/login">
                        Login
                    </Link>
                </div>
            </div>


        </div>
    );
};

export default RegisterPage;