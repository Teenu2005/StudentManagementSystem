const Student = require("../models/Studentmodels")
const Course = require("../models/Classmodel")
const Attendance = require("../models/Attdence");

exports.getListOfStudent = async (req,res)=>{
    try{
        const course = await Course.findById(req.params.id);
        const studentbatch=course.Student_list.batch;
        const studentdep=course.Student_list.dep_id;
        if (!course || !studentbatch || !studentdep) {
            return res.status(404).json({ message: 'course is not found or course detail is empty'});
        }
        const students= await Student.find({"batch":studentbatch,"department.dep_id":studentdep})
        const eachone=students.map((e)=>{
            const listofobj={name:e.name,reg_num:e._id}
            return listofobj
        });
        res.status(200).send(eachone);
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}
// Post attendance
exports.markAttdence=async(req,res)=>{
    const { courseId, attendanceData,hour } = req.body; // attendanceData should be an array of { studentId, status }
    console.log(req)
    if (!courseId || !attendanceData || !Array.isArray(attendanceData)) {
      return res.status(500).send("Invalid input");
    }
    //  const alreadyIn = await Attendance.find({courseId:courseId,hour:hour})
    //     if( alreadyIn)
    //     {
    //         return res.status(400).send({Error:"record already exit"})
    //     }
    
    try {
        const newAttendance = new Attendance({
            courseId,
            houre:hour,
        attendance: attendanceData,
      });
  
      await newAttendance.save();
      res.status(201).send("Attendance recorded successfully");
    } catch (error) {
      console.error("Error saving attendance:", error);
      res.status(500).send("Internal Server Error");
    }
  };


exports.getAttendenceOfSingleDay=async(req,res)=>{
    const courseId =req.params.courseId;
    const houre =req.params.hour;
    if (!courseId || !houre==null) {
      return res.status(400).send(courseId);
    }
    try{
        const attendance= await Attendance.find({"courseId":courseId,"houre":houre})
        res.status(200).json(attendance)
    }catch(err){
        res.status(500).send({error:err,err:"vankam da mapala"});
    }
}
exports.getAttendenceAll=async(req,res)=>{
    const courseId =req.params.courseId;
    if (!courseId) {
      return res.status(400).send({courseId:"notfound"});
    }
    try{
        const attendance= await Attendance.find({"courseId":courseId})
        res.status(200).json(attendance)
    }catch(err){
        res.status(500).send({error:err,err:"vankam da mapala"});
    }
}
exports.getAttendenceForSingleStudent=async(req,res)=>{
    const courseId =req.params.courseId;
    const studentId =req.params.studentId;
    if (!courseId) {
      return res.status(400).send({courseId:"notfound"});
    }
    try{
        const attendance= await Attendance.find({"courseId":courseId})
        res.status(200).json(attendance)
    }catch(err){
        res.status(500).send({error:err,err:"vankam da mapala"});
    }
}