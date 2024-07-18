import React, {useEffect} from 'react'
import { useAuth } from '../hooks/useAuth';




const Profile = () => {

    const { user } = useAuth();


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUserById(user._id, user.token);
                console.log(data)
            } catch (error) {
                console.error('Failed to fetch user');
            }
        };

        fetchUser();
    }, [user.token, user]);

    const phoneNumber = '918910856469'; 
    const openWhatsAppChat = () => {
      const whatsappURL = `https://wa.me/${phoneNumber}`;
      window.open(whatsappURL, '_blank');
    };



  return (
    <>
    <div className=' text-white bg-white dark:bg-slate-800 dark:text-white '>

    <h2 className="text-2xl font-bold  text-gray-800 dark:text-white mb-4">
        User Profile
    </h2>

    <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
        Welcome back {user.name}
    </p>

    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Email: {user.email}
    </p>

    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
      This website is in beta version. 
    </p>
    
    <br />
    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
    Suggest some features & improvements and give your honest feedback to me...
    </p> 

    <button
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full shadow-md"
      onClick={openWhatsAppChat}
    >
      Send me a WhatsApp message
    </button>

    </div>
</>

  )
}

export default Profile