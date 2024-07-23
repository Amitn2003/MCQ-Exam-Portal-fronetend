import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';

const ExamResults = ({ exams }) => {
  console.log(exams);
  const [loading, setLoading] = useState(true);
  const [toggledExams, setToggledExams] = useState([]);

  const toggleExam = (examId) => {
    if (toggledExams.includes(examId)) {
      setToggledExams(toggledExams.filter(id => id !== examId));
    } else {
      setToggledExams([...toggledExams, examId]);
    }
  };
  function calculateTotalMarks(attempt) {
    let totalMarks = 0;

    attempt.exam.questions.forEach((question, index) => {
        if (attempt.answers[index].selectedAnswer === question.correctAnswer) {
            totalMarks++;
        }
    });

    return totalMarks;
}



  const calculateAverageAccuracy = (exam) => {
    let totalAccuracy = 0;
    let questionCount = 0;

    if (exam.exam && exam.exam.questions && exam.answers) {
      exam.exam.questions.forEach((question) => {
        const userAnswer = exam.answers.find((answer) => answer.question === question._id);
        if (userAnswer !== undefined && userAnswer.selectedAnswer === question.correctAnswer) {
          totalAccuracy++;
        }
        questionCount++;
      });
    }

    return questionCount === 0 ? 0 : (totalAccuracy / questionCount) * 100;
  };






  // <div>
  //     {exams.length === 0 ? (
  //       <p>No exams available.</p>
  //     ) : (
  //       exams.map((exam) => (
  //         <div key={exam._id} className="exam-card">
  //           <h2>{exam.exam ? exam.exam.title : <Skeleton />}</h2>
  //           <p>
  //             <strong>User:</strong> {exam.user ? exam.user.name : <Skeleton />}
  //           </p>
  //           <p>
  //             <strong>Email:</strong> {exam.user ? exam.user.email : <Skeleton />}
  //           </p>
  //           <p>
  //             <strong>Category:</strong> {exam.exam ? exam.exam.category : <Skeleton />}
  //           </p>
  //           <h3>Questions:</h3>
  //           {exam.exam && exam.exam.questions ? (
  //             exam.exam.questions.map((question) => {
  //               // Find the user's answer to this question
  //               const userAnswer = exam.answers ? exam.answers.find((answer) => answer.question === question._id) : null;
  //               return (
  //                 <div key={question._id} className="question-card">
  //                   <p>
  //                     <strong>Question:</strong> {question.question ? question.question : <Skeleton />}
  //                   </p>
  //                   <p>
  //                     <strong>Options:</strong> {question.options ? question.options.join(', ') : <Skeleton count={3} />}
  //                   </p>
  //                   <p>
  //                     <strong>Correct Answer:</strong> {question.options ? question.options[question.correctAnswer] : <Skeleton />}
  //                   </p>
  //                   {userAnswer ? (
  //                     <p className={userAnswer.selectedAnswer === question.correctAnswer ? 'text-green-500' : 'text-red-500'}>
  //                       <strong>Selected Answer:</strong>{' '}
  //                       {question.options ? question.options[userAnswer.selectedAnswer] : <Skeleton />}
  //                     </p>
  //                   ) : (
  //                     <p>
  //                       <strong>Selected Answer:</strong> No answer selected
  //                     </p>
  //                   )}
  //                   <p>
  //                     <strong>Explanation:</strong> {question.explanation ? question.explanation : <Skeleton />}
  //                   </p>
  //                 </div>
  //               );
  //             })
  //           ) : (
  //             <Skeleton count={3} height={50} />
  //           )}
  //         </div>
  //       ))
  //     )}
  //   </div>







  // <div>
  //   {exams.length === 0 ? (
  //     <p>No exams available.</p>
  //   ) : (
  //     exams.map((exam) => (
  //       <div key={exam._id} className={`exam-card ${toggledExams.includes(exam._id) ? 'exam-toggled' : ''}`}>
  //         <h2>{exam.exam ? exam.exam.title : <Skeleton />}</h2>
  //         <button onClick={() => toggleExam(exam._id)}>
  //           {toggledExams.includes(exam._id) ? 'Hide' : 'Show'}
  //         </button>
  //         {toggledExams.includes(exam._id) && (
  //           <>
  //             <p>
  //               <strong>User:</strong> {exam.user ? exam.user.name : <Skeleton />}
  //             </p>
  //             <p>
  //               <strong>Email:</strong> {exam.user ? exam.user.email : <Skeleton />}
  //             </p>
  //             <p>
  //               <strong>Category:</strong> {exam.exam ? exam.exam.category : <Skeleton />}
  //             </p>
  //             <h3>Questions:</h3>
  //             {exam.exam && exam.exam.questions ? (
  //               exam.exam.questions.map((question) => {
  //                 // Find the user's answer to this question
  //                 const userAnswer = exam.answers ? exam.answers.find((answer) => answer.question === question._id) : null;
  //                 return (
  //                   <div key={question._id} className="question-card">
  //                     <p>
  //                       <strong>Question:</strong> {question.question ? question.question : <Skeleton />}
  //                     </p>
  //                     <p>
  //                       <strong>Options:</strong> {question.options ? question.options.join(', ') : <Skeleton count={3} />}
  //                     </p>
  //                     <p>
  //                       <strong>Correct Answer:</strong> {question.options ? question.options[question.correctAnswer] : <Skeleton />}
  //                     </p>
  //                     {userAnswer ? (
  //                       <p className={userAnswer.selectedAnswer === question.correctAnswer ? 'text-green-500' : 'text-red-500'}>
  //                         <strong>Selected Answer:</strong>{' '}
  //                         {question.options ? question.options[userAnswer.selectedAnswer] : <Skeleton />}
  //                       </p>
  //                     ) : (
  //                       <p>
  //                         <strong>Selected Answer:</strong> No answer selected
  //                       </p>
  //                     )}
  //                     <p>
  //                       <strong>Explanation:</strong> {question.explanation ? question.explanation : <Skeleton />}
  //                     </p>
  //                   </div>
  //                 );
  //               })
  //             ) : (
  //               <Skeleton count={3} height={50} />
  //             )}
  //           </>
  //         )}
  //       </div>
  //     ))
  //   )}
  // </div>
  return  (
    <div className="p-4 md:p-8 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white">
      {exams.length === 0 ? (
        <p className="text-lg md:text-xl mb-4">No exams available.</p>
      ) : (
        exams.map((exam) => (
          <div key={exam._id} className={`exam-card bg-white dark:bg-gray-200 shadow-lg rounded-lg mb-4 md:mb-6 overflow-hidden ${toggledExams.includes(exam._id) ? 'exam-toggled' : ''}`}>
            <div className="p-4 md:p-6">
              <div className="flex justify-between items-center ">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-black">{exam.exam ? exam.exam.title : <Skeleton width={150} />}</h2>
                <p className="text-gray-700 dark:text-gray-700 ">
                  <strong>User:</strong> {exam.user ? exam.user.name : <Skeleton width={100} />}
                </p>
                <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none" onClick={() => toggleExam(exam._id)}>
                  {toggledExams.includes(exam._id) ? 'Hide' : 'Show'}
                </button>
              </div>
              {toggledExams.includes(exam._id) && (
                <>
                  <div className="my-4 ">
                    <p className="text-gray-700 dark:text-gray-800">
                      <strong>Email:</strong> {exam.user ? exam.user.email : <Skeleton width={200} />}
                    </p>
                    <p className="text-gray-700 dark:text-gray-800">
                      <strong>Total Marks:</strong> {exam.exam ? calculateTotalMarks(exam) : <Skeleton width={50} />}
                    </p>
                    <p className="text-gray-700 dark:text-gray-800">
                      <strong>Average Accuracy:</strong> {exam.exam ? calculateAverageAccuracy(exam).toFixed(2) + '%' : <Skeleton width={50} />}
                    </p>
                    <p className="text-gray-700 dark:text-gray-800">
                      <strong>Category:</strong> {exam.exam ? exam.exam.category : <Skeleton width={150} />}
                    </p>
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Questions:</h3>
                  {exam.exam && exam.exam.questions ? (
                    exam.exam.questions.map((question) => {
                      // Find the user's answer to this question
                      const userAnswer = exam.answers ? exam.answers.find((answer) => answer.question === question._id) : null;
                      return (
                        <div key={question._id} className="question-card bg-gray-200 p-2 md:p-3 rounded-lg mb-1">
                          <p className="text-gray-700">
                            <strong>Question:</strong> {question.question ? question.question : <Skeleton width={200} />}
                          </p>
                          <p className="text-gray-700">
                            <strong>Options:</strong> {question.options ? question.options.join(', ') : <Skeleton count={3} />}
                          </p>
                          <p className="text-gray-700">
                            <strong>Correct Answer:</strong> {question.options ? question.options[question.correctAnswer] : <Skeleton width={100} />}
                          </p>
                          {userAnswer ? (
                            <p className={`text-lg ${userAnswer.selectedAnswer === question.correctAnswer ? 'text-green-500' : 'text-red-500'}`}>
                              <strong>Selected Answer:</strong>{' '}
                              {question.options ? question.options[userAnswer.selectedAnswer] : <Skeleton width={100} />}
                            </p>
                          ) : (
                            <p className="text-gray-700">
                              <strong>Selected Answer:</strong> No answer selected
                            </p>
                          )}
                          <p className="text-gray-700">
                            <strong>Explanation:</strong> {question.explanation ? question.explanation : <Skeleton width={200} />}
                          </p>
                        </div>
                      );
                    })
                  ) : (
                    <Skeleton count={3} height={50} />
                  )}
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ExamResults;
