import { QueryClient, QueryClientProvider } from 'react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import ProfileSet from './pages/ProfilePage';
import PerformListPage from './pages/PerformListPage';
import RecordPage from './pages/RecordPage';
import GuChoice from './pages/GuChoice';
import KeywordPage from './pages/KeywordPage';
import SignUpPage from './pages/SignupPage';

// QueryClient 생성
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />
  },
  {
    path: '/signup',
    element: <SignUpPage />
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
    path: '/keyword',
    element: <KeywordPage />
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
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
