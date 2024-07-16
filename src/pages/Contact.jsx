import React from 'react'

const Contact = () => {
    const phoneNumber = '918910856469'; 
    const openWhatsAppChat = () => {
      const whatsappURL = `https://wa.me/${phoneNumber}`;
      window.open(whatsappURL, '_blank');
    };
  return (
    <>
    Amit Naskar 
    <button
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full shadow-md"
      onClick={openWhatsAppChat}
    >
      Open WhatsApp Chat
    </button>
    </>
  )
}

export default Contact