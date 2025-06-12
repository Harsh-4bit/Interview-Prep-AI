import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast' 

import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Home/Dashboard'
import InterviewPrep from './pages/InterviewPrep/InterviewPrep'
import UserProvider from './context/UserContext'




function App() {
  return (
    <UserProvider>
    
    <div>
        <Router>
            <Routes>
                <Route path='/' element={<LandingPage/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/dashboard' element={<Dashboard/>}/>
                <Route path='/interviewPrep/:sessionId' element={<InterviewPrep/>}/>

            </Routes>
        </Router>
    
        <Toaster toastOptions={{classname: "", style: {fontSize: '13px',},}}/>

    </div>
    </UserProvider>
  
  )
}

export default App
