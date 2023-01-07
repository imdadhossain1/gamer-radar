import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: '<div>Test</div>'
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
