import axios from 'axios';

// const API_URL = `https://mcq-portal-vercel.vercel.app/api/auth/`;
const API_URL = `${import.meta.env.REACT_APP_BACKEND_URL}/api/auth/`;

export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}register`, userData);
    return response.data;
};

export const loginUser = async (userData) => {
    const response = await axios.post(`${API_URL}login`, userData);
    return response.data;
};
