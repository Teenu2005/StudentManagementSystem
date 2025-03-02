import React, { useState } from 'react';
import axios from 'axios';

export default function SaveStudentMarks() {
  const [studentData, setStudentData] = useState({
    sem_num: 1,
    studentId: '',
    subject: [
      {
        name: '',
        code: '',
        max_mark: 100,
        ia_mark: '',
        ue_mark: '',
        total_mark: 100,
      },
    ],
  });

  const handleInputChange = (e, index, field) => {
    if (field === 'studentId' || field === 'sem_num') {
      setStudentData({ ...studentData, [field]: e.target.value });
    } else {
      const updatedSubjects = [...studentData.subject];
      updatedSubjects[index][field] = e.target.value;
      setStudentData({ ...studentData, subject: updatedSubjects });
    }
  };

  const addSubject = () => {
    setStudentData({
      ...studentData,
      subject: [
        ...studentData.subject,
        { name: '', code: '', max_mark: 100, ia_mark: '', ue_mark: '', total_mark: 100 },
      ],
    });
  };

  const handleSave = async () => {
    try {
      const response = await axios.post('http://localhost:5000/admin/result', studentData);
      alert('Student data saved successfully');
    } catch (error) {
        console.log(error)
        alert('Error saving student data');
    }
  };

  return (
    <div className="card-student">
      <h1 className="text-xl font-bold">Save Student Marks</h1>

      <div className="mt-4">
        <label className="block">Semester Number:</label>
        <input
          type="number"
          value={studentData.sem_num}
          onChange={(e) => handleInputChange(e, null, 'sem_num')}
          className="border p-2 w-full"
        />
      </div>

      <div className="mt-4">
        <label className="block">Student ID:</label>
        <input
          type="number"
          value={studentData.studentId}
          onChange={(e) => handleInputChange(e, null, 'studentId')}
          className="border p-2 w-full"
        />
      </div>

      {studentData.subject.map((sub, index) => (
        <div key={index} className="mt-4 border p-4 rounded">
          <h2 className="font-bold">Subject {index + 1}</h2>
          <label className="block">Name:</label>
          <input
            type="text"
            value={sub.name}
            onChange={(e) => handleInputChange(e, index, 'name')}
            className="border p-2 w-full"
          />

          <label className="block mt-2">Code:</label>
          <input
            type="text"
            value={sub.code}
            onChange={(e) => handleInputChange(e, index, 'code')}
            className="border p-2 w-full"
          />

          <label className="block mt-2">Internal Marks:</label>
          <input
            type="number"
            value={sub.ia_mark}
            onChange={(e) => handleInputChange(e, index, 'ia_mark')}
            className="border p-2 w-full"
          />

          <label className="block mt-2">University Marks:</label>
          <input
            type="number"
            value={sub.ue_mark}
            onChange={(e) => handleInputChange(e, index, 'ue_mark')}
            className="border p-2 w-full"
          />
        </div>
      ))}

      <button
        onClick={addSubject}
        id='back-but'
      >
        Add Subject
      </button>

      <button
        onClick={handleSave}
        type='submit'
      >
        Save Student Data
      </button>
    </div>
  );
}
