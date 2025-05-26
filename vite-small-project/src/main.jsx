import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

const router = createBrowserRouter ([

  {path: '/', element: <App />},
  {path: '/login', element: <Login />},
  {path: '/register', element: <Register />}, 
  {path: '*', element: <NotFoundPage/>}, // Fallback for unmatched routes

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
