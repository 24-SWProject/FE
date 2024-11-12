import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import ProfileSet from './pages/ProfilePage';
import PerformListPage from './pages/PerformListPage';
import RecordPage from './pages/RecordPage';
import GuChoice from './pages/GuChoice';

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
    element: <GuChoice />
  },
  {
    path: '/profileSet',
    element: <ProfileSet />
  },
  {
    path: '/performList',
    element: <PerformListPage />
  },
  {
    path: '/recording',
    element: <RecordPage />
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
