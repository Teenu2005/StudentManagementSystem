import axios from "axios";
import Cookies from "js-cookie";


const API_URL =import.meta.env.VITE_BASE_MAIN_URL;

export const studentLogin = async (studentId, dob) => {
  return axios.post(`${API_URL}/student-login`, { studentId, dob }, { withCredentials: true });
};

export const teacherLogin = async (teacherId, password) => {
  return axios.post(`${API_URL}/teacher-login`, { teacherId, password }, { withCredentials: true });
};
export const getUserRole = () => {
  const token = Cookies.get("token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1])); 
    console.log(payload.role)
    return { role: payload.role, id: payload.id };
  } catch {
    return null;
  }
};

export const logout = async () => {
   axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    localStorage.removeItem('user');
    // window.location.href = '/login';
};
export const checkAuth = async () => {
  return axios.get(`${API_URL}/check-auth`, { withCredentials: true }); 
};