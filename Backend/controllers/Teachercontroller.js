const csv = require('csv-parser');
const fs = require('fs');
const bcrypt = require('bcrypt');
const xlsx = require('xlsx');
const Teacher = require('../models/teachermodel');
const path = require('path');
const { response } = require('express');



// Controller for adding a Teacher
exports.addTeacher = async (req, res) => {
    try {
        const { name,_id,dob,password,department, address,contact} = req.body;
        const imagePath = req.file ? `/uploads/${req.file.filename}` : null; 
        const hashedPassword = await bcrypt.hash(password, 10);
        const teacher = new Teacher({
            name,
            _id,
            dob,
            password:hashedPassword,
            department,          
            address,
            contact,
            image: imagePath,
        });

        await teacher.save();
        res.status(201).json({ message: 'teacher added successfully', teacher });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Controller for getting all Teachers
exports.getAllTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.find();
        res.status(200).json(teacher);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller for getting a single Teacher by ID
exports.getTeacherById = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id);
        if (!teacher) {
            return res.status(404).json({ message: 'teacher not found'});
        }
        res.status(200).json(teacher);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller for updating a Teacher
exports.updateTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!teacher) {
            return res.status(404).json({ message: 'teacher not found' });
        }
        res.status(200).json({ message: 'teacher updated successfully', teacher });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller for deleting a Teacher
exports.deleteTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndDelete(req.params.id);
        if (!teacher) {
            return res.status(404).json({ message: 'teacher not found' });
        }
        res.status(200).json({ message: 'teacher deleted successfully'});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};







// Helper function to parse CSV files
// const parseCSV = (filePath) => {
//     return new Promise((resolve, reject) => {
//         const Teachers = [];
//         fs.createReadStream(filePath)
//             .pipe(csv())
//             .on('data', (row) => Teachers.push(row))
//             .on('end', () => resolve(Teachers))
//             .on('error', (error) => reject(error));
//     });
// };

// Helper function to parse XLS/XLSX files
// const parseXLS = (filePath) => {
//     const workbook = xlsx.readFile(filePath);
//     const sheetName = workbook.SheetNames[0];
//     const sheet = workbook.Sheets[sheetName];
//     return xlsx.utils.sheet_to_json(sheet);
// };

// Controller for adding multiple Teachers from file
// exports.addMultipleTeachersFromFile = async (req, res) => {
//     try {
//         const file = req.file;
//         console.log("ok file route")
//         if (!file) {
//             return res.status(400).json({ error: 'No file uploaded' });
//         }

//         let Teachers;
//         if (file.mimetype === 'text/csv') {
//             Teachers = await parseCSV(file.path);
//         } else if (
//             file.mimetype === 'application/vnd.ms-excel' ||
//             file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
//         ) {
//             Teachers = parseXLS(file.path);
//         } else {
//             return res.status(400).json({ error: 'Unsupported file format' });
//         }

        // Bulk insert Teachers into the database
//         const insertedTeachers = await Teacher.insertMany(Teachers);
//         res.status(201).json({ message: 'Teachers added successfully', Teachers: insertedTeachers });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     } finally {
//         // Cleanup uploaded file
//         if (req.file) {
//             fs.unlink(req.file.path, () => {});
//         }
//     }
// };


