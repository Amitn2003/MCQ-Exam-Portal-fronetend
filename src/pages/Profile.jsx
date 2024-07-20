import React, {useEffect} from 'react'
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';



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
    <div className=' p-24 text-white bg-white dark:bg-slate-800 dark:text-white '>

    <h2 className="text-2xl font-bold  text-gray-800 dark:text-white mb-4">
        User Profile
    </h2>
    <img
                    alt={user.name}
                    src={`https://ui-avatars.com/api/?name=${user.name}&background=random&rounded=true&size=500`}
                    className="h-12 w-12 m-4 rounded-full"
                  />

    <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
        Welcome back to XaMawo : {user.name}. 😊
    </p>
    {
      user.isPremium ? <p className="text-lg text-gray-600 dark:text-gray-300 mb-2 mt-4">
      You are a Premium user. 👑
  </p> : <p className="text-lg text-gray-600 dark:text-gray-300 mb-2  mt-4">
       Upgrade to <span className='font-bold tracking-wider text-xl '> premium plan </span> for unlimited mock test exams and exclusive support and help from our professional skilled soft. dev. 👈
       <Link to="/subscription">
      <span className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md border border-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
        Check out our premium pricing
      </span>
    </Link>
    </p>
    }

    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Email: {user.email}
    </p>

    {
      user && user.address && <p  className="text-lg text-gray-600 dark:text-gray-300 mb-8">{user.address}</p>
    }
    {
      user && user.college && <p  className="text-lg text-gray-600 dark:text-gray-300 mb-8">{user.college}</p>
    }
    {
      user && user.phone && <p  className="text-lg text-gray-600 dark:text-gray-300 mb-8">{user.phone}</p>
    }

    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
      This website is in beta version. 
    </p>
    
    <br />
    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
    Suggest some features & improvements and send your honest feedback personally to me...
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