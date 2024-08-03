import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { getUserExamResults } from '../api/examResultApi';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'



const ExamResults = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);  
    const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const resultsPerPage = 10; // Define how many results per page
    const { user } = useAuth();

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true); // Start loading
            try {
                const data = await getUserExamResults(user.token, currentPage, resultsPerPage);
                console.log(data)
                setResults(data);
                setTotalPages(data.totalPages);
                
            } catch (error) { 
                console.error('Failed to fetch exam results', error);
                toast.error('Failed to fetch exam results');
                setLoading(false); // Set loading to false on error as well
            } finally {
                setLoading(false); // Stop loading regardless of success or failure
            }
        };

        fetchResults();
    }, [user.token, currentPage]);
    const handlePageChange = (event, page) => {
        setCurrentPage(page);
      };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };
    
      const handleNextPage = () => {
        if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
        }
      };

    // Function to calculate score based on questions array
    const calculateScore = (questions) => {
        let score = 0;

        if (!questions) return score; // Handle cases where questions is null or undefined

        questions.forEach(q => {
            // Ensure q.question and q.question.correctAnswer exist before accessing
            if (q.question && typeof q.question.correctAnswer === 'number') {
                if (q.selectedAnswer === q.question.correctAnswer) {
                    score++;
                }
            }
        });

        return score;
    };  

    // Function to calculate accuracy based on questions array
    const calculateAccuracy = (questions) => {
        if (questions.length === 0) return 0;
        const score = calculateScore(questions);
        return (score / questions.length) * 100;
    };


    let options = {    
        day: '2-digit',
        month: 'long',
        // year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true, // Use 24-hour format; set to true for 12-hour format with AM/PM
    };


    
    // <div className="bg-white text-black dark:bg-gray-800 shadow-md rounded-md p-6">
    //     <h2 className="text-2xl font-bold mb-4 dark:text-white">Your Exam Results</h2>
    //     {loading ? (
    //         <ul className="divide-y divide-gray-300 dark:divide-gray-600">
    //             {/* Render 5 skeleton items */}
    //             {[1, 2, 3, 4, 5 ,6,7].map((index) => (
    //                 <li key={index} className="py-4">
    //                     <Skeleton height={30}  />
    //                     <Skeleton height={10} width={200}  style={{ marginTop: '8px' }} />
    //                     <Skeleton height={10} width={150} style={{ marginTop: '4px' }} />
    //                     <Skeleton height={10} width={150} style={{ marginTop: '4px' }} />
    //                 </li>
    //             ))}
    //         </ul>
    //     ) : results.length === 0 ? (<>
    //         <p className="text-gray-600 dark:text-white">No exam results available.</p>
    //         <br />
    //         <img src="https://cdn-icons-png.flaticon.com/512/17134/17134606.png" title="no data icons" />
    //         </>
    //     ) : (
    //         <ul className="divide-y divide-gray-300 dark:divide-gray-600">
    //             {results.examResults.map((result) => {
                    
    //                 return (
    //                     <li key={result._id} className="py-4">
    //                         <h3 className="text-xl font-semibold mb-2 dark:text-white">
    //                             Exam taken on {new Date(result.createdAt).toLocaleDateString('en-GB', options)}
    //                         </h3>
    //                         <p className="text-gray-600 dark:text-gray-400">
    //                             Score: {calculateScore(result.questions)}/{result.totalQuestions}
    //                         </p>
    //                         <p className="text-gray-600 dark:text-gray-400">
    //                             Accuracy: {calculateAccuracy(result.questions).toFixed(2)}%
    //                         </p>
    //                         <Link
    //                             to={`/results/${result._id}`}
    //                             className="text-blue-500 hover:text-blue-600 transition duration-300"
    //                         >
    //                             View Detailed Analysis
    //                         </Link>
    //                     </li>
    //                 );
    //             })}
    //         </ul>
    //     )}
    // </div>
    return (
        <div className="bg-white text-black dark:bg-gray-800 shadow-md rounded-md p-6">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Your Exam Results</h2>
        {loading ? (
          <ul className="divide-y divide-gray-300 dark:divide-gray-600">
            {/* Render skeleton items */}
            {[1, 2, 3, 4, 5, 6, 7].map((index) => (
              <li key={index} className="py-4">
                <Skeleton height={30} />
                <Skeleton height={10} width={200} style={{ marginTop: '8px' }} />
                <Skeleton height={10} width={150} style={{ marginTop: '4px' }} />
                <Skeleton height={10} width={150} style={{ marginTop: '4px' }} />
              </li>
            ))}
          </ul>
        ) : results.examResults.length === 0 ? (
          <>
            <p className="text-gray-600 dark:text-white">No exam results available.</p>
            <br />
            <img src="https://cdn-icons-png.flaticon.com/512/17134/17134606.png" alt="No data" />
          </>
        ) : (
          <ul className="divide-y divide-gray-300 dark:divide-gray-600">
            {results.examResults.map((result) => (
              <li key={result._id} className="py-4">
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  Exam taken on {new Date(result.createdAt).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Score: {calculateScore(result.questions)}/{result.totalQuestions}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Accuracy: {calculateAccuracy(result.questions).toFixed(2)}%
                </p>
                <Link
                  to={`/results/${result._id}`}
                  className="text-blue-500 hover:text-blue-600 transition duration-300"
                >
                  View Detailed Analysis
                </Link>
              </li>
            ))}
          </ul>
        )}
  
  <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded-lg shadow-md flex justify-center">
            <Stack spacing={2} className="mt-4">
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    variant="outlined"
                    onChange={handlePageChange}
                    siblingCount={1}
                    color='primary'
                    className="text-black dark:text-white"
                />
            </Stack>
        </div>
      </div>
    );
};

export default ExamResults;
