import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { GroupProvider } from "./context/GroupContext";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import ProfileSet from "./pages/ProfilePage";
import PerformListPage from "./pages/PerformListPage";
import RecordPage from "./pages/RecordPage";
import GuChoice from "./pages/GuChoice";
import KeywordPage from "./pages/KeywordPage";
import SignUpPage from "./pages/SignupPage";
import AIAnswerPage from "./pages/AIAnswerPage";
import BookmarkedPage from "./pages/BookmarkedPage";
import PrivateRoute from "./pages/components/PrivateRouter";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/main",
    element: (
      <PrivateRoute>
        <MainPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/choice",
    element: (
      <PrivateRoute>
        <GuChoice />
      </PrivateRoute>
    ),
  },
  {
    path: "/keyword",
    element: (
      <PrivateRoute>
        <KeywordPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/profileSet",
    element: (
      <PrivateRoute>
        <ProfileSet />
      </PrivateRoute>
    ),
  },
  {
    path: "/performList",
    element: (
      <PrivateRoute>
        <PerformListPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/recording",
    element: (
      <PrivateRoute>
        <RecordPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/AIAnswer",
    element: (
      <PrivateRoute>
        <AIAnswerPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/bookmarked",
    element: (
      <PrivateRoute>
        <BookmarkedPage />
      </PrivateRoute>
    ),
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GroupProvider> {/* Context Provider 추가 */}
        <RouterProvider router={router} />
      </GroupProvider>
    </QueryClientProvider>
  );
}

export default App;
