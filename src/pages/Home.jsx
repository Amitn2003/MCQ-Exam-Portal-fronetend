import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';


const Home = () => {
    const { isLoggedIn, isAdmin } = useAuth();
    const [user, setUser] = useState(false)
    const [admin, setAdmin] = useState(false)
    useEffect(() => {
      const logInInfo = () => {
        console.log(isLoggedIn())
        if (isLoggedIn()) {
            setUser(true)
        }
        if (isLoggedIn()) {
            setAdmin(true)
        }
      }
      logInInfo()
    }, [])
    
    return (
        <>
           <div className="bg-gray-100 min-h-screen">
            <div className="py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <header className="pb-8">
                        <h1 className="text-4xl font-bold text-center text-gray-800">Campus Placement Exam Practice</h1>
                        <p className="mt-4 text-lg text-center text-gray-600">
                            Prepare for your dream job with our curated MCQ practice tests.
                        </p>
                    </header>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Categories</h2>
                            <ul>
                                <li className="text-lg text-gray-700 mb-2">
                                    <Link to="/questions" className="hover:text-blue-600">Aptitude</Link>
                                </li>
                                <li className="text-lg text-gray-700 mb-2">
                                    <Link to="/questions" className="hover:text-blue-600">Reasoning</Link>
                                </li>
                                <li className="text-lg text-gray-700 mb-2">
                                    <Link to="/questions" className="hover:text-blue-600">Technical</Link>
                                </li>
                                <li className="text-lg text-gray-700 mb-2">
                                    <Link to="/questions" className="hover:text-blue-600">Verbal Ability</Link>
                                </li>
                                <li className="text-lg text-gray-700 mb-2">
                                    <Link to="/questions" className="hover:text-blue-600">General Awareness</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Exam Results</h2>
                            <ul>
                                <li className="text-lg text-gray-700 mb-2">
                                    <Link to="/results" className="hover:text-blue-600">Exam 1 - Aptitude</Link>
                                </li>
                                <li className="text-lg text-gray-700 mb-2">
                                    <Link to="/results" className="hover:text-blue-600">Exam 2 - Reasoning</Link>
                                </li>
                                <li className="text-lg text-gray-700 mb-2">
                                    <Link to="/results" className="hover:text-blue-600">Exam 3 - Technical</Link>
                                </li>
                                <li className="text-lg text-gray-700 mb-2">
                                    <Link to="/results" className="hover:text-blue-600">Exam 4 - Verbal Ability</Link>
                                </li>
                                <li className="text-lg text-gray-700 mb-2">
                                    <Link to="/results" className="hover:text-blue-600">Exam 5 - General Awareness</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Why Practice With Us?</h2>
                            <p className="text-lg text-gray-700">
                                Our platform offers:
                            </p>
                            <ul className="list-disc list-inside mt-2">
                                <li className="text-gray-700">Comprehensive exam categories.</li>
                                <li className="text-gray-700">Detailed performance analysis.</li>
                                <li className="text-gray-700">Real-time exam simulation.</li>
                                <li className="text-gray-700">User-friendly interface.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Home;
