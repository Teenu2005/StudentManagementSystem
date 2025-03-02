const csv = require('csv-parser');
const fs = require('fs');
const xlsx = require('xlsx');
const Course = require('../models/Classmodel');
const path = require('path');
const { response } = require('express');



// Controller for adding a Teacher
exports.addCourse = async (req, res) => {
    try {
        const { _id,course_name,hour, Student_list,Teacher_detail} = req.body;
        
        const course = new Course({
            _id,
            course_name,
            hour,          
            Student_list,
            Teacher_detail,
        });

        await course.save();
        res.status(201).json({ message: 'class added successfully', course });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Controller for getting all Teachers
exports.getAllCourse = async (req, res) => {
    try {
        const course = await Course.find();
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller for getting a single Teacher by ID
exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'course not found'});
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller for updating a Teacher
exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!course) {
            return res.status(404).json({ message: 'course not found' });
        }
        res.status(200).json({ message: 'course updated successfully', course });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller for deleting a Teacher
exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'course not found' });
        }
        res.status(200).json({ message: 'course deleted successfully'});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};