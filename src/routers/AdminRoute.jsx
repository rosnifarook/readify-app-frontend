import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function isValidAdminToken() {
  const token = localStorage.getItem("token");
  if (!token) return false;
  try {
    const [, payloadB64] = token.split(".");
    const payload = JSON.parse(atob(payloadB64));
    const now = Math.floor(Date.now() / 1000);
    if (!payload?.exp || payload.exp <= now) return false; // expired
    if (payload?.role && payload.role !== "admin") return false; // not admin
    return true;
  } catch {
    return false;
  }
}

const AdminRoute = ({ children }) => {
  if (!isValidAdminToken()) {
    localStorage.removeItem("token");
    return <Navigate to="/admin" replace />;
  }
  return children ? children : <Outlet />;
};

export default AdminRoute;

// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";

// const AdminRoute = ({ children }) => {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     return <Navigate to="/admin" />;
//   }
//   return children ? children : <Outlet />;
// };

// export default AdminRoute;
