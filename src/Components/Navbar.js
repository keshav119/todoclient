import React, { useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { loginSuccess, logoutSuccess } from "../Redux/reducers/authReducer";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import axios from "axios";
import { API_BASE_URL, API_ROUTES } from "../apiConfig";
import { toast } from "react-toastify";

const NavBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    

    useEffect(() => {
        // Check if the jwt cookie exists
        
        if (!isAuthenticated) {
            navigate('/');
        }
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post(`${API_BASE_URL}${API_ROUTES.logout}`);
            dispatch(logoutSuccess({ isAuthenticated: false}));
            toast.success("Logout Successful!", {
                autoClose: 1000,
                style: {
                    width: '300px',
                }
            });
            // Optionally, navigate to the login page after successful logout
            navigate('/');
        } catch (err) {
            toast.error("Logout Failed", {
                autoClose: 1000,
                style: {
                    width: '300px',
                }
            });
        }
    };

    return (
        <nav className="flex justify-between items-center h-20 bg-gradient-to-r from-purple-400 to-pink-600 text-white px-8">
            <div></div>
            <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-white text-purple-600 rounded hover:bg-purple-600 hover:text-white transition duration-300"
            >
                Logout <FaSignOutAlt className="ml-2" />
            </button>
        </nav>
    );
};

export default NavBar;
