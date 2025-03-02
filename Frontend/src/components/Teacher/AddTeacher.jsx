import React, { useState } from "react";
import axios from 'axios';
const AddTeacher = () => {
  const [formData, setFormData] = useState({
    department: {
      dep_id: "",
      dep_name: "",
      dep_role: "",
    },
    contact: {
      email: "",
      phone:'',
    },
    address: {
      street: "",
      city: "",
      zipcode: '',
    },
    _id: '',
    name: '',
    password:'Abcd@123',
    dob: '',
    image: null,
  });

  const [errors, setErrors] = useState({});

  const departmentOptions = [
    "BSc Computer Science",
    "BSc Physics",
    "BSc Chemistry",
    "BSc Mathematics",
    "Commerce",
    "BA Economic",
    "BA Tamil",
    "BA English",
  ];
  const rollOptions = [
    "Staff","Hod","admin"
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.department.dep_id.trim()) newErrors.dep_id = "Department ID is required.";
    if (!formData.department.dep_name) newErrors.dep_name = "Department name is required.";
    if (!formData.department.dep_role) newErrors.dep_role = "User Rolle is required is required.";
    if (!formData.contact.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact.email)) newErrors.email = "Valid email is required.";
    if (!formData.contact.phone.toString().match(/^\d{10}$/)) newErrors.phone = "Phone number must be 10 digits.";
    if (!formData.password.toString().match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) newErrors.password = "Password length must be greater than 8 characters \n Password length must be greater than 8 characters";
    if (!formData.address.street.trim()) newErrors.street = "Street is required.";
    if (!formData.address.city.trim()) newErrors.city = "City is required.";
    if (!formData.address.zipcode.toString().match(/^\d{5,6}$/)) newErrors.zipcode = "Zipcode must be 5 or 6 digits.";
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.dob) newErrors.dob = "Date of birth is required.";
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
         const response = await axios.post('http://127.0.0.1:5000/admin/teacher', formDataToSubmit);
         console.log('Data submitted successfully:', response.data);
         alert('Form submitted successfully!');
       } catch (error) {
         console.error('Error submitting the form:', error);
         alert('Failed to submit the form. Please try again.');
       }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className='add-top'>Teacher Details</h2>

      <label>Department ID:</label>
      <input
        type="text"
        name="department.dep_id"
        value={formData.department.dep_id}
        onChange={handleChange}
      />
      {errors.dep_id && <p style={{ color: "red" }}className="error">{errors.dep_id}</p>}

      <label>Department Name:</label>
      <select
        name="department.dep_name"
        value={formData.department.dep_name}
        onChange={handleChange}
      >
        <option value="">Select Department</option>
        {departmentOptions.map((dep) => (
          <option key={dep} value={dep}>
            {dep}
          </option>
        ))}
      </select>
      {errors.dep_name && <p style={{ color: "red" }}className="error">{errors.dep_name}</p>}

      <label>Department Role:</label>
      <select
        type="text"
        name="department.dep_role"
        value={formData.department.dep_role}
        onChange={handleChange}
      >
        <option value="">Select Role</option>
        {rollOptions.map((dep) => (
          <option key={dep} value={dep}>
            {dep}
          </option>
        ))}
      </select>
      {errors.dep_role && <p style={{ color: "red" }}className="error">{errors.dep_role}</p>}

      <h3>Contact</h3>

      <label>Email:</label>
      <input
        type="email"
        name="contact.email"
        value={formData.contact.email}
        onChange={handleChange}
      />
      {errors.email && <p style={{ color: "red" }}className="error">{errors.email}</p>}

      <label>Phone:</label>
      <input
        type="tel"
        name="contact.phone"
        value={formData.contact.phone}
        onChange={handleChange}
      />
      {errors.phone && <p style={{ color: "red" }}className="error">{errors.phone}</p>}

      <h3>Address</h3>

      <label>Street:</label>
      <input
        type="text"
        name="address.street"
        value={formData.address.street}
        onChange={handleChange}
      />
      {errors.street && <p style={{ color: "red" }}className="error">{errors.street}</p>}

      <label>City:</label>
      <input
        type="text"
        name="address.city"
        value={formData.address.city}
        onChange={handleChange}
      />
      {errors.city && <p style={{ color: "red" }}className="error">{errors.city}</p>}

      <label>Zipcode:</label>
      <input
        type="text"
        name="address.zipcode"
        value={formData.address.zipcode}
        onChange={handleChange}
      />
      {errors.zipcode && <p style={{ color: "red" }}className="error">{errors.zipcode}</p>}

      <label>Teacher ID:</label>
      <input
        type="number"
        name="_id"
        value={formData._id}
        onChange={handleChange}
      />

      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      {errors.name && <p style={{ color: "red" }}className="error">{errors.name}</p>}
      <label>Password:</label>
      <input
        type="text"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      {errors.password && <p style={{ color: "red" }}className="error">{errors.name}</p>}

      <label>Date of Birth:</label>
      <input
        type="date"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
      />
      {errors.dob && <p style={{ color: "red" }}className="error">{errors.dob}</p>}

      <label>Image:</label>
      <input
        type="file"
        name="image"
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            image: e.target.files[0],
          }))
        }
      />

      <button className='add-top' type="submit">Submit</button>
    </form>
  );
};

export default AddTeacher;
