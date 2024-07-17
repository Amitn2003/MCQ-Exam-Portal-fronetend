import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (<>

        <footer className="bg-gray-800 text-white py-6">
            <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
                <p className="text-sm">&copy; <i>Made by</i> Amit 😁. All rights reserved.</p>
                <div>
                    <Link to="/about" className="px-3 py-1 text-gray-300 hover:text-white">About Us</Link>
                    <Link to="/contact" className="px-3 py-1 text-gray-300 hover:text-white">Contact</Link>
                    <Link to="#" className="px-3 py-1 text-gray-300 hover:text-white">Privacy Policy</Link>
                </div>
            </div>
        </footer>
    </>
    )
}

export default Footer