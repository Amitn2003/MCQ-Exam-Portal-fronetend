import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (<>

<footer className="bg-gray-700 dark:bg-gray-800 text-white py-6">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-md text-gray-300">&copy; Copyright 2024 XaMawo 🐱 </p>
        <div className="flex mt-4 sm:mt-0">
            <Link to="/about" className="px-3 py-1 text-sm text-gray-300 hover:text-white text-center">About Us</Link>
            <Link to="/contact text-center" className="px-3 py-1 text-sm text-gray-300 hover:text-white text-center">Contact Us</Link>
            <Link to="/privacy" className="px-3 py-1 text-sm text-gray-300 hover:text-white text-center">Privacy Policy</Link>
            <Link to="/terms-of-service" className="px-3 py-1 text-sm text-gray-300 hover:text-white text-center">Terms of Service</Link>
            <Link to="/user-guide" className="px-3 py-1 text-sm text-gray-300 hover:text-white text-center">User Guide</Link>
       
        </div>
    </div>
</footer>
    </>
    )
}

export default Footer