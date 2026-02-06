import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './pages/header'
import Login from './pages/login'
import CodeEditor from './codeEditor/codeEditor'

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { app } from "./firebase/firebase";
import Footer from './pages/footer'
import SignupPage from './pages/signup'
import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/signup'
import Home from './pages/home'
import AboutUs from './pages/about'
import ContactUs from './pages/contact_us'
import JourneyPage from './pages/journey_page'
import OnboardingName from './pages/onboarding'
import AdminDashboard from './pages/admin/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import { Toaster } from './components/ui/sonner'
const auth = getAuth(app);



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
        <Route path='/journey' element={<JourneyPage />} />
        <Route path='/onboarding' element={<OnboardingName />} />
        
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
      <Toaster/>
    </div>
  )
}

export default App
