import React from 'react'

const Contact = () => {
    const phoneNumber = '918910856469'; 
    const openWhatsAppChat = () => {
      const whatsappURL = `https://wa.me/${phoneNumber}`;
      window.open(whatsappURL, '_blank');
    };
  return (
    <>
    <div className="text-center p-6">
  <h1 className="text-3xl font-bold mb-4">Contact Me</h1>
  <p className="mb-8">For any inquiries or collaborations.</p>
  
  <button
  className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-600 hover:to-green-800 text-white font-semibold py-3 px-6 m-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 hover:tracking-wide"
  onClick={openWhatsAppChat}
>
 <span> Message me personally on <span className='font-bold tracking-wider'>WhatsApp</span></span>
</button>


  
  <p className="text-lg mb-4">Or reach out through other channels:</p>
  
  <ul className="m-14 mb-6 text-center">
    <li className="mb-2"><strong>Email:</strong> amitnaskar2003@gmail.com</li>
    <li className="mb-2"><strong>Phone:</strong> +91 89108 56469</li>
    <li className="mb-2"><strong>Address:</strong> West Bengal, India</li>
  </ul>
  
  <p className="text-lg">Follow me on social media:</p>
  
  <div className="flex justify-center space-x-4">
    <a href="https://https://www.linkedin.com/in/amit-naskar" target="_blank" className="text-blue-500 hover:text-blue-700">LinkedIn</a>
    <a href="https://fb.com/amitnaskar2003" target="_blank"  className="text-blue-500 hover:text-blue-700">Facebook</a>
    <a href="#" className="text-blue-500 hover:text-blue-700">Instagram</a>
  </div>
</div>

    </>
  )
}

export default Contact