const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    courseId: String,
    date: { type: Date, default: Date.now },
    houre: { type: Number, required: true },
    attendance: [
      {
        studentId: String,
        status: { type: String, enum: ["Present", "Absent"], required: true },
        _id:false
      },
    ],
  });


module.exports = mongoose.model('Attendance', AttendanceSchema);