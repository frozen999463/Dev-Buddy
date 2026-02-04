import { useState } from 'react'
import reactLogo from './assets/react.svg'
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
const auth = getAuth(app);



function App() {

  return (



    <div className="w-full h-screen ">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Navigate to="home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/codeEditor" element={<CodeEditor />}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path='/about' element = {<AboutUs></AboutUs>}></Route>
        <Route path='/contact_us' element={<ContactUs></ContactUs>}></Route>
        <Route path='/journey' element={<JourneyPage></JourneyPage>}></Route>
        <Route path='/onboarding' element={<OnboardingName></OnboardingName>}></Route>
        <Route path='/adminDashboard' element={<AdminDashboard></AdminDashboard>}></Route>

      </Routes>
      <Footer></Footer>

    </div>

  )
}

export default App

