import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import Logo from './assets/logo.png'
import './App.css'
import LoginPage from './pages/LoginPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />
  }
])

function App() {
  <RouterProvider router={router} />
}

export default App
