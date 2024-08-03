import React from 'react';
import { toast } from 'react-hot-toast';

const ShareComponent = () => {
    const websiteUrl = window.location.href;
    const title = "Transform Your Exam Prep with XaMawo!";
    const text = `🚀 Ace your exams with XaMawo! Comprehensive MCQ practice, real-time simulations, and expert guidance to help you land your dream job. Start now and join thousands of successful candidates! 🌟 ${websiteUrl} #ExamPrep #CareerSuccess #XaMawo`;

    const handleShare = async (platform) => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: text,
                    url: websiteUrl,
                });
                toast.success('Shared successfully!');
            } catch (error) {
                toast.error('Failed to share.');
            }
            return;
        }

        const encodedUrl = encodeURIComponent(`${import.meta.env.REACT_APP_BACKEND_URL}`);
        const encodedTitle = encodeURIComponent(title);
        const encodedText = encodeURIComponent(text);

        switch (platform) {
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`, '_blank');
                break;
            case 'linkedin':
                window.open(`https://www.linkedin.com/shareArticle?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedText}`, '_blank');
                break;
            case 'email':
                window.open(`mailto:?subject=${encodedTitle}&body=${encodedText} ${encodedUrl}`, '_self');
                break;
            case 'copy':
                navigator.clipboard.writeText(websiteUrl)
                    .then(() => toast.success('Link copied to clipboard!'))
                    .catch(() => toast.error('Failed to copy link.'));
                break;
            default:
                break;
        }
    };

    return (
        <div className="bg-white text-black p-6 rounded-lg shadow-md text-center max-w-md mx-auto m-3 ">
            <h2 className="text-2xl font-bold mb-4">Share Our Website</h2>
            <p className="text-gray-600 mb-4">Share this amazing site with your friends and colleagues!</p>
            <div className="flex justify-center space-x-4">
                <button
                    onClick={() => handleShare('facebook')}
                    className="bg-blue-600 text-white rounded-full p-3 hover:bg-blue-700 transition"
                    aria-label="Share on Facebook"
                >
                    <i className="fab fa-facebook-f"></i>
                </button>
                <button
                    onClick={() => handleShare('twitter')}
                    className="bg-blue-400 text-white rounded-full p-3 hover:bg-blue-500 transition"
                    aria-label="Share on Twitter"
                >
                    <i className="fab fa-twitter"></i>
                </button>
                <button
                    onClick={() => handleShare('linkedin')}
                    className="bg-blue-800 text-white rounded-full p-3 hover:bg-blue-900 transition"
                    aria-label="Share on LinkedIn"
                >
                    <i className="fab fa-linkedin-in"></i>
                </button>
                <button
                    onClick={() => handleShare('email')}
                    className="bg-red-500 text-white rounded-full p-3 hover:bg-red-600 transition"
                    aria-label="Share via Email"
                >
                    <i className="fas fa-envelope"></i>
                </button>
                <button
                    onClick={() => handleShare('copy')}
                    className="bg-gray-800 text-white rounded-full p-3 hover:bg-gray-900 transition"
                    aria-label="Copy link"
                >
                    <i className="fas fa-link"></i>
                </button>
            </div>
        </div>
    );
};

export default ShareComponent;
