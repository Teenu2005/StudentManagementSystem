const express = require('express');
const path = require('path');
const connectDB=require('./Database/DB')
const mainroute=require('./routes/mainRoute')
const cors = require('cors')
const cookieParser =require("cookie-parser");
const jwt = require( 'jsonwebtoken');
const multer = require("multer");
const env=require('dotenv').config()
APP_URI=process.env.FRONT_END_URI
// Create an Express application
const app = express();
// Middleware
app.use(cors({
  origin:APP_URI,
  credentials: true,
}));
app.use(express.json()); // To parse JSON bodies
app.use(cookieParser());
app.use(express.json());
console.clear();

connectDB();

app.use(mainroute)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  
console.log(process.env.PORT,"HELLO")
    console.log(`Server is running on port  http://127.0.0.1:${PORT}`);
});
