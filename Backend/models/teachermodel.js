const mongoose = require('mongoose');

// Define the schema for the student model
const TeacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    _id: {
        type: Number,
        required: true,
       
        trim: true,
    },
    dob: {
        type: String,
        required: true,
        trim: true,
    },
    department:{
        dep_id:{
        type: String,
        trim:true,
        required:true
        },
        dep_name:{
            type:String,
            trim:true,
            required:true
        },
        dep_role:{
            type:String,
            trim:true,
            required:true
        }
    },
    contact: {
        email: {
            type: String,
            trim: true,
            validate: {
                validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
                message: 'Invalid email format',
            },
        },
        phone: {
            type: Number,
            required: true,
            trim: true,
        },
    },
    address: {
        street: {
            type: String,
            required: true,
            trim: true,
        },
        city: {
            type: String,
            required: true,
            trim: true,
        },
        zipcode: {
            type: Number,
            required: true,
            trim: true,
        },
    },
    image: {
        type: String,  
        required: false,
    },
}, { timestamps: true });

// Export the model
const Teacher = mongoose.model('teacher', TeacherSchema);

module.exports = Teacher;