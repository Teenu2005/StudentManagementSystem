
const Student = require('../models/Studentmodels');

exports.addStudent = async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        console.log('File Uploaded:', req.file);

        const { name, _id, batch, dob, department, student_num, parents, Info, address, contact } = req.body;
        const imagePath = req.file ? `/uploads/${req.file.filename}` : null; 

        const student = new Student({
            name,
            _id,
            batch,
            dob,
            department,
            student_num,
            parents,
            Info,
            address,
            contact,
            image: imagePath, 
        });

        await student.save();
        res.status(201).json({ message: 'Student added successfully', student });
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error.message);
    }
};


exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found'});
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getStudentByBatch = async (req, res) => {
    try {

        const batch =req.params.batch;
        const department = req.params.department;
        const student = await Student.find({batch:batch,'department.dep_id':department});
        if (!student) {
            return res.status(404).json({ message: 'Student not found'});
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller for updating a student
exports.updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student updated successfully', student });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student deleted successfully',responce: student });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
