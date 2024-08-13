import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getProfile, updateProfile } from '../api/userApi';
import { Link } from 'react-router-dom';
import ShareComponent from '../components/ShareComponent';
import InstallPromptComponent from '../components/InstallPromptComponent';
import { TextField, Button } from '@mui/material';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState({});
  const [pendingChanges, setPendingChanges] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile(user.token);
        console.log(data)
        setProfile(data);
      } catch (error) {
        console.error('Failed to fetch profile', error);
      }
    };

    fetchProfile();
  }, [user.token]);

  const handleInputChange = (e) => {
    setPendingChanges({
      ...pendingChanges,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const updatedProfile = await updateProfile(pendingChanges, user.token);
      setProfile((prevProfile) => ({
        ...prevProfile,
        ...pendingChanges,
      }));
      console.log(updatedProfile)
      setPendingChanges({});
      toast.success('Profile updated successfully!');
      setEditMode(false);
    } catch (error) {
      console.error('Failed to update profile', error);
      toast.error('Failed to update profile');
    }
  };

  const phoneNumber = '918910856469'; 
  const openWhatsAppChat = () => {
    const whatsappURL = `https://wa.me/${phoneNumber}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <div className='p-24 text-white bg-white dark:bg-slate-800 dark:text-white'>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        User Profile
      </h2>
      <img
        alt={user.name}
        src={profile.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random&rounded=true&size=500`}
        className="h-12 w-12 m-4 rounded-full"
      /> 

      <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
        Welcome back to XaMawo : {user.name}. 😊
      </p>

      {profile.isPremium ? (
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-2 mt-4">
          You are a Premium user. 👑
        </p>
      ) : (
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-2 mt-4">
          Upgrade to <span className='font-bold tracking-wider text-xl '> premium plan </span> for unlimited mock test exams and exclusive support and help from our professional skilled soft. dev. 👈
          <Link to="/subscription">
            <span className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md border border-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
              Check out our premium pricing
            </span>
          </Link>
        </p>
      )}

      

      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        This website is in beta version. 
      </p>





      {editMode ? (
        <>
          <TextField
            label="Name"
            name="name"
            value={pendingChanges.name || profile.name || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={profile.email || ''}
            fullWidth
            disabled
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={pendingChanges.password || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="College"
            name="college"
            value={pendingChanges.college || profile.college || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone"
            name="phone"
            value={pendingChanges.phone || profile.phone || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            name="address"
            value={pendingChanges.address || profile.address || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{ mt: 2 }}
          >
            Save Changes
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setEditMode(false)}
            sx={{ mt: 2, ml: 2 }}
          >
            Cancel
          </Button>
        </>
      ) : (
        <>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Email: {profile.email}</p>
          {profile.address && <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Address : {profile.address}</p>}
          {profile.college && <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">College : {profile.college}</p>}
          {profile.phone && <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Phone number : {profile.phone}</p>}
          <Button
            variant="contained"
            color="primary"
            onClick={() => setEditMode(true)}
            sx={{ mt: 2, mb:2, boxShadow:2 }}
          >
            Edit Profile
          </Button>
        </>
      )}






      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Suggest some features & improvements and send your honest feedback personally to me...
      </p> 

      <button
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full shadow-md"
        onClick={openWhatsAppChat}
      >
        Send me a WhatsApp message
      </button>
      
      <ShareComponent />
      <InstallPromptComponent />
    </div>
  );
}

export default Profile;
