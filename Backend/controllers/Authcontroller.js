const Student = require( '../models/Studentmodels');
const Teacher = require('../models/teachermodel');
const bcrypt = require( 'bcrypt');
const jwt = require( 'jsonwebtoken');

const generateToken = (res, id, role) => {
  const secretKey = "JsonWebTokenError"; 
    const token = jwt.sign({ id, role },secretKey, { expiresIn: '1d' });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, 
      sameSite: "Lax", 
      maxAge: 24 * 60 * 60 * 1000,
    });
    console.log("Cookie Set:", res.getHeaders()["set-cookie"]);
};

exports.studentLogin = async (req, res) => {
  const { studentId, dob } = req.body;
  try {
    const student = await Student.findOne({ _id: studentId,dob});
    if (!student) return res.status(401)({ message: 'Invalid credentials' });
    generateToken(res, student._id, 'student');
    res.json({ message: 'Student logged in', role: 'student', id: student._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error',"error":error });
  }
};

exports.teacherLogin = async (req, res) => {
  const { teacherId, password } = req.body;
  try {
    const teacher = await Teacher.findOne({ _id: teacherId });
    if (!teacher) return res.status(401).json({ message: 'Invalid ID' });
    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid Password' });
    generateToken(res, teacher._id, teacher.department.dep_role);
    res.json({ message: 'Teacher logged in', role: teacher.department.dep_role, id: teacher._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error',"error":error });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
};

exports.Check=(req, res) => {
  // console.log("Incoming Cookies:", req.cookies); 

  const token = req.cookies.token; 
  if (!token) {
    return res.status(401).json({ message: "Not logged in", user: null });
  }

  try {
    const secretKey = "JsonWebTokenError"; 
    const decoded = jwt.verify(token, secretKey);
    
    // console.log("Decoded User:", decoded); 
    res.json({ user: decoded });
  } catch (err) {
    // console.error("JWT Error:", err);
    res.status(401).json({ message: "Invalid token", user: null });
  }
}
