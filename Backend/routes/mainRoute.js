const mainroute = require('express').Router();
const adminroute=require('./adminroute')
const {getProfile}=require('../controllers/profile')
const { studentLogin, teacherLogin, logout,Check } = require( '../controllers/Authcontroller')

mainroute.use('/admin',adminroute)

mainroute.post('/student-login', studentLogin);
mainroute.post('/teacher-login', teacherLogin);
mainroute.post('/logout', logout);
mainroute.get("/profile/:id",getProfile);
mainroute.get("/check-auth",Check);

module.exports = mainroute;