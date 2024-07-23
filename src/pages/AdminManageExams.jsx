import React, { useEffect, useState } from 'react';
import { getExams, deleteExam, updateExam } from '../api/examApi';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-hot-toast';

const AdminManageExams = () => {
    const { user } = useAuth();
    const [exams, setExams] = useState([]);
    const [editingExam, setEditingExam] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        questions: '',
        dueDate: ''
    });

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const data = await getExams(user.token);
                setExams(data);
            } catch (error) {
                toast.error('Failed to fetch exams');
            }
        };

        fetchExams();
    }, [user.token]);

    const handleDelete = async (id) => {
        try {
            await deleteExam(id, user.token);
            setExams(exams.filter((exam) => exam._id !== id));
            toast.success('Exam deleted successfully');
        } catch (error) {
            toast.error('Failed to delete exam');
        }
    };

    const handleEdit = (exam) => {
        setEditingExam(exam._id);
        setFormData({
            title: exam.title,
            category: exam.category,
            questions: exam.questions.join(','),
            dueDate: exam.dueDate.split('T')[0]
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedExam = {
                ...formData,
                questions: formData.questions.split(',').map(q => q.trim())
            };
            await updateExam(editingExam, updatedExam, user.token);
            setExams(exams.map(exam => (exam._id === editingExam ? { ...exam, ...updatedExam } : exam)));
            setEditingExam(null);
            toast.success('Exam updated successfully');
        } catch (error) {
            toast.error('Failed to update exam');
        }
    };

    // <div className="max-w-3xl mx-auto p-4 bg-white min-w-full text-black">
    //     <h2 className="text-2xl font-bold mb-4">Manage Exams</h2>
    //     {editingExam ? (
    //         <form onSubmit={handleUpdate} className="mb-4">
    //             <input
    //                 type="text"
    //                 placeholder="Title"
    //                 value={formData.title}
    //                 onChange={(e) => setFormData({ ...formData, title: e.target.value })}
    //                 className="block w-full mb-2 p-2 border"
    //                 required
    //             />
    //             <input
    //                 type="text"
    //                 placeholder="Category"
    //                 value={formData.category}
    //                 onChange={(e) => setFormData({ ...formData, category: e.target.value })}
    //                 className="block w-full mb-2 p-2 border"
    //                 required
    //             />
    //             <input
    //                 type="text"
    //                 placeholder="Questions (comma separated IDs)"
    //                 value={formData.questions}
    //                 onChange={(e) => setFormData({ ...formData, questions: e.target.value })}
    //                 className="block w-full mb-2 p-2 border"
    //                 required
    //             />
    //             <input
    //                 type="date"
    //                 value={formData.dueDate}
    //                 onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
    //                 className="block w-full mb-2 p-2 border"
    //                 required
    //             />
    //             <button type="submit" className="bg-blue-500 text-white p-2 rounded">Update Exam</button>
    //         </form>
    //     ) : (
    //         <ul>
    //             {exams.map((exam) => (
    //                 <li key={exam._id} className="mb-2">
    //                     <h3 className="font-bold">{exam.title}</h3>
    //                     <p>Category: {exam.category}</p>
    //                     <p>Due Date: {new Date(exam.dueDate).toLocaleDateString()}</p>
    //                     <button
    //                         onClick={() => handleEdit(exam)}
    //                         className="bg-yellow-500 text-white p-2 rounded mr-2"
    //                     >
    //                         Edit
    //                     </button>
    //                     <button
    //                         onClick={() => handleDelete(exam._id)}
    //                         className="bg-red-500 text-white p-2 rounded"
    //                     >
    //                         Delete
    //                     </button>
    //                 </li>
    //             ))}
    //         </ul>
    //     )}
    // </div>
    return (
        <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-lg text-black dark:bg-gray-700 dark:text-white">
      <h2 className="text-2xl font-bold mb-4">Manage Exams</h2>
      {editingExam ? (
        <form onSubmit={handleUpdate} className="mb-4">
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="block w-full mb-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="block w-full mb-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
          <input
            type="text"
            placeholder="Questions (comma separated IDs)"
            value={formData.questions}
            onChange={(e) => setFormData({ ...formData, questions: e.target.value })}
            className="block w-full mb-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            className="block w-full mb-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Update Exam
          </button>
        </form>
      ) : (
        <ul>
          {exams.map((exam) => (
            <li key={exam._id} className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h3 className="text-xl font-bold mb-2">{exam.title}</h3>
              <p className="text-sm text-gray-700 mb-1 dark:text-gray-200">Category: {exam.category}</p>
              <p className="text-sm text-gray-700 mb-1 dark:text-gray-200">Due Date: {new Date(exam.dueDate).toLocaleDateString()}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(exam)}
                  className="bg-yellow-500 text-white p-2 rounded-lg flex-1 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(exam._id)}
                  className="bg-red-500 text-white p-2 rounded-lg flex-1 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
    );
};

export default AdminManageExams;
