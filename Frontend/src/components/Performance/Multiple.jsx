
import React, { useState } from 'react';
import axios from 'axios';

export default function BulkUpload() {
  const [file, setFile] = useState(null);
  const API_URL =import.meta.env.VITE_BASE_URL;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert('Please select a file');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_URL}/upload/mark`, formData, {
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
    link.href = '/fun2.csv'; 
    link.download = 'sample_Mark_entry.csv';
    link.click();
  };
  return (
    <div className="card-view-student">
      <h1 className="text-xl font-bold">Upload Student Marks</h1>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="mt-4 border p-2"
      />
      <button
        onClick={handleUpload}
        className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
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