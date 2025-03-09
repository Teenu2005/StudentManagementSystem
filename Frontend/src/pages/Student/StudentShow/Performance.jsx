import React, { useState,useEffect,useContext } from 'react';
import { checkAuth } from "../../../utils/api";
import { AuthContext } from "../../../context/AuthContext";
import { Bar, Pie,Line} from 'react-chartjs-2';
import axios from 'axios';
import navItem from '../StudentNavItem'
import NavBar from '../../../components/NavBar'

const MarkDataDisplay = () => {
  const [viewType, setViewType] = useState('single');
  const [semNum, setSemNum] = useState('');
  const [subjectCode, setSubjectCode] = useState('');
  const [marksData, setMarksData] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const Appuri=process.env.VITE_BASE_URL;
    const { user, setUser } = useContext(AuthContext);
    const API_URL =import.meta.env.VITE_BASE_URL;
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const res = await checkAuth();
          setUser(user);
        } catch (err) {
          alert( err.response?.data?.message || err);
          setUser(null);
        }
      };
      fetchUser();
    }, [setUser]);
  const fetchMarksData = async () => {
    setLoading(true);
    setError('');

    try {
      let url = '';

      if (viewType === 'single') {
        url = `${API_URL}/result/${user.id}/${semNum}`;
      } else if (viewType === 'multiple') {
        url = `${API_URL}/result/${user.id}`;
      }

      const response = await axios.get(url);
      const data = response.data;
      console.log(data)
      setMarksData(data);

    } catch (error) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <NavBar nav={navItem} />
    <main>
    <div className="continer">
    <div className='card-view-student'>
      <h2>Mark Data Display</h2>
      
      <div>
        <label>Select View Type: </label>
        <select onChange={(e) => setViewType(e.target.value)} value={viewType}>
          <option value="single">Single Semester</option>
          <option value="multiple">Multiple Semesters</option>
        </select>
      </div>

      {viewType === 'single' && (
        <div>
          
          <input
            type="text"
            placeholder="Enter Semester Number"
            value={semNum}
            onChange={(e) => setSemNum(e.target.value)}
          />
        </div>
      )}

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

      <button onClick={fetchMarksData}>Fetch Data</button>

      
      {loading && <p>Loading...</p>}
      {error && <p className='error'>{error}</p>}

      
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
    </div> 
    </main>
    </>
  );
};

export default MarkDataDisplay;
