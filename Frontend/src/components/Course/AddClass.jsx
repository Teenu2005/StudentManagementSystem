import React, { useState } from "react";
import axios from "axios";


const CourseForm = () => {
  const [formData, setFormData] = useState({
    _id: "",
    course_name: "",
    hour: '',
    Student_list: {
      batch: "",
      dep_id: "",
    },
    Teacher_detail: {
      teacher_id: '',
      teacher_name: "",
    },
  });

  const [errors, setErrors] = useState({});
  const API_URL =import.meta.env.VITE_BASE_URL;

  const validate = () => {
    const newErrors = {};

    if (!formData._id.trim()) newErrors._id = "Course ID is required.";
    if (!formData.course_name.trim()) newErrors.course_name = "Course name is required.";
    if (!formData.hour || formData.hour <= 0) newErrors.hour = "Hours must be a positive number.";
    if (!formData.Student_list.batch.trim()) newErrors.batch = "Batch is required.";
    if (!formData.Student_list.dep_id.trim()) newErrors.dep_id = "Department ID is required.";
    if (!formData.Teacher_detail.teacher_id || formData.Teacher_detail.teacher_id <= 0) newErrors.teacher_id = "Teacher ID must be a positive number.";
    if (!formData.Teacher_detail.teacher_name.trim()) newErrors.teacher_name = "Teacher name is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");

    if (keys.length > 1) {
      setFormData((prev) => ({
        ...prev,
        [keys[0]]: {
          ...prev[keys[0]],
          [keys[1]]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
           if (!validate()) {
             alert('Please correct the errors in the form');
             return;
           }
           try {
             const formDataToSubmit = {
               ...formData,
               image: formData.image ? URL.createObjectURL(formData.image) : null
             };
             const response = await axios.post(`${API_URL}/class`, formDataToSubmit);
             console.log('Data submitted successfully:', response.data);
             alert('Form submitted successfully!');
           } catch (error) {
             console.error('Error submitting the form:', error);
             alert('Failed to submit the form. Please try again.');
           }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      
      
      <div className='sub-form'>
      <h2>Course Details</h2>

      <label>Course ID:</label>
      <input
        type="text"
        name="_id"
        value={formData._id}
        onChange={handleChange}
        required
      />
      {errors._id && <p style={{ color: "red" }}>{errors._id}</p>}

      <label>Course Name:</label>
      <input
        type="text"
        name="course_name"
        value={formData.course_name}
        onChange={handleChange}
        required
      />
      {errors.course_name && <p style={{ color: "red" }}>{errors.course_name}</p>}

      <label>Hours:</label>
      <input
        type="number"
        name="hour"
        value={formData.hour}
        onChange={handleChange}
        required
      />
      {errors.hour && <p style={{ color: "red" }}>{errors.hour}</p>}
    </div>
    <div className='sub-form'>
      <h3>Student List</h3>

      <label>Batch:</label>
      <input
        type="text"
        name="Student_list.batch"
        value={formData.Student_list.batch}
        onChange={handleChange}
        required
      />
      {errors.batch && <p style={{ color: "red" }}>{errors.batch}</p>}

      <label>Department ID:</label>
      <input
        type="text"
        name="Student_list.dep_id"
        value={formData.Student_list.dep_id}
        onChange={handleChange}
        required
      />
      {errors.dep_id && <p style={{ color: "red" }}>{errors.dep_id}</p>}
    </div>
    <div className='sub-form'>
      <h3>Teacher Details</h3>

      <label>Teacher ID:</label>
      <input
        type="number"
        name="Teacher_detail.teacher_id"
        value={formData.Teacher_detail.teacher_id}
        onChange={handleChange}
        required
      />
      {errors.teacher_id && <p style={{ color: "red" }}>{errors.teacher_id}</p>}

      <label>Teacher Name:</label>
      <input
        type="text"
        name="Teacher_detail.teacher_name"
        value={formData.Teacher_detail.teacher_name}
        onChange={handleChange}
        required
      />
      {errors.teacher_name && <p style={{ color: "red" }}>{errors.teacher_name}</p>}
  </div>
      <button type="submit">Submit</button>
    </form>
    </>
  );
};

export default CourseForm;
