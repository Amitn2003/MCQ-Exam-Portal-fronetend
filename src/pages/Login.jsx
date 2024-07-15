import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login({ email, password });
    };

        // <div>
        //     <h2>Login</h2>
        //     <form onSubmit={handleSubmit}>
        //         <div>
        //             <label>Email</label>
        //             <input
        //                 type="email"
        //                 value={email}
        //                 onChange={(e) => setEmail(e.target.value)}
        //             />
        //         </div>
        //         <div>
        //             <label>Password</label>
        //             <input
        //                 type="password"
        //                 value={password}
        //                 onChange={(e) => setPassword(e.target.value)}
        //             />
        //         </div>
        //         <button type="submit">Login</button>
        //     </form>
        // </div>
    return (
        <div className="p-6 max-w-md mx-auto bg-white dark:bg-gray-800 rounded-md shadow-md">
    <h2 className="text-2xl font-bold mb-4">Login</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-sm">Email</label>
            <input
                id="email"
                type="email"
                className="py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 text-sm">Password</label>
            <input
                id="password"
                type="password"
                className="py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                value={password}
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
