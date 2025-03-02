import React, { useEffect, useState, useContext } from "react";
import axios from 'axios';
import { checkAuth } from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";
import img from '../../assets/images/profile.jpg'

const StudentDisplay = () => {
  const [viewMode, setViewMode] = useState(null); 
  const [inputValue, setInputValue] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [viewedStudent, setViewedStudent] = useState(null); 
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await checkAuth();
        setUser(res.data.user);
      } catch (err) {
        alert( err.response?.data?.message || err);
        setUser(null);
      }
    };
    fetchUser();
    role();
  }, [setUser]);
  const role=()=>{
    const butt=document.getElementById('butt-list')
    if (user?.role === "Staff"){butt.className='none'}
  }




  const fetchStudentData = async (query) => {
    const response = await axios.get(`http://127.0.0.1:5000/admin/student${query}`);
    const data = response.data;
    console.log(data)
    return data;
  };

  const handleSingleStudent = async () => {
    const data = await fetchStudentData(`/${inputValue}`);
    setSelectedStudent(data);
  };

  const handleMultipleStudents = async () => {
    const [batch, department] = inputValue.split(",").map((v) => v.trim());
    const data = await fetchStudentData(`/mul/${batch}/${department}`);
    setStudents(data);
  };

  const handleAllStudents = async () => {
    const data = await fetchStudentData(`/`);
    setStudents(data);
  };
  const renderStudentDetails = (student) => (
    <div  className="card-all-student">
      <div className="profile">
      <h2>{student.name}</h2>
      {student.image==null? <img src={img} className="profile-pic" alt="student image"/> :<img src={`http://127.0.0.1:5000${student.image}`} alt="Student Image" className="profile-pic" />}
      </div>
      <table>
        <tr>
          <th>
            <td>ID:</td>
          </th>
            <td>{student._id}</td>
        </tr>
        <tr>
          <th>
            <td>Batch:</td>
          </th>
            <td>{student.batch}</td>
        </tr>
        <tr>
          <th>
            <td>DOB:</td>
          </th>
            <td>{student.dob}</td>
        </tr>
        <tr>
          <th>
            <td>Department:</td>
          </th>
            <td>{student.department.dep_name}</td>
        </tr>
        <tr>
          <th>
            <td>Email:</td>
          </th>
            <td>{student.contact.email}</td>
        </tr>
        <tr>
          <th>
            <td>Phone:</td>
          </th>
            <td>{student.contact.phone1}</td>
        </tr>
        <tr>
          <th>
            <td>Address:</td>
          </th>
            <td>{student.address?.street}</td>
        </tr>
        <tr>
          <th>
            <td>Father's Name:</td>
          </th>
            <td>{student.parents?.father_name}</td>
        </tr>
        <tr>
          <th>
            <td>Mother's Name:</td>
          </th>
            <td>{student.parents?.mother_name}</td>
        </tr>
        <tr>
          <th>
            <td>Annual Income:</td>
          </th>
            <td>{student.parents.annualIncome}</td>
        </tr>
        <tr>
          <th>
            <td>Religion:</td>
          </th>
            <td>{student.Info?.religion}</td>
        </tr>
        <tr>
          <th>
            <td>Community:</td>
          </th>
            <td>{student.Info?.community}</td>
        </tr>

      </table>
    </div>
  );

  const handleViewStudentDetails = async (studentId) => {
    const data = await fetchStudentData(`/${studentId}`);
    setViewedStudent(data); 
    setViewMode('view')
  };
  
  return (
    <div className="card-view-student">
      <div id="butt-list" className="button-list">
        <button onClick={() => setViewMode("single")}>Single Student</button>
        {user?.role === "admin"?(
          <>
          <button onClick={() => setViewMode("multiple")}>Multiple Students</button>
          <button onClick={() => setViewMode("all")}>All Students</button>
          </>
        ):user?.role === "Hod"?(<button onClick={() => setViewMode("multiple")}>Multiple Students</button>):null
        }
      </div>

      {viewMode === "single" && (
        <div className="space-y-4">
          <input
            placeholder="Enter Student ID"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={handleSingleStudent}>Fetch Student</button>
        </div>
      )}

      {viewMode === "multiple" &&  (
        <div className="space-y-4">
          <input
            placeholder="Enter Batch, Department"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={handleMultipleStudents}>Fetch Students</button>
        </div>
      )}

      {viewMode === "all" &&(user?.role === "Hod"||user?.role === "admin")&& (
        <button onClick={handleAllStudents}>Fetch All Students</button>
      )}

      {selectedStudent && viewMode === "single" && (
        <div>
          <div>{renderStudentDetails(selectedStudent)}</div>
        </div>
      )}
      {viewedStudent && viewMode === "view" && (
        <div>
          <div>{renderStudentDetails(viewedStudent)}</div>
        </div>
      )}

      {(viewMode === "multiple" || viewMode === "all") && (
        <div className="grid gap-4">
          {students.map((student) => (
            <div key={student._id}>
              <div className="card-all-student">
                <div className="one">
                <table >
                    <tr>
                      <th>
                        <td>Name:</td>
                      </th>
                        <td>{student.name}</td>
                    </tr>
                    <tr>
                      <th>
                        <td>ID:</td>
                      </th>
                        <td>{student._id}</td>
                    </tr>
                    <tr>
                      <th>
                        <td>Phone:</td>
                      </th>
                        <td>{student.contact.phone1}</td>
                    </tr>
                </table>
                    <div><button className="view-but" onClick={() => handleViewStudentDetails(student._id)}>View</button></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
{/* 
      {viewedStudent && (
        <div className="mt-6">
          <h3 className="text-lg font-bold">Full Student Details:</h3>
          {renderStudentDetails(viewedStudent)}
        </div>
      )} */}
    </div>
  );
};

export default StudentDisplay;
