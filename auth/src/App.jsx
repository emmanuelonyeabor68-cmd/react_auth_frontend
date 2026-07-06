import { useState } from 'react'
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'
import Activate from './pages/Activate'

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="login" />}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/activate/:uid/:token" element={<Activate />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/ForgetPassword" element={<ForgetPassword/>}/>
          <Route path="/resetPassword" element={<ResetPassword/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
 
