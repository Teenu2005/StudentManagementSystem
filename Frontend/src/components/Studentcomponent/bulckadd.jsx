import React, { useState } from 'react';
import axios from 'axios';

export default function BulkUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert('Please select a file');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/admin/upload/student', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data);
    } catch (error) {
      alert('Error uploading file');
    }
  };

  const handleDownloadSample = () => {
    const link = document.createElement('a');
    link.href = '/fun.csv'; 
    link.download = 'sample_students.csv';
    link.click();
  };

  return (
    <div className="card-view-student">
      <h1 className="heading-smallbox">Upload Student Marks</h1>
      
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="mt-4 border p-2"
      />
      <button
        onClick={handleUpload}
        className="button-smallbox"
      >
        Upload
      </button>
      
      <button 
        onClick={handleDownloadSample}
        className="button-smallbox mt-4"
      >
        Download Sample CSV File
      </button>
    </div>
  );
}
