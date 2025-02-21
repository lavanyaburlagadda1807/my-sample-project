import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Playground from './pages/Playground'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/playground" element={
          <PrivateRoute>
            <Playground />
          </PrivateRoute>
        } />
        <Route path="/" element={<Navigate to="/playground" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
