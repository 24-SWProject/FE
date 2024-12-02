import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
    const isLoggedIn = !!localStorage.getItem("accessToken"); // 토큰 존재 여부 확인

    return isLoggedIn ? children : <Navigate to="/" replace />;
}
