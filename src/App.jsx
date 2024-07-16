import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './styles/tailwind.css'
// import './app.css'
import AddQuestion from './components/AddQuestion';
// import GetQuestions from './components/GetQuestions';
import GetQuestions from './pages/GetQuestions';
// import Exam from './pages/Exam';
import Register from './pages/Register';
import Login from './pages/Login';
import ExamResults from './pages/ExamResults';
import DetailedAnalysis from './pages/DetailedAnalysis';
import Navigation from './components/Navigation';
import AdminUsers from './pages/AdminUsers';
import EditUser from './pages/EditUsers';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import ReportedQuestions from './pages/ReportedQuestions';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageNotFound from './pages/PageNotFound';

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ToastContainer />
          <Navigation /> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add-question" element={<AddQuestion />} />
            <Route path="/questions" element={<GetQuestions />} />
            {/* <Route path="/exam" element={<Exam />} /> */}
            <Route path="/results" element={<ExamResults />} />
            <Route path="/results/:resultId" element={<DetailedAnalysis />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/users/:userId" element={<EditUser />} />  
            <Route path="/admin/reported-questions" element={<ReportedQuestions />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
