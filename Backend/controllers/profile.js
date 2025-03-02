const Student = require( '../models/Studentmodels');
const Teacher = require('../models/teachermodel');
const bcrypt = require( 'bcrypt');
const jwt = require( 'jsonwebtoken');

exports.getProfile= async (req, res) => {
    try {
        const user = await Student.findById(req.params.id)||await Teacher.findById(req.params.id);
        console.log(user)
        if (!user) {
            return res.status(404).json({ message: 'User not found'});
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  }