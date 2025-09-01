import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute({ canNavigate, redirectPath = "/" }) {
  function parseJwt(token) {
    if (!token) return null; // 👈 evitar error si no existe
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      return null;
    }
  }

  const token = localStorage.getItem("token");
  canNavigate = parseJwt(token);
  if (!canNavigate || canNavigate.exp * 1000 < Date.now()) {
    return <Navigate to={redirectPath} />;
  }
  return <Outlet />;
}
