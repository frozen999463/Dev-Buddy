import './App.css'
import Header from './pages/header'
import Login from './pages/login'
import CodeEditor from './codeEditor/codeEditor'
import BrowseCourses from './pages/BrowseCourses'
import CourseLanding from './pages/CourseLanding'

import Footer from './pages/footer'
import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/signup'
import Home from './pages/home'
import AboutUs from './pages/about'
import ContactUs from './pages/contact_us'
import JourneyPage from './pages/journey_page'
import StudyPage from './pages/StudyPage'
import OnboardingName from './pages/onboarding'
import AdminDashboard from './pages/admin/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import { Toaster } from './components/ui/sonner'
/*
const auth = getAuth(app);
*/



function App() {
  return (
    <div className="w-full h-screen ">
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/codeEditor" element={<CodeEditor />} />
        <Route path="/home" element={<Home />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/contact_us' element={<ContactUs />} />
        <Route path='/journey/:id' element={<JourneyPage />} />
        <Route path='/course/:courseId/learn/:nodeId' element={<StudyPage />} />
        <Route path='/onboarding' element={<OnboardingName />} />
        <Route path="/courses" element={<BrowseCourses />} />
        <Route path="/course/:id" element={<CourseLanding />} />

        {/* 2️⃣ Add the protection here */}
        <Route
          path='/adminDashboard'
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
      <Toaster />
    </div>
  )
}

export default App
