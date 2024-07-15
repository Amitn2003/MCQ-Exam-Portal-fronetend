import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        toast.warn('Please wait 🙏!');
        try {
            let registrationRes = await register({ name, email, password });
            // If registration succeeds, show a success toast
            if (registrationRes)
                toast.success('Registration successful!');
            else toast.error('Registration failed. Please try again.');
        } catch (error) {
            // If registration fails, show an error toast
            toast.error('Registration failed. Please try again.');
        }
    };

    // <div>
    //     <h2>Register</h2>
    //     <form onSubmit={handleSubmit}>
    //         <div>
    //             <label>Name</label>
    //             <input
    //                 type="text"
    //                 value={name}
    //                 onChange={(e) => setName(e.target.value)}
    //             />
    //         </div>
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
    //         <button type="submit">Register</button>
    //     </form>
    // </div>
    return (
        <div className="p-6 max-w-md mx-auto bg-white dark:bg-gray-800 rounded-md shadow-md">
    <h2 className="text-2xl font-bold mb-4 dark:text-white">Register</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 text-sm dark:text-white">Name</label>
            <input
                id="name"
                type="text"
                className="py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                value={name} required
                onChange={(e) => setName(e.target.value)}
            />
        </div>
        <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-sm dark:text-white">Email</label>
            <input
                id="email"
                type="email"
                className="py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
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
            Register
        </button>
    </form>
</div>

    );
};

export default Register;
