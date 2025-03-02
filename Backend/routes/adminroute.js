const adminroute = require('express').Router();
const {addStudent,getStudentById,getAllStudents,updateStudent,deleteStudent,getStudentByBatch,addMultipleStudentsFromFile}=require('../controllers/Studentcontroller')
const {addTeacher,getTeacherById,getAllTeacher,updateTeacher,deleteTeacher}=require('../controllers/Teachercontroller')
const {addCourse,getCourseById,getAllCourse,updateCourse,deleteCourse}=require('../controllers/Course')
const {getListOfStudent,markAttdence,getAttendenceOfSingleDay,getAttendenceAll,getAttendenceForSingleStudent}=require('../controllers/Attdencecontroller')
const {addMark,getAllMark,singleMark,bulkUploadMarks}=require('../controllers/MarkController')
const { bulkUpload, uploads } = require("../controllers/StudentBulckUpload");
const {messageToAll,sendMessageToAllStudents}=require("../controllers/Mail")

const upload = require('../middlewares/upload');

adminroute.get('/student',getAllStudents)
adminroute.get('/student/:id',getStudentById)
adminroute.get('/student/mul/:batch/:department',getStudentByBatch)
adminroute.post('/addStudent', upload.single('image'), addStudent);
adminroute.patch('/student/:id',updateStudent)
adminroute.delete('/student/:id',deleteStudent)

// adding multiple student

adminroute.post("/upload/student", uploads.single("file"), bulkUpload);


// Teacher  controlles
adminroute.get('/teacher',getAllTeacher)
adminroute.get('/teacher/:id',getTeacherById)
adminroute.post('/teacher',addTeacher)
adminroute.patch('/teacher/:id',updateTeacher)
adminroute.delete('/teacher/:id',deleteTeacher)

// Course
adminroute.get('/class',getAllCourse)
adminroute.get('/class/:id',getCourseById)
adminroute.post('/class',addCourse)
adminroute.patch('/class/:id',updateCourse)
adminroute.delete('/class/:id',deleteCourse)


// Attendence
adminroute.get('/makatt/:id',getListOfStudent)
adminroute.get('/getatt/:courseId/:hour',getAttendenceOfSingleDay)
adminroute.get('/getattall/:courseId',getAttendenceAll)
adminroute.post('/putatt',markAttdence)

// student attendence
adminroute.get('/student/attendence/:courseId/:studentId',getAttendenceForSingleStudent)

// marks
adminroute.post('/result',addMark)
// adminroute.get('/result/sub/:subcode',getbysub)
adminroute.get('/result/:id',getAllMark)
adminroute.get('/result/:id/:semid',singleMark)
adminroute.post('/upload/mark', upload.single('file'),bulkUploadMarks)


// Email Service
adminroute.post('/send-email',messageToAll)
adminroute.post('send-sms',sendMessageToAllStudents)

module.exports = adminroute;