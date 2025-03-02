import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext,useEffect} from 'react'
import { checkAuth } from "./utils/api";
import { AuthContext } from "./context/AuthContext";
import './App.css'



// component
import Home from './pages/Home'
import Login from "./pages/Login";
import StudentDashboard from "./pages/Student/StudentDashboard";
import StaffDashboard from "./pages/Teacher/StaffDashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import HodDashboard from './pages/Hod/HodDashboard'


const App = () => {
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await checkAuth();
        setUser(res.data.user);
      } catch (err) {
        alert( err.response?.data?.message || err);
        setUser(null);
      }
    };
    fetchUser();
  }, [setUser]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={!user ? <Home /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />

        {/* Role-based Routing */}
        {user?.role === "student" && <Route path="/dashboard/*" element={<StudentDashboard />} />}
        {user?.role === "Staff" && <Route path="/dashboard/*" element={<StaffDashboard />} />}
        {user?.role === "Hod" && <Route path="/dashboard/*" element={<HodDashboard />} />}
        {user?.role === "admin" && <Route path="/dashboard/*" element={<AdminDashboard />} />}

        {/* Catch-all for unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App
