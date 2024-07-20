import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './styles/tailwind.css'
import './styles/mainPageStyle.css'
import Footer from './components/Footer';
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
import About from './pages/AboutUs';
import ManageQuestions from './pages/ManageQuestions';
import ReportedQuestions from './pages/ReportedQuestions';
import Profile from './pages/Profile';
import { AuthProvider } from './context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import PageNotFound from './pages/PageNotFound';

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
        <Toaster />
          <div className="flex flex-col min-h-screen bg-gray-900 text-white">
          <Navigation />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/add-question" element={<AddQuestion />} />
              <Route path="/questions" element={<GetQuestions />} />
              {/* <Route path="/exam" element={<Exam />} /> */}
              <Route path="/results" element={<ExamResults />} />
              <Route path="/results/:resultId" element={<DetailedAnalysis />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/users/:userId" element={<EditUser />} />
              <Route path="/admin/reported-questions" element={<ReportedQuestions />} />
              <Route path="/admin/manage-questions" element={<ManageQuestions />} />
              <Route path="/*" element={<PageNotFound />} />
              <Route path="*" element={<PageNotFound />} />
              <Route element={<PageNotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter >
    </>
  )
}

export default App
