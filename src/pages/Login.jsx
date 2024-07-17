import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        toast.warn('Please wait 🙏!');
        toast.warn('It takes a few seconds 🙏!');
        try {
            let loginRes = await login({ email, password });
            // If login succeeds, show a success toast
            if (loginRes)
                toast.success('Login successful!');
            else {
                toast.error('Login failed. Please check your credentials.');
            }
            // toast.success(loginRes.message)
        } catch (error) {
            // If login fails, show an error toast
            toast.error('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white text-black dark:bg-gray-800 rounded-md shadow-md">
    <h2 className="text-2xl font-bold mb-4 dark:text-white ">Login</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-sm dark:text-white">Email</label>
            <input
                id="email"
                type="email"
                className="py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white "
                value={email} required
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 text-sm dark:text-white">Password</label>
            <input
                id="password"
                type="password"
                className="py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                value={password} required
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-500"
        >
            Login
        </button>
    </form>
</div>

    );
};

export default Login;
