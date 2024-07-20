import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';


const Home = () => {
    const { isLoggedIn, isAdmin } = useAuth();
    const [user, setUser] = useState(false)
    const [admin, setAdmin] = useState(false)
    useEffect(() => {
        const logInInfo = () => {
            // console.log(isLoggedIn())
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
            <div className="min-h-screen bg-gray-600 dark:bg-slate-700">
                <div className="py-8 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <header className="pb-8">
                            <h1 className="text-4xl font-bold text-center dark:text-white ">Campus Placement Exam Practice</h1>
                            <p className="mt-4 text-lg text-center dark:text-white">Prepare for your dream job with our curated MCQ practice tests.</p>
                        </header>
                        {!user && (
                            <div className="text-center mb-6">
                                <h2 className="text-toxl font-semibold mb-2">Log In or Register</h2>
                                <div className="flex justify-center space-x-4">
                                    <Link
                                        to="/login"
                                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
                                    >
                                        Log In
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
                                    >
                                        Register
                                    </Link>
                                </div>
                            </div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                            <div className="bg-white rounded-lg shadow-md p-6 text-gray-900 dark:text-gray-800">
                                <h2 className="text-xl font-semibold mb-4">Categories</h2>
                                <ul>
                                    <li className="text-lg mb-2">
                                        <a href="/questions" className="hover:text-blue-600">Aptitude</a>
                                    </li>
                                    <li className="text-lg mb-2">
                                        <a href="/questions" className="hover:text-blue-600">Reasoning</a>
                                    </li>
                                    <li className="text-lg mb-2">
                                        <a href="/questions" className="hover:text-blue-600">Technical</a>
                                    </li>
                                    <li className="text-lg mb-2">
                                        <a href="/questions" className="hover:text-blue-600">JECA</a>
                                    </li>
                                    <li className="text-lg mb-2">
                                        <a href="/questions" className="hover:text-blue-600">Verbal Ability (Coming soon...)</a>
                                    </li>
                                    <li className="text-lg mb-2">
                                        <a href="/questions" className="hover:text-blue-600">General Awareness (Coming soon...)</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-white rounded-lg shadow-md p-6 text-gray-900 dark:text-gray-800">
                                <h2 className="text-xl font-semibold mb-4">Recent Exam Results</h2>
                                <ul>
                                    <li className="text-lg mb-2">
                                        <a href="/results" className="hover:text-blue-600">Exam 1 - Aptitude</a>
                                    </li>
                                    <li className="text-lg mb-2">
                                        <a href="/results" className="hover:text-blue-600">Exam 2 - Reasoning</a>
                                    </li>
                                    <li className="text-lg mb-2">
                                        <a href="/results" className="hover:text-blue-600">Exam 3 - Technical</a>
                                    </li>
                                    <li className="text-lg mb-2">
                                        <a href="/results" className="hover:text-blue-600">Exam 4 - Verbal Ability (Coming soon...)</a>
                                    </li>
                                    <li className="text-lg mb-2">
                                        <a href="/results" className="hover:text-blue-600">Exam 5 - General Awareness (Coming soon...)</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-white rounded-lg shadow-md p-6 text-gray-900 dark:text-gray-800">
                                <h2 className="text-xl font-semibold mb-4">Why Practice With Us?</h2>
                                <p className="text-lg">
                                    Our platform offers:
                                </p>
                                <ul className="list-disc list-inside mt-2">
                                    <li>Comprehensive exam categories.</li>
                                    <li>Detailed performance analysis.</li>
                                    <li>Real-time exam simulation.</li>
                                    <li>User-friendly interface.</li>
                                </ul>
                            </div>
                        </div>
                        <div className="bg-gray-100 py-12 dark:bg-slate-800">
                            <div className="max-w-4xl mx-auto px-4  text-gray-900 dark:text-white">
                                <h2 className="text-3xl font-semibold mb-6 text-center">What Our Users Say</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="bg-white rounded-lg shadow-md p-6 text-gray-600">
                                        <p className="text-lg mb-4">
                                            "This platform has been instrumental in my preparation journey. The mock tests are very realistic, and the detailed analysis helped me identify my weaknesses and improve."
                                        </p>
                                        <p className="text-gray-600 text-sm">- John Doe</p>
                                    </div>
                                    <div className="bg-white rounded-lg shadow-md p-6 text-gray-600">
                                        <p className="text-lg mb-4">
                                            "I'm really impressed with the quality of study materials provided. The quizzes are interactive, and the study plans are flexible enough to fit into my busy schedule."
                                        </p>
                                        <p className="text-gray-600 text-sm">- Jane Smith</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white text-black py-12 dark:bg-gray-800 dark:text-white">
                            <div className="max-w-4xl mx-auto px-4">
                                <h2 className="text-3xl font-semibold mb-6 text-center">Partnered with Leading Tech Companies</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-950">
                                    <div className="flex items-center justify-center bg-gray-100 rounded-lg p-6">
                                        <p className="text-lg">TCS</p>
                                    </div>
                                    <div className="flex items-center justify-center bg-gray-100 rounded-lg p-6">
                                        <p className="text-lg">Infosys</p>
                                    </div>
                                    <div className="flex items-center justify-center bg-gray-100 rounded-lg p-6">
                                        <p className="text-lg">Wipro</p>
                                    </div>
                                    {/* Add more company names as needed */}
                                </div>
                                <p className="text-lg mt-6 text-center  text-gray-900 dark:text-gray-100">
                                    Our platform is trusted by top tech companies for preparing candidates with industry-relevant skills and knowledge.
                                </p>
                                <p className="text-lg mt-2 text-center  text-gray-900 dark:text-gray-100 ">
                                    Join us to access exclusive opportunities and insights from industry leaders.
                                </p>
                            </div>
                        </div>
                        <div className="bg-gray-100 py-12 text-gray-900 dark:bg-gray-800 dark:text-white">
                            <div className="max-w-4xl mx-auto px-4">
                                <h2 className="text-3xl font-semibold mb-6 text-center">Why Choose Our Platform?</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-900">
                                    <div className="bg-white rounded-lg shadow-md p-6">
                                        <h3 className="text-xl font-semibold mb-4">Interactive Learning Experience</h3>
                                        <p className="text-lg">
                                            Engage with interactive quizzes, simulated exams, and hands-on projects designed to enhance learning and retention.
                                        </p>
                                    </div>
                                    <div className="bg-white rounded-lg shadow-md p-6">
                                        <h3 className="text-xl font-semibold mb-4">Personalized Study Plans</h3>
                                        <p className="text-lg">
                                            Tailor your study schedule with personalized learning paths based on your strengths, weaknesses, and learning preferences.
                                        </p>
                                    </div>
                                    <div className="bg-white rounded-lg shadow-md p-6">
                                        <h3 className="text-xl font-semibold mb-4">Comprehensive Exam Preparation</h3>
                                        <p className="text-lg">
                                            Access a wide range of exam categories, detailed performance analytics, and real-time exam simulations for thorough preparation.
                                        </p>
                                    </div>
                                    <div className="bg-white rounded-lg shadow-md p-6">
                                        <h3 className="text-xl font-semibold mb-4">Expert Guidance and Support</h3>
                                        <p className="text-lg">
                                            Benefit from expert-curated content, live classes, and personalized feedback to guide you through every step of your preparation journey.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white py-12 text-gray-900 dark:bg-gray-800 dark:text-white">
                            <div className="max-w-4xl mx-auto px-4">
                                <h2 className="text-3xl font-semibold mb-6 text-center">Success Stories</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 dark:text-gray-800">
                                    <div className="bg-gray-100 rounded-lg p-6">
                                        <div className="flex items-center mb-2">
                                            <div className="h-8 w-8 bg-gray-300 rounded-full mr-4"></div>
                                            <div>
                                                <h3 className="text-lg font-semibold">John Doe</h3>
                                                <p className="text-gray-700">Placed at Leading Tech Company</p>
                                            </div>
                                        </div>
                                        <p className="text-lg">
                                            John used our platform to prepare extensively for technical interviews and landed a prestigious role at a top tech company.
                                        </p>
                                    </div>
                                    <div className="bg-gray-100 rounded-lg p-6">
                                        <div className="flex items-center mb-2">
                                            <div className="h-8 w-8 bg-gray-300 rounded-full mr-4"></div>
                                            <div>
                                                <h3 className="text-lg font-semibold">Jane Smith</h3>
                                                <p className="text-gray-700">Achieved Top Scores in Competitive Exams</p>
                                            </div>
                                        </div>
                                        <p className="text-lg">
                                            Jane utilized our comprehensive study materials to achieve outstanding scores in multiple competitive exams.
                                        </p>
                                    </div>
                                    <div className="bg-gray-100 rounded-lg p-6">
                                        <div className="flex items-center mb-2">
                                            <div className="h-8 w-8 bg-gray-300 rounded-full mr-4"></div>
                                            <div>
                                                <h3 className="text-lg font-semibold">Michael Johnson</h3>
                                                <p className="text-gray-700">Received Scholarship for Higher Studies</p>
                                            </div>
                                        </div>
                                        <p className="text-lg">
                                            Michael's dedication and preparation on our platform led to him securing a scholarship for his higher studies.
                                        </p>
                                    </div>
                                    <div className="bg-gray-100 rounded-lg p-6">
                                        <div className="flex items-center mb-2">
                                            <div className="h-8 w-8 bg-gray-300 rounded-full mr-4"></div>
                                            <div>
                                                <h3 className="text-lg font-semibold">Sarah Brown</h3>
                                                <p className="text-gray-700">Secured Internship at Fortune 500 Company</p>
                                            </div>
                                        </div>
                                        <p className="text-lg">
                                            Sarah utilized our career resources to enhance her resume and secure a competitive internship at a Fortune 500 company.
                                        </p>
                                    </div>
                                </div>
                                <p className="text-lg mt-6 text-center">
                                    Discover how our platform has helped individuals achieve their career goals.
                                </p>
                                <p className="text-lg mt-2 text-center">
                                    Join us and start your journey towards success today!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Home;
