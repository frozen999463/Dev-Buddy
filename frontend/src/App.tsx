import './App.css'
import Header from './pages/header'
import Login from './pages/login'
import CodeEditor from './codeEditor/codeEditor'
import BrowseCourses from './pages/BrowseCourses'
import CourseLanding from './pages/CourseLanding'

import Footer from './pages/footer'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Signup from './pages/signup'
import Home from './pages/home'
import AboutUs from './pages/about'
import ContactUs from './pages/contact_us'
import JourneyPage from './pages/journey_page'
import StudyPage from './pages/StudyPage'
import MyCourses from './pages/MyCourses'
import OnboardingName from './pages/onboarding'
import ProfilePage from './pages/profile'
import ReviewPage from './pages/rewie'
import AdminDashboard from './pages/admin/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import LeaderboardPage from './pages/leaderboard_page'
import { Toaster } from './components/ui/sonner'
/*
const auth = getAuth(app);
*/

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/adminDashboard');
  const isIdePage = location.pathname === '/ide';

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminPage && !isIdePage && <Header />}
      <main className="flex-1">
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
          <Route path='/review' element={<ReviewPage />} />
          <Route path="/courses" element={<BrowseCourses />} />
          <Route path="/course/:id" element={<CourseLanding />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/leaderboard/:id" element={<LeaderboardPage />} />
          <Route path="/ide" element={<div className="h-screen"><CodeEditor /></div>} />

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
      </main>
      {!isAdminPage && !isIdePage && <Footer />}
      <Toaster />
    </div>
  )
}

export default App
