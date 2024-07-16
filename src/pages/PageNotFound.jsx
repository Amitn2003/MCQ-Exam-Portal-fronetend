import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-md text-center">
        <h2 className="text-6xl font-bold text-gray-800">404</h2>
        <p className="text-2xl text-gray-600 mt-4">Page not found</p>
        <p className="text-gray-500 mt-2">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        <Link to="/" className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200">Go back home</Link>
      </div>
    </div>
  )
}

export default PageNotFound