import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditStudentForm = () => {
  const [studentId, setStudentId] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const fetchStudentData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://127.0.0.1:5000/admin/student/${studentId}`); // Replace with your API endpoint
      setStudentData(response.data);
    } catch (err) {
      setError('Failed to fetch student data. Please check the ID and try again.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(()=>{console.log(studentData)},[studentData])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handleNestedChange = (e, parentKey) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      [parentKey]: { ...studentData[parentKey], [name]: value },
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!studentData.name || studentData.name.trim() === '') {
      errors.name = 'Name is required.';
    }

    if (!studentData.dob) {
      errors.dob = 'Date of birth is required.';
    } else if (new Date(studentData.dob) > new Date()) {
      errors.dob = 'Date of birth cannot be in the future.';
    }

    if (!studentData.batch || studentData.batch.trim() === '') {
      errors.batch = 'Batch is required.';
    }

    if (!studentData.department.dep_id || studentData.department.dep_id.trim() === '') {
      errors.dep_id = 'Department ID is required.';
    }

    if (!studentData.department.dep_name || studentData.department.dep_name.trim() === '') {
      errors.dep_name = 'Department name is required.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const updateStudentData = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await axios.patch(`http://127.0.0.1:5000/admin/student/${studentId}`, studentData); // Replace with your API endpoint
      alert('Student data updated successfully!');
    } catch (err) {
      alert('Failed to update student data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    
    <div className='card-view-student'>
      <h1 className='heading-smallbox'>Edit Student Information</h1>
      {!studentData ? (
        <div>
          <input
            type="text"
            placeholder="Enter Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
          <button onClick={fetchStudentData} disabled={loading}>
            {loading ? 'Fetching...' : 'Fetch Student'}
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateStudentData();
          }}
        >
          <h2>Student Details</h2>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={studentData.name}
              onChange={handleInputChange}
            />
            {formErrors.name && <p style={{ color: 'red' }}>{formErrors.name}</p>}
          </label>
          <label>
            Date of Birth:
            <input
              type="text"
              name="dob"
              value={studentData.dob}
              onChange={handleInputChange}
            />
            {formErrors.dob && <p style={{ color: 'red' }}>{formErrors.dob}</p>}
          </label>
          <label>
            Batch:
            <input
              type="text"
              name="batch"
              value={studentData.batch}
              onChange={handleInputChange}
            />
            {formErrors.batch && <p style={{ color: 'red' }}>{formErrors.batch}</p>}
          </label>

          <h3>Department</h3>
          <label>
            Department ID:
            <input
              type="text"
              name="dep_id"
              value={studentData.department.dep_id}
              onChange={(e) => handleNestedChange(e, 'department')}
            />
            {formErrors.dep_id && <p style={{ color: 'red' }}>{formErrors.dep_id}</p>}
          </label>
          <label>
            Department Name:
            <input
              type="text"
              name="dep_name"
              value={studentData.department.dep_name}
              onChange={(e) => handleNestedChange(e, 'department')}
            />
            {formErrors.dep_name && <p style={{ color: 'red' }}>{formErrors.dep_name}</p>}
          </label>

          {/* Additional fields for parents, address, contact, etc. */}
          <h3>Studen Number Info</h3>
          <label>Aadhaar Number:</label>
            <input
            type="text"
            value={studentData.student_num.aadhaar_number}
            onChange={(e) => handleNestedChange(e, 'student_num', 'aadhaar_number')}
            />
             <label>UMIS Number:</label>
        <input
          type="text"
          value={studentData.student_num.umis_number}
          onChange={(e) => handleNestedChange(e, 'student_num', 'umis_number')}
        />

        <label>EMIS Number:</label>
        <input
          type="text"
          value={studentData.student_num.em_number}
          onChange={(e) => handleNestedChange(e, 'student_num', 'em_number')}
        />

        <label>Community ID:</label>
        <input
          type="text"
          value={studentData.student_num.community_id}
          onChange={(e) => handleNestedChange(e, 'student_num', 'community_id')}
        />

        <label>Income ID:</label>
        <input
          type="text"
          value={studentData.student_num.income_id}
          onChange={(e) => handleNestedChange(e, 'student_num', 'income_id')}
        />

        <label>First Graduate ID:</label>
        <input
          type="text"
          value={studentData.student_num.first_graduate_id}
          onChange={(e) => handleNestedChange(e, 'student_num', 'first_graduate_id')}
        />
        <h3>Student Personal Info</h3>
        <label>Father's Name:</label>
        <input
          type="text"
          value={studentData.parents.father_name}
          onChange={(e) => handleNestedChange(e, 'parents', 'father_name')}
        />
        

        <label>Mother's Name:</label>
        <input
          type="text"
          value={studentData.parents.mother_name}
          onChange={(e) => handleNestedChange(e, 'parents', 'mother_name')}
        />

        <label>Annual Income:</label>
        <input
          type="number"
          value={studentData.parents.annualIncome}
          onChange={(e) => handleNestedChange(e, 'parents', 'annualIncome')}
        />
        



        <label>Religion:</label>
        <input
          type="text"
          value={studentData.Info.religion}
          onChange={(e) => handleNestedChange(e, 'Info', 'religion')}
        />

        <label>Community:</label>
        <input
          type="text"
          value={studentData.Info.community}
          onChange={(e) => handleNestedChange(e, 'Info', 'community')}
        />

        <label>Email:</label>
        <input
          type="email"
          value={studentData.contact.email}
          onChange={(e) => handleNestedChange(e, 'contact', 'email')}
        />
        

        <label>Phone Number:</label>
        <input
          type="text"
          value={studentData.contact.phone1}
          onChange={(e) => handleNestedChange(e, 'contact', 'phone1')}
        />

        <label>Parent Number:</label>
        <input
          type="text"
          value={studentData.contact.phone2}
          onChange={(e) => handleNestedChange(e, 'contact', 'phone2')}
        />
        <div>
            <h3>Address</h3>
        <label>Street:</label>
        <input
          type="text"
          value={studentData.address.street}
          onChange={(e) => handleNestedChange(e, 'address', 'street')}
        />
        

        <label>City:</label>
        <input
          type="text"
          value={studentData.address.city}
          onChange={(e) => handleNestedChange(e, 'address', 'city')}
        />
       
        <label>Zip Code:</label>
        <input
          type="text"
          value={studentData.address.zipcode}
          onChange={(e) => handleNestedChange(e, 'address', 'zipcode')}
        />
       
      </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Confirm'}
          </button>
        </form>
      )}
    </div>
          </>
  );
};

export default EditStudentForm;
