import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />
  },
  {
    path: '/main',
    element: <MainPage />
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
