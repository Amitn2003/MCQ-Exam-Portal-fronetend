import React from 'react';

const UserGuide = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-center">User Guide</h1>
            
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                <p>
                    Welcome to XaMawo! This guide will help you understand how to use the platform effectively for your MCQ practice needs.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
                <p>
                    To start using XaMawo, you need to create an account or log in if you already have one. Once logged in, you can select the categories and subcategories you want to practice.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
                <p>
                    The dashboard provides an overview of your practice sessions, including your performance in different categories, and a summary of your recent activities. 
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Taking Exams</h2>
                <p>
                    To take an exam, navigate to the 'Start Exam' section, select your category and subcategory, and begin the test. The time limit is automatically calculated based on the number of questions.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Viewing Results</h2>
                <p>
                    After completing an exam, you can view your results and detailed analysis in the 'Results' section. This includes your score, time taken per question, and accuracy percentage.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Setting Goals</h2>
                <p>
                    You can set weekly or monthly goals for the number of questions you want to practice. Track your progress through the 'Goals' section on the dashboard.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">FAQs and Support</h2>
                <p>
                    If you have any questions or encounter any issues, please visit our FAQ section or contact our support team through the 'Contact Us' page.
                </p>
            </section>
        </div>
    );
};

export default UserGuide;
