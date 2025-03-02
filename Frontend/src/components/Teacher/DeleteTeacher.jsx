import React, { useState } from 'react'
import axios from 'axios'
function DeleteTeacher() {
    const [id,setid]=useState('');
    const handleSubmit = async (e) => {
        try {
          const response = await axios.delete(`http://127.0.0.1:5000/admin/teacher/${id}`);
          alert('Deleted  successfully!');
        } catch (error) {
          console.error('Error submitting the form:', error);
          alert('Failed to submit the form. Please try again.');
        }
      };
  return (
   
    <div   className='card-view-student'>
      <h1 className='heading-smallbox'>Register Number:</h1>
      <input
        type="text"
        
        onChange={(e) =>setid(e.target.value)}
      />
       <b>Enter the Register number to delete the Teacher</b> 

    <button type='submit' onClick={handleSubmit}>Submit</button>
      </div>

  )
}

export default DeleteTeacher