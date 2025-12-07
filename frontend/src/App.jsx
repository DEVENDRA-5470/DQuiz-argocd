import Navbar from "./components/Navbar.jsx";
import { Routes, Route } from "react-router-dom";
import AuthRedirect from "./routes/AuthRedirect";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0e14] text-white">

      <Navbar />

      <div className="pt-[1px]">
        <Routes>
          
          <Route path="/" element={<Home />} />

          <Route
            path="/login"
            element={
              <AuthRedirect>
                <Login />
              </AuthRedirect>
            }
          />

          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowed={["admin"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student-dashboard"
            element={
              <ProtectedRoute allowed={["student"]}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

        </Routes>
      </div>

    </div>
  );
}
