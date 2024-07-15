import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './styles/tailwind.css'
// import './app.css'
import AddQuestion from './components/AddQuestion';
// import GetQuestions from './components/GetQuestions';
import GetQuestions from './components/GetQuestions';
// import Exam from './pages/Exam';
import Register from './pages/Register';
import Login from './pages/Login';
import ExamResults from './pages/ExamResults';
import DetailedAnalysis from './pages/DetailedAnalysis';
import Navigation from './components/Navigation';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
