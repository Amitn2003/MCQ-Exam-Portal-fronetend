import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton'; 

const ExamResults = ({ exams }) => {
  console.log(exams);
  const [loading, setLoading] = useState(true);


  return (
  <div>
      {exams.length === 0 ? (
        <p>No exams available.</p>
      ) : (
        exams.map((exam) => (
          <div key={exam._id} className="exam-card">
            <h2>{exam.exam ? exam.exam.title : <Skeleton />}</h2>
            <p>
              <strong>User:</strong> {exam.user ? exam.user.name : <Skeleton />}
            </p>
            <p>
              <strong>Email:</strong> {exam.user ? exam.user.email : <Skeleton />}
            </p>
            <p>
              <strong>Category:</strong> {exam.exam ? exam.exam.category : <Skeleton />}
            </p>
            <h3>Questions:</h3>
            {exam.exam && exam.exam.questions ? (
              exam.exam.questions.map((question) => {
                // Find the user's answer to this question
                const userAnswer = exam.answers ? exam.answers.find((answer) => answer.question === question._id) : null;
                return (
                  <div key={question._id} className="question-card">
                    <p>
                      <strong>Question:</strong> {question.question ? question.question : <Skeleton />}
                    </p>
                    <p>
                      <strong>Options:</strong> {question.options ? question.options.join(', ') : <Skeleton count={3} />}
                    </p>
                    <p>
                      <strong>Correct Answer:</strong> {question.options ? question.options[question.correctAnswer] : <Skeleton />}
                    </p>
                    {userAnswer ? (
                      <p className={userAnswer.selectedAnswer === question.correctAnswer ? 'text-green-500' : 'text-red-500'}>
                        <strong>Selected Answer:</strong>{' '}
                        {question.options ? question.options[userAnswer.selectedAnswer] : <Skeleton />}
                      </p>
                    ) : (
                      <p>
                        <strong>Selected Answer:</strong> No answer selected
                      </p>
                    )}
                    <p>
                      <strong>Explanation:</strong> {question.explanation ? question.explanation : <Skeleton />}
                    </p>
                  </div>
                );
              })
            ) : (
              <Skeleton count={3} height={50} />
            )}
          </div>
        ))
      )}
    </div>
   
  );
};

export default ExamResults;
