import React, { useState } from 'react';
import axios from 'axios';

const Attendance = () => {
  const [option, setOption] = useState(null);
  const [courseId, setCourseId] = useState('');
  const [hour, setHour] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [studentStats, setStudentStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    setLoading(true);

    if (option === 'single' && (hour === '' || courseId === '')) {
      alert('Please provide both hour and course ID.');
      setLoading(false);
      return;
    }
    if (option === 'all' && courseId === '') {
      alert('Please provide the course ID.');
      setLoading(false);
      return;
    }

    const endpoint =
      option === 'single'
        ? `http://127.0.0.1:5000/admin/getatt/${courseId}/${hour}`
        : `http://127.0.0.1:5000/admin/getattall/${courseId}`;

    try {
      const response = await axios.get(endpoint);

      console.log('API Response:', response.data);

      let data = [];
      if (option === 'single') {
        data = response.data[0]?.attendance || [];
        calculateStatistics(data);
      } else if (option === 'all') {
        data = response.data; 
        calculateStatisticsForAll(data);
      }

      setAttendanceData(data);
    } catch (err) {
      console.error('Error fetching attendance data:', err.message);
      setError('Failed to fetch attendance data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const calculateStatistics = (data) => {
    if (!Array.isArray(data)) {
      console.error('Invalid attendance data format.');
      setError('Invalid attendance data format received.');
      return;
    }

    const stats = {};
    const totalRecords = data.length;

    data.forEach((record) => {
      if (!stats[record.studentId]) {
        stats[record.studentId] = { present: 0, absent: 0 };
      }
      if (record.status === 'Present') {
        stats[record.studentId].present += 1;
      } else if (record.status === 'Absent') {
        stats[record.studentId].absent += 1;
      }
    });

    for (const studentId in stats) {
      const { present } = stats[studentId];
      stats[studentId].percentage = ((present / totalRecords) * 100).toFixed(2);
    }

    setStudentStats(stats);
  };

  const calculateStatisticsForAll = (data) => {
    if (!Array.isArray(data)) {
      console.error('Invalid attendance data format.');
      setError('Invalid attendance data format received.');
      return;
    }

    const stats = {};
    data.forEach((record) => {
      record.attendance.forEach((att) => {
        if (!stats[att.studentId]) {
          stats[att.studentId] = { present: 0, absent: 0 };
        }
        if (att.status === 'Present') {
          stats[att.studentId].present += 1;
        } else if (att.status === 'Absent') {
          stats[att.studentId].absent += 1;
        }
      });
    });

    for (const studentId in stats) {
      const { present } = stats[studentId];
      const totalRecords = data.reduce(
        (total, record) => total + record.attendance.length,
        0
      );
      stats[studentId].percentage = ((present / totalRecords) * 100).toFixed(2);
    }

    setStudentStats(stats);
  };

  return (
    <div className="card-view-student">
      <h1>Attendance Management</h1>
      <div className='button-list'>
        <button
         
          onClick={() => setOption('single')}
        >
          Get Single Hour Attendance
        </button>
        <button
         
          onClick={() => setOption('all')}
        >
          Get All Attendance
        </button>
      </div>

      {option && (
        <div className="card-input">
          <label className="block text-sm font-medium mb-2">Course ID:</label>
          <input
            type="text"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          {option === 'single' && (
            <>
              <label className="block text-sm font-medium mt-4 mb-2">Hour:</label>
              <input
                type="number"
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </>
          )}
          <button onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}

      {loading && <p className="text-blue-500">Loading data...</p>}
      {error && <p className="error">{error}</p>}
<div className="all-att">
      {option === 'all' &&
        Array.isArray(attendanceData) &&
        attendanceData.map((record, index) => (
          <div key={index} className="card-all-student">
            <h3 >
              Hour: {record.houre} <br/> Date: {new Date(record.date).toLocaleDateString()}
            </h3>
            <table className="card-student">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {record.attendance.map((att, idx) => (
                  <tr key={idx}>
                    <td>{att.studentId}</td>
                    <td>{att.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}</div>

      {attendanceData.length > 0 && option === 'single' && (
        <div  className="card-all-student">
          <h2 >Attendance Data</h2>
          <table className="card-student" >
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((record, index) => (
                <tr key={index}>
                  <td>{record.studentId}</td>
                  <td>{record.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {Object.keys(studentStats).length > 0 && (
        <div  className="card-all-student">
          <h2 >Student Statistics</h2>
          <table className="card-student">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Present</th>
                <th>Absent</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(studentStats).map(([studentId, stats]) => (
                <tr key={studentId}>
                  <td>{studentId}</td>
                  <td>{stats.present}</td>
                  <td>{stats.absent}</td>
                  <td>{stats.percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Attendance;