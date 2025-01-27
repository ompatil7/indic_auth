// import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Landing from './Landing'
import Landing from './Landing'
import SignUp from './SignUp'
import LoginPage from './LoginPage'
import HomePage from './HomePage'
import FlippedCard from './FlippedCard'
import { SpeechProvider } from './Avatar'
import LessonPage from './LessonPage';
import './App.css'

function App() {
  return (
    <Router>
      <SpeechProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/lesson/:levelId" element={<LessonPage />} />
        <Route path="/card" element={<FlippedCard />} />
      </Routes>
      </SpeechProvider>
    </Router>
  )
}

export default App