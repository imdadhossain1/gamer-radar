import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import Root from './routes/root'
import Login from './routes/auth/login'

export default function App() {
  return <BrowserRouter>
    <Routes>
      <Route path='/' element={<Root />} />
      <Route path='auth'>
        <Route path='login' element={<Login />} />
      </Route>
    </Routes>
  </BrowserRouter>
}
