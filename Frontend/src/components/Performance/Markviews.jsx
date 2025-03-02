import React, { useState } from 'react';
import { Bar, Pie,Line} from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import axios from 'axios';

const MarkDataDisplay = () => {
  const [viewType, setViewType] = useState('single');
  const [studentId, setStudentId] = useState('');
  const [semNum, setSemNum] = useState('');
  const [subjectCode, setSubjectCode] = useState('');
  const [marksData, setMarksData] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const Appuri=process.env.VITE_BASE_URL;
  const fetchMarksData = async () => {
    setLoading(true);
    setError('');

    try {
      let url = '';

      if (viewType === 'single') {
        url = `http://127.0.0.1:5000/admin/result/${studentId}/${semNum}`;
      } else if (viewType === 'multiple') {
        url = `http://127.0.0.1:5000/admin/result/${studentId}`;
      } else if (viewType === 'all') {
        url = `http://127.0.0.1:5000/admin/result/sub/${subjectCode}`;
      }

      const response = await axios.get(url);
      const data = response.data;
      console.log(data)
      setMarksData(data);
      
      if (viewType === 'all') {
        const chartLabels = data.map((entry) => entry.studentId);
        const chartMarks = data.map((entry) => entry.subject.reduce((sum, sub) => sum + sub.total_mark, 0));

        setChartData({
          labels: chartLabels,
          datasets: [
            {
              label: 'Total Marks',
              data: chartMarks,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        });
      }

    } catch (error) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='card-view-student'>
      <h2>Mark Data Display</h2>
      
      <div>
        <label>Select View Type: </label>
        <select onChange={(e) => setViewType(e.target.value)} value={viewType}>
          <option value="single">Single Semester</option>
          <option value="multiple">Multiple Semesters</option>
        </select>
      </div>

      {/* Form for Single Data */}
      {viewType === 'single' && (
        <div>
          <input
            type="text"
            placeholder="Enter Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Semester Number"
            value={semNum}
            onChange={(e) => setSemNum(e.target.value)}
          />
        </div>
      )}

      {/* Form for Multiple Data */}
      {viewType === 'multiple' && (
        <div>
          <input
            type="text"
            placeholder="Enter Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </div>
      )}

      {/* Form for All Data */}
      {viewType === 'all' && (
        <div>
          <input
            type="text"
            placeholder="Enter Subject Code"
            value={subjectCode}
            onChange={(e) => setSubjectCode(e.target.value)}
          />
        </div>
      )}

      {/* Submit Button */}
      <button onClick={fetchMarksData}>Fetch Data</button>

      {/* Loading and Error States */}
      {loading && <p>Loading...</p>}
      {error && <p className='error'>{error}</p>}

      {/* Render Table */}
      <div className='table-container'>

      {Array.isArray(marksData) && marksData.length > 0 ? (
  <table className='marks-table' >
    <th>{marksData.map((markEntry) =>
        markEntry.subject.map((subject) => (
          <>
          <tr><th colSpan={7} style={{background:'red',margin:'2em'}}>{markEntry.sem_num} Semester Result</th></tr>
          <thead>
      <tr>
        <th>Student ID</th>
        <th>Subject Name</th>
        <th>Subject Code</th>
        <th>Max Marks</th>
        <th>IA Marks</th>
        <th>UE Marks</th>
        <th>Total Marks</th>
      </tr>
    </thead>
    <tbody>
      {marksData.map((markEntry) =>
        markEntry.subject.map((subject) => (
          <>
          <tr key={`${markEntry.studentId}-${subject.code}`}>
            <td>{markEntry.studentId}</td>
            <td>{subject.name}</td>
            <td>{subject.code}</td>
            <td>{subject.max_mark}</td>
            <td>{subject.ia_mark}</td>
            <td>{subject.ue_mark}</td>
            <td>{subject.total_mark}</td>
          </tr>
          
          </>
        ))
      )}
    </tbody>
          </>
        ))
      )}</th>
    
    
  </table>
) : (
  
 <p className='error'>Error In getting Data</p> 
)}
      </div>

      {/* Render Chart for "All" View */}
      {viewType === 'all' && chartData && (
        <div>
          <h3>Marks Distribution</h3>
          <Line data={chartData} />
        </div>
      )}
    </div>
  );
};

export default MarkDataDisplay;




// {Array.isArray(marksData) && marksData.length > 0 ? (
//   <table border="1">
//     <thead>
//       <tr>
//         <th>Student ID</th>
//         <th>Subject Name</th>
//         <th>Subject Code</th>
//         <th>Max Marks</th>
//         <th>IA Marks</th>
//         <th>UE Marks</th>
//         <th>Total Marks</th>
//       </tr>
//     </thead>
//     <tbody>
//       {marksData.map((markEntry) =>
//         markEntry.subject.map((subject) => (
//           <>
//           <tr><th>{markEntry.sem_num}</th></tr>
//           <tr key={`${markEntry.studentId}-${subject.code}`}>
//             <td>{markEntry.studentId}</td>
//             <td>{subject.name}</td>
//             <td>{subject.code}</td>
//             <td>{subject.max_mark}</td>
//             <td>{subject.ia_mark}</td>
//             <td>{subject.ue_mark}</td>
//             <td>{subject.total_mark}</td>
//           </tr>
          
//           </>
//         ))
//       )}
//     </tbody>
//   </table>
// ) : (
//   <p>Error In getting Data</p>
// )}