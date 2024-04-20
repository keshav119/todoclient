import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa";
import { API_BASE_URL, API_ROUTES, LOCAL_TOKEN_NAME } from '../apiConfig';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { loginSuccess, logoutSuccess } from "../Redux/reducers/authReducer";

import { useDispatch } from "react-redux";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(() => {
        // Check if the jwt cookie exists
        localStorage.removeItem(LOCAL_TOKEN_NAME)
        dispatch(logoutSuccess({ isAuthenticated: false}))
      }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "username") {
            setUsername(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add your login logic here
        try {
            const payload = {
                username: username,
                password: password
            }
            const response = await axios.post(`${API_BASE_URL}${API_ROUTES.login}`, payload)
            console.log(response)
            if (response.data.success ===  true){
                localStorage.setItem(LOCAL_TOKEN_NAME, response.data.token)
                const user = response.data.user
                dispatch(loginSuccess({ isAuthenticated: true, user: user }))
                toast.success("Login Successful!",{
                    autoClose: 1000,
                    style: {
                    width: '300px', 
                    }
                })
                navigate('/Home')
            }else {
                setPassword('');
                toast.error("Invalid Username or password",{
                    
                    autoClose:1000,
                    style: {
                        width: '300px'
                    }
                })
            }

        }catch(err){
            setPassword('');
            toast.error("Login Failed",{
                autoClose: 1000,
                    style: {
                    width: '300px', 
                    }
            })
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="flex justify-center items-center w-full h-screen bg-gradient-to-r from-teal-400 to-blue-500">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
                <h2 className="text-3xl mb-4 text-center text-teal-600 font-semibold">LOGIN</h2>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="********"
                            value={password}
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 flex items-center justify-center px-3 focus:outline-none text-gray-600 transition duration-300"
                        >
                           {showPassword ?  <FaRegEyeSlash/> : <FaRegEye/> }
                        </button>
                    </div>
                </div>
                <div className="flex items-center justify-between mb-6">
                    <button
                        className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        type="submit"
                    >
                        Sign In
                    </button>
                </div>
                <div className="text-center">
                    <span className="text-sm text-gray-600">New here? </span>
                    <button
                        onClick={() => navigate("/register")}
                        className="inline-block font-bold text-sm text-teal-500 hover:text-teal-600 transition duration-300"
                    >
                        Sign up
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
