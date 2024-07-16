import React from 'react';
import { NavLink , useNavigate} from 'react-router-dom';
// import './Navigation.css'
// import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Navigation = () => {
    const { isLoggedIn, isAdmin , logout } = useAuth();
    const [user, setUser] = useState(false)
    const [admin, setAdmin] = useState(false)
    const navigate = useNavigate();




    useEffect(() => {
      const logInInfo = () => {
        // console.log(isLoggedIn())
        if (isLoggedIn()) {
            setUser(true)
            // console.log("user found")
            if (isAdmin()) {
                // console.log("is admin")
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
        toast.success('Logout successful!');
    };
    
    //  <div className="bg-gray-800 py-4">
    //     <ul className="text-gray-300 flex hover:text-white px-3 py-2 rounded-md">
    //         <li>
    //             <NavLink to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
    //                 Home
    //             </NavLink>
    //         </li>
    //         {user && (
    //             <>
    //                 <li>
    //                     <NavLink to="/questions" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
    //                         Start Exam
    //                     </NavLink>
    //                 </li>
    //                 <li>
    //                     <NavLink to="/results" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
    //                         Exam Results
    //                     </NavLink>
    //                 </li>
    //             </>
    //         )}
    //         {admin && (
    //             <li>
    //                 <NavLink to="/add-question" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
    //                     Add Question
    //                 </NavLink>
    //             </li>
    //         )}
    //         {!user && (
    //             <>
    //                 <li>
    //                     <NavLink to="/register" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
    //                         Register
    //                     </NavLink>
    //                 </li>
    //                 <li>
    //                     <NavLink to="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
    //                         Login
    //                     </NavLink>
    //                 </li>
    //             </>
    //         )}
    //         {user && (
    //             <li>
    //                 <button
    //                     onClick={handleLogout}
    //                     className="text-gray-300 hover:text-white px-3 py-2 rounded-md"
    //                 >
    //                     Logout
    //                 </button>
    //             </li>
    //         )}
    //     </ul>
    // </div>
    //     <div className="bg-gray-800 py-4">
    //     <ul className="text-gray-300 flex space-x-4">
    //         <li>
    //             <NavLink to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
    //                 Home
    //             </NavLink>
    //         </li>
    //         {user && (
    //             <>
    //                 <li>
    //                     <NavLink to="/questions" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
    //                         Start Exam
    //                     </NavLink>
    //                 </li>
    //                 <li>
    //                     <NavLink to="/results" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
    //                         Exam Results
    //                     </NavLink>
    //                 </li>
    //                 <li>
    //                         <NavLink to="/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
    //                             Dashboard
    //                         </NavLink>
    //                     </li>
    //             </>
    //         )}
    //         {user && admin && (
    //             <>
    //                 <li>
    //                     <NavLink to="/add-question" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
    //                         Add Question
    //                     </NavLink>
    //                 </li>
    //                 <li>
    //                     <NavLink to="/admin/users" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
    //                         Manage Users
    //                     </NavLink>
    //                 </li>
    //                 <li>
    //                         <NavLink to="/admin/reported-questions" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
    //                             Reported Questions
    //                         </NavLink>
    //                     </li>
    //             </>
    //         )}
    //         {!user && (
    //             <>
    //                 <li>
    //                     <NavLink to="/register" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
    //                         Register
    //                     </NavLink>
    //                 </li>
    //                 <li>
    //                     <NavLink to="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
    //                         Login
    //                     </NavLink>
    //                 </li>
    //             </>
    //         )}
    //         {user && (
    //             <li>
    //                 <button
    //                     onClick={handleLogout}
    //                     className="text-gray-300 hover:text-white px-3 py-2 rounded-md"
    //                 >
    //                     Logout
    //                 </button>
    //             </li>
    //         )}
    //     </ul>
    // </div>
    return (
        <div className="bg-gray-800 py-4">
        <ul className="text-gray-300 flex space-x-4 justify-center">
        {!user && (<li>
                <NavLink to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                    Home
                </NavLink>
            </li>)}
            {user && (
                <>
                    <li>
                        <NavLink to="/questions" className="text-gray-300 hover:text-white px-3 py-2  rounded-md">
                            Start Exam
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/results" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                            Exam Results
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                            Dashboard
                        </NavLink>
                    </li>
                </>
            )}
            {user && isAdmin && (
                <>
                    <li>
                        <NavLink to="/add-question" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                            Add Question
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/users" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                            Manage Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/reported-questions" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                            Reported Questions
                        </NavLink>
                    </li>
                    {/* <li>
                        <NavLink to="/admin/manage-questions" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                            Manage Questions
                        </NavLink>
                    </li> */}
                </>
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
                        className="text-gray-300 hover:text-white px-3 py-2 rounded-md"
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
