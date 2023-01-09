import React from 'react'
import ReactDOM from 'react-dom/client'
import { useCookies } from 'react-cookie'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

import Root from './routes/root'
import Login from './routes/auth/login'
import Register from './routes/auth/register'

export default function App() {
  const [cookies, setCookie] = useCookies(['username']);
  
  return <BrowserRouter>
    <Routes>
      <Route path='/*' element={<Root />} />
      <Route path='auth'>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Route>
    </Routes>
  </BrowserRouter>
}
