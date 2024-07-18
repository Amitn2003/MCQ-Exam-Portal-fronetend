import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const navigate = useNavigate();

    const register = async (userData) => {
        try {
            const response = await fetch('https://mcq-portal-backend.onrender.com/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            const data = await response.json();
            if (response.ok) {
                setUser(data);
                localStorage.setItem('user', JSON.stringify(data));
                navigate('/');
            } else {
                console.error(data);
                return false
            }
        } catch (error) {
            console.error(error);
        }
    };

    const login = async (userData) => {
        try {
            const response = await fetch('https://mcq-portal-backend.onrender.com/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            const data = await response.json(); 
            if (response.ok) {
                setUser(data);
                localStorage.setItem('user', JSON.stringify(data));
                navigate('/');
            } else {
                console.error(data);
                return false;
            }
        } catch (error) {
            console.error(error);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/login');
    };

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const isAdmin = () => {
        if (user && user.isAdmin) {
            // console.log("UseAuth admin")
            return true;
        }
        else {
            console.log(user)
            return false
        }
    };
    const isLoggedIn = () => !!user;

    return (
        <AuthContext.Provider value={{ user, register, login, logout, isAdmin, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);
export { AuthContext, AuthProvider };
