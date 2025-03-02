const mongoose = require('mongoose');

// Define the schema for the student model
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    _id: {
        type: Number,
        required: true,
        trim: true,
    },
    batch:{
        type: String,
        required: true,
        trim:true
    },
    dob:{
        type:String,
        required:true,
        trim:true
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
        }
    },
    student_num: {
        aadhaar_number: {
            type: Number,
            required: true,
            unique: true,
            trim: true,
        },
        umis_number: {
            type: Number,
            trim: true,
            unique: true,
        },
        em_number: {
            type: Number,
            trim: true,
            unique: true,
        },
        community_id:{
            type:String,
            trim:true,
            unique: true,
        },
        income_id:{
            type:String,
            trim:true,
            unique: true,
        },
        first_graduate_id:{
            type:String,
            trim:true,
            unique: true,
        },

    },
    parents: {
        father_name: {
            type: String,
            required: true,
            trim: true,
        },
        mother_name: {
            type: String,
            required: true,
            trim: true,
        },
        annualIncome: {
            type: Number,
            trim: true,
        },
    },
    Info:{
        religion:{
            type:String,
            trim:true,
        },
        community:{
            type:String,
            trim:true,
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
        phone1: {
            type: Number,
            required: true,
            trim: true,
        },
        phone2: {
            type: Number,
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
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
