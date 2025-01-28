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
import GamesDashboard from './components/Games/GamesDashboard'
import FillInTheBlanks from './components/Games/FillInTheBlanks'
import Frog from './components/Games/Frog'
import Game from './components/Games/Match'
import Sentence from './components/Games/Sentence'
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
        <Route path="/games" element={<GamesDashboard />} />
        <Route path="/lesson/:levelId" element={<LessonPage />} />
        <Route path="/flippedcard" element={<FlippedCard />} />
        <Route path="/fillintheblanks" element={<FillInTheBlanks/>} />
        <Route path="/frog" element={<Frog/>} />
        <Route path="/match" element={<Game/>} />
        <Route path="/sentence" element={<Sentence/>} />
      </Routes>
      </SpeechProvider>
    </Router>
  )
}

export default App