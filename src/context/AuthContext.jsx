import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();
// const URL = "https://mcq-portal-vercel.vercel.app"

const URL = import.meta.env.REACT_APP_BACKEND_URL

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const navigate = useNavigate();

    const register = async (userData) => {
        try {
            const response = await fetch(`${URL}/api/auth/register`, {
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
                throw data
            }
        } catch (error) {
            console.error(error);
            throw error
        }
    };

    const login = async (userData) => {
        try {
            const response = await fetch(`${URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            console.log(response)
            const data = await response.json(); 
            if (response.ok) {
                setUser(data);
                localStorage.setItem('user', JSON.stringify(data));
                navigate('/');
                console.log(data.message)
                return data.message
            } else {
                console.error(data.issues);
                throw data.issues
                return false;
            }
        } catch (error) {
            console.error(error.message);
            return error.message
            // throw new error.issues[0]
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
            // console.log(user)
            return false
        }
    };
    const isLoggedIn = () => !!user;



    const googleLogin = async (token) => {
        console.log(token)
        console.log(`${URL}/api/auth/google`, JSON.stringify({token}))
        try {
        const response = await fetch(`${URL}/api/auth/google`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({token}),
        });
        console.log(response)

        if (!response.ok) {
            throw new Error('Google login failed');
        }

        const data = await response.json();
        console.log(data)
        // Extract token and user from response
        // const { token, ...user } = data;

        // Check if data contains a token and user details
        if (data.token && data._id) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify({
                _id: data._id,
                name: data.name,
                email: data.email,
                address: data.address,
                college: data.college,
                phone: data.phone,
                isAdmin: data.isAdmin,
                avatar: data.avatar,
                isPremium: data.isPremium,
                token: data.token, // Store the token within the user object
            }));

            setUser({
                _id: data._id,
                name: data.name,
                email: data.email,
                isAdmin: data.isAdmin,
                isPremium: data.isPremium,
                token: data.token, // Include token in context/state
            }); // Set user in context or state
        } else {
            throw new Error('Invalid response data');
        }
        // setUser(user);
        return data;
    } catch (error) {
        console.error('Error during Google login:', error);
        throw error;
    }
    };



    return (
        <AuthContext.Provider value={{ user, register, login, logout, isAdmin, isLoggedIn, googleLogin }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);
export { AuthContext, AuthProvider };
