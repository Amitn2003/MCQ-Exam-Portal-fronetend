import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const GoogleAuth = () => {
    const { googleLogin } = useAuth();  // Custom hook to manage authentication
    const navigate = useNavigate();

    const handleGoogleSuccess = async (response) => {
        try {
            console.log(response)
            const token = response.credential;
            console.log(token)
            const res = await googleLogin(token);  // Call to backend API to handle Google login/signup
            toast.success('Logged in successfully!');
            navigate('/dashboard');  // Redirect to dashboard or another route
        } catch (error) {
            console.error('Google login failed:', error);
            toast.error('Google login failed. Please try again.');
        }
    };

    const handleGoogleFailure = (error) => {
        console.error('Google login failed:', error);
        toast.error('Google login failed. Please try again.');
    };

    return (
        <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
        />
    );
};

export default GoogleAuth;
