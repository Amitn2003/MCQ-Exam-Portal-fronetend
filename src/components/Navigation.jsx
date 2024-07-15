import React from 'react';
import { NavLink } from 'react-router-dom';
// import './Navigation.css'
// import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

const Navigation = () => {
    const { isLoggedIn, isAdmin , logout } = useAuth();
    const [user, setUser] = useState(false)
    const [admin, setAdmin] = useState(false)
    useEffect(() => {
      const logInInfo = () => {
        console.log(isLoggedIn())
        if (isLoggedIn()) {
            setUser(true)
            if (isAdmin()) {
                setAdmin(true)
            }
        }
      }
      logInInfo()
    }, [isLoggedIn, isAdmin])
    const handleLogout = () => {
        logout(); // Call the logout function provided by useAuth to clear token
        setUser(false);
        setAdmin(false);
        navigate('/'); // Redirect to Home ("/")
    };
    
    return (
         <div className="bg-gray-800 py-4">
            <ul className="text-gray-300 flex hover:text-white px-3 py-2 rounded-md">
                <li>
                    <NavLink to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                        Home
                    </NavLink>
                </li>
                {user && (
                    <>
                        <li>
                            <NavLink to="/questions" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                                Start Exam
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/results" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                                Exam Results
                            </NavLink>
                        </li>
                    </>
                )}
                {admin && (
                    <li>
                        <NavLink to="/add-question" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                            Add Question
                        </NavLink>
                    </li>
                )}
                {!user && (
                    <>
                        <li>
                            <NavLink to="/register" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                                Register
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                                Login
                            </NavLink>
                        </li>
                    </>
                )}
                {user && (
                    <li>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                        >
                            Logout
                        </button>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Navigation;
