const express = require('express');
const path = require('path');
const connectDB=require('./Database/DB')
const mainroute=require('./routes/mainRoute')
const cors = require('cors')
const cookieParser =require("cookie-parser");
const jwt = require( 'jsonwebtoken');
const multer = require("multer");
const env=require('dotenv').config()

// Create an Express application
const app = express();
// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json()); // To parse JSON bodies
app.use(cookieParser());
app.use(express.json());
console.clear();

connectDB();
// app.get("/check-auth", (req, res) => {
//   console.log("Incoming Cookies:", req.cookies); 

//   const token = req.cookies.token; 
//   if (!token) {
//     console.log("No Token Found");
//     return res.status(401).json({ message: "Not logged in", user: null });
//   }

//   try {
//     const secretKey = "JsonWebTokenError"; 
//     const decoded = jwt.verify(token, secretKey);
    
//     console.log("Decoded User:", decoded); 
//     res.json({ user: decoded });
//   } catch (err) {
//     console.error("JWT Error:", err);
//     res.status(401).json({ message: "Invalid token", user: null });
//   }
// });
app.use(mainroute)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  
console.log(process.env.PORT,"HELLO")
    console.log(`Server is running on port  http://127.0.0.1:${PORT}`);
});
