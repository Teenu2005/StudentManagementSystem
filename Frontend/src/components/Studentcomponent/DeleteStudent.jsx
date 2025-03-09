import React, { useState } from 'react';
import axios from 'axios';

function DeleteStudent() {
  const [id, setId] = useState('');
  const API_URL =import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        const response = await axios.delete(`${API_URL}/student/${id}`);
        alert('Deleted successfully!');
      } catch (error) {
        console.error('Error submitting the form:', error);
        alert('Failed to submit the form. Please try again.');
      }
    }
  };

  return (
    <div className='card-view-student'>
      <h1 className='heading-smallbox'>Register Number:</h1>
      <input
        type="text"
        onChange={(e) => setId(e.target.value)}
      />
      <b>Enter the Register number to delete the student</b>
      <button className='button-smallbox' onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default DeleteStudent;
