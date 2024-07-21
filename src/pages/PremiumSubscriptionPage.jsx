import React from 'react';

const PremiumSubscriptionPage = () => {
    const plans = [
        {
            title: 'Free Plan',
            price: '₹0/month',
            benefits: [
                'Access to basic features',
                'No updates',
                'Only 5 Mock test per day.',
                'Access 1500+ questions'
            ],
            text: "I want free plan of XaMawo."
        },
        {
            title: 'Basic Plan',
            price: '₹30/month',
            benefits: [
                'Access to basic features',
                'Monthly updates',
                'Email support',
                'Unlimited test',
                'Access 5000+ questions'
            ],
            text: "I want basic 30₹ per month plan of XaMawo."
        },
        {
            title: 'Standard Plan',
            price: '₹60 every 3 months',
            benefits: [
                'Access to standard features',
                'Weekly updates',
                'Email and phone support',
                'Unlimited test',
                'Access 5000+ questions',
                'Access to permium community'
            ],
            text: "I want standard 60₹ per 3 months plan of XaMawo."
        },
        {
            title: 'Premium Plan',
            price: '₹100/year',
            benefits: [
                'Access to premium features',
                'Daily updates',
                'Unlimited test',
                'Access 5000+ questions',
                'Premium support (24/7)',
                'Access to permium community'
            ],
            text: "I want premium 100₹ per year plan of XaMawo."
        },
    ];

    const handleSubmit = (text) => {
        let phoneNumber = "+918910856469";
        // let message = "Hello, how are you?";

        // Encode the message
        let encodedMessage = encodeURIComponent(text);

        // Construct the WhatsApp link with the encoded message
        let whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        console.log(whatsappLink);
        location.href = whatsappLink
    }

    return (
        <div className="bg-gradient-to-br from-gray-400 to-gray-200  dark:from-gray-800 dark:to-gray-700 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
{/* from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-700 */}
            <div className="   py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white text-black  dark:bg-gray-900 rounded-lg shadow-md p-6 ">
                        <p className="text-black dark:text-white text-left mb-8">
                            Dear Valued Users,
                            <br /><br />
                            We hope this message finds you well. As we strive to ensure the continued operation and stability of our website for years to come, we kindly request your invaluable support through our premium membership plans. Your contributions will directly fund essential aspects such as hosting, maintenance, and operational costs.
                            <br /><br />
                            By becoming a premium member, you not only help sustain our services but also empower us to enhance and expand our offerings. Your patronage plays a crucial role in maintaining the quality and reliability of our platform.
                            <br /><br />
                            We deeply appreciate your consideration and support in this endeavor.
                            <br /><br />
                            Sincerely,
                            <br />
                            XaMawo 🐱
                        </p>
                    </div>
                </div>
            </div>


            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-black dark:text-gray-200 mb-8">Choose Your Plan</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <div key={index} className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold mb-4 text-black dark:text-white">{plan.title}</h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">{plan.price}</p>
                            <ul className="text-left mb-4">
                                {plan.benefits.map((benefit, idx) => (
                                    <li key={idx} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                        <svg
                                            className="w-4 h-4 text-green-500"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M8.65 15.65a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L8 13.586l6.293-6.293a1 1 0 111.414 1.414l-7 7z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className="block w-full py-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 transition duration-300" onClick={() => {
                                handleSubmit(plan.text)
                            }}>
                                Subscribe
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PremiumSubscriptionPage;
