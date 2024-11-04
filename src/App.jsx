import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import KeywordPage from './pages/KeywordPage';
import ProfileSet from './pages/ProfilePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />
  },
  {
    path: '/main',
    element: <MainPage />
  },
  {
    path: '/choice',
    element: <KeywordPage />
  },
  {
    path: '/profileSet',
    element: <ProfileSet />
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
