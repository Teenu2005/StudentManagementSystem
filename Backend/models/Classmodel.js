const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        trim: true,
    },
    course_name:{
        type:String,
        required:true,
        trim:true
    },
    hour:{
        type:Number,
        required:true,
    },
    Student_list:{
        batch:{
            type:String,
            ref:'Student',
            required:true,
            trim:true
        },
        dep_id:{
            type:String,
            ref:'Student',
            required:true,
            trim:true
        }
    },
    Teacher_detail:{
        teacher_id:{
            type:Number,
            ref: 'Teacher',
            required:true 
        },
        teacher_name:{
            type:String,
            required:true
        }
    },
},
{ timestamps: true });


const Course = mongoose.model('course', courseSchema);

module.exports = Course;