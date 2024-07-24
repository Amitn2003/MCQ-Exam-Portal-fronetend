import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-grow p-8 bg-gray-50 text-black dark:bg-gray-800 dark:text-white ">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>
      <p className="text-lg mb-4">
        Welcome to our platform! We are dedicated to creating a space where users can engage, learn, and share knowledge effectively.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">Our Mission</h2>
      <p className="mb-4">
        Our mission is to empower individuals through accessible education and collaborative learning experiences.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">Our Values</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Integrity: We uphold honesty in all our actions.</li>
        <li>Innovation: We continuously seek new ways to improve.</li>
        <li>Community: We foster a supportive environment for all users.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-6 mb-4">Join Us</h2>
      <p className="mb-4">
        Be a part of our growing community. Together, we can make learning accessible and enjoyable for everyone!
      </p>
      <Link
        to="/register"
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Get Started
      </Link>
      <Link
        to="/login"
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Already User?
      </Link>
    </div>
  );
};

export default About;
