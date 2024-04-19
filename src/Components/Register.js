import React, { useState } from "react";
import axios from "axios";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL, API_ROUTES } from "../apiConfig";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [usernameEmpty, setUsernameEmpty] = useState(false);
    const [passwordEmpty, setPasswordEmpty] = useState(false);
    const [emailEmpty, setEmailEmpty] = useState(false);
    const [confirmPasswordEmpty, setConfirmPasswordEmpty ] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "username") {
            setUsername(value);
            setUsernameEmpty(false)
        } else if (name === "email") {
            setEmail(value);
            setEmailEmpty(false);
        } else if (name === "password") {
            setPassword(value);
            setPasswordEmpty(false);
        } else if (name === "confirmPassword") {
            setConfirmPassword(value);
            setConfirmPasswordEmpty(false);
        }
    }

    const handleSubmit = async (e) => {
        
        e.preventDefault(); 
        
        setUsernameEmpty(false);
        setEmailEmpty(false);
        setPasswordEmpty(false);
        setConfirmPasswordEmpty(false);
        if(!username) setTimeout(() => {
            setUsernameEmpty(true);
            console.log(usernameEmpty)
        }, 100);
        if(!email) setTimeout(() => {
            setEmailEmpty(true);
        }, 100);
        if(!password) setTimeout(() => {
            setPasswordEmpty(true);
        }, 100);
        if(!confirmPassword) setTimeout(() => {
            setConfirmPasswordEmpty(true);
        }, 100);
        else if(confirmPassword && email && username && password){
            if(confirmPassword !== password)setTimeout(() => {
                toast.error("Passwords do not match",{
                    autoClose:1000,
                    style: {
                        width: '300px'
                    }
                })
                setPasswordEmpty(true)
                setConfirmPasswordEmpty(true)
            }, 100);
                
            else {
                const payload = {
                    username: username,
                    password: password,
                    email: email
                }
                try{
                    const response = await axios.post(`${API_BASE_URL}${API_ROUTES.register}`,payload)
                    if(response.data.success === true){
                        toast.success("Sign Up Successful",{
                            autoClose:1000,
                            style: {
                                width: '300px'
                            }
                        })
                        navigate('/')
                    }else{
                        toast.error("Username or Email Exists!",{
                            autoClose:1000,
                            style: {
                                width: '300px'
                            }
                        })
                    }
                }catch(e){
                    toast.error("Username or Email Exists!",{
                        autoClose:1000,
                        style: {
                            width: '300px'
                        }
                    })
                }
            }
        }
        // Add your registration logic here
        
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    return (
        <div className="flex justify-center items-center w-full h-screen bg-gradient-to-r from-purple-400 to-pink-600">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
                <h2 className="text-3xl mb-4 text-center text-purple-600 font-semibold">REGISTER</h2>
                <div className={`mb-6 relative `}>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className={`shadow appearance-none border ${usernameEmpty ? 'animate-shake border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={handleChange}
                    />
                </div>
                <div className={`mb-6 relative`}>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className={`shadow appearance-none border ${emailEmpty ? 'animate-shake border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleChange}
                    />
                </div>
                <div className={`mb-6 relative `}>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            className={`shadow appearance-none border ${passwordEmpty ? 'animate-shake border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
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
                <div className={`mb-6 relative `}>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <input
                            className={`shadow appearance-none border ${confirmPasswordEmpty ? 'animate-shake border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="********"
                            value={confirmPassword}
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            onClick={toggleConfirmPasswordVisibility}
                            className="absolute inset-y-0 right-0 flex items-center justify-center px-3 focus:outline-none text-gray-600 transition duration-300"
                        >
                           {showConfirmPassword ?  <FaRegEyeSlash/> : <FaRegEye/> }
                        </button>
                    </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                    <button
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        type="submit"
                    >
                        Register
                    </button>
                </div>
                <div className="text-center">
                    <span className="text-sm text-gray-600">Already a user? </span>
                    <button
                        onClick={() => navigate("/")}
                        className="inline-block font-bold text-sm text-purple-500 hover:text-purple-600 transition duration-300"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Register;
