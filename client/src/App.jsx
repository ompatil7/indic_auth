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
import { AuthProvider } from './utils/AuthContext'
import NavigationBar from './components/NavigationBar'
import PrivateRoute from './PrivateRoute'
import { ToastProviderComponent } from './components/ui/use-toast'
import Stories from './Stories'

function App() {
  return (
    <AuthProvider>
      <ToastProviderComponent>
        <Router>
          <SpeechProvider>
            <NavigationBar />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<LoginPage />} />

              {/* protected routes (requires logged in) */}
              <Route path="/home" element={<PrivateRoute><HomePage /> </PrivateRoute>} />
              <Route path="/games" element={<PrivateRoute><GamesDashboard /> </PrivateRoute>} />
              {/* stories */}
              <Route path="/stories" element={<PrivateRoute><Stories /> </PrivateRoute>} />
              {/* learnings */}
              <Route path="/learnings" element={<PrivateRoute><Stories /> </PrivateRoute>} />
              {/* ar */}
              <Route path="/ar" element={<PrivateRoute><Stories /> </PrivateRoute>} />
              <Route path="/lesson/:levelId" element={<PrivateRoute> <LessonPage /></PrivateRoute>} />
              <Route path="/flippedcard" element={<PrivateRoute> <FlippedCard /></PrivateRoute>} />
              <Route path="/fillintheblanks" element={<PrivateRoute><FillInTheBlanks /> </PrivateRoute>} />
              <Route path="/frog" element={<PrivateRoute><Frog /> </PrivateRoute>} />
              <Route path="/match" element={<PrivateRoute> <Game /></PrivateRoute>} />
              <Route path="/sentence" element={<PrivateRoute><Sentence /> </PrivateRoute>} />
            </Routes>
          </SpeechProvider>
        </Router>
      </ToastProviderComponent>
    </AuthProvider>
  )
}

export default App