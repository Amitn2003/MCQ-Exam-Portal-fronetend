import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [college, setCollege] = useState('');
    const [phone, setPhone] = useState('');
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

    //         <div className="p-6 max-w-md mx-auto bg-white text-black dark:bg-gray-800 rounded-md shadow-md">
    //     <h2 className="text-2xl font-bold mb-4 dark:text-white">Register</h2>
    //     <form onSubmit={handleSubmit} className="space-y-4">
    //         <div className="flex flex-col">
    //             <label htmlFor="name" className="mb-1 text-sm dark:text-white">Name</label>
    //             <input
    //                 id="name"
    //                 type="text"
    //                 className="py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
    //                 value={name} required
    //                 onChange={(e) => setName(e.target.value)}
    //             />
    //         </div>
    //         <div className="flex flex-col">
    //             <label htmlFor="email" className="mb-1 text-sm dark:text-white">Email</label>
    //             <input
    //                 id="email"
    //                 type="email"
    //                 className="py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
    //                 value={email} required
    //                 onChange={(e) => setEmail(e.target.value)}
    //             />
    //         </div>
    //         <div className="flex flex-col">
    //             <label htmlFor="password" className="mb-1 text-sm dark:text-white">Password</label>
    //             <input
    //                 id="password"
    //                 type="password"
    //                 className="py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
    //                 value={password} required
    //                 onChange={(e) => setPassword(e.target.value)}
    //             />
    //         </div>
    //         <button
    //             type="submit"
    //             className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-500"
    //         >
    //             Register
    //         </button>
    //     </form>
    // </div>
    return (
        <section className="bg-gray-50 min-h-screen flex items-center justify-center">
        {/* registration container */}
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
            {/* form */}
            <div className="md:w-1/2 px-8 md:px-16">
                <h2 className="font-bold text-2xl text-[#002D74]">Register</h2>
                <p className="text-xs mt-4 text-[#002D74]">Create a new account</p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        className="p-2 mt-8 rounded-xl border text-black"
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        className="p-2 rounded-xl border w-full text-black"
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="p-2 rounded-xl border w-full text-black"
                        id="address"
                        type="text"
                        name="address"
                        placeholder="Address (Optional)"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <input
                        className="p-2 rounded-xl border w-full text-black"
                        id="college"
                        type="text"
                        name="college"
                        placeholder="College (Optional)"
                        value={college}
                        onChange={(e) => setCollege(e.target.value)}
                    />
                    <input
                        className="p-2 rounded-xl border w-full text-black"
                        id="phone"
                        type="number"
                        name="phone"
                        placeholder="Phone (Optional)"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <div className="relative">
                        <input
                            className="p-2 rounded-xl border w-full text-black"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            fill="gray"
                            className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                            viewBox="0 0 16 16"
                        >
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                        </svg>
                    </div>
                    <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">Register</button>
                </form>
            </div>
            {/* image */}
            <div className="md:block hidden w-1/2">
                <img
                    className="rounded-2xl"
                    src="https://images.unsplash.com/photo-1557989048-03456d01a26e?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Registration"
                />
            </div>
        </div>
    </section>
    

    );
};

export default Register;
