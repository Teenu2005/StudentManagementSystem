import React, { useState } from "react";
import axios from "axios";

const AttendanceMarking = () => {
  const [courseId, setCourseId] = useState("");
  const [hour, setHour] = useState("");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/admin/makatt/${courseId}`);
      setStudents(response.data);
      const initialAttendance = {};
      response.data.forEach((student) => {
        initialAttendance[student.reg_num] = "Absent";
      });
      setAttendance(initialAttendance);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleRadioChange = (reg_num, status) => {
    setAttendance((prev) => ({
      ...prev,
      [reg_num]: status,
    }));
  };

  const handleSubmit = async () => {
    try {
      const attendanceData = Object.keys(attendance).map((reg_num) => ({
        studentId: reg_num, 
        status: attendance[reg_num],
      }));

      const payload = {
        courseId,
        attendanceData,
        hour,
      };

      console.log("Payload to be sent:", payload); 

      await axios.post("http://127.0.0.1:5000/admin/putatt", payload);

      alert("Attendance submitted successfully!");
    } catch (error) {
      console.error("Error submitting attendance:", error);
      alert("Failed to submit attendance. Please try again.");
    }
  };

  return (
    <div >
      <div className="card-view-student" >
      <h1>Mark Attendance</h1>

        <label htmlFor="courseId" className="block mb-2 font-medium">
          Course ID:
        </label>
        <input
          type="text"
          id="courseId"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className="border rounded p-2 w-full"
        />
        <label htmlFor="hour" className="block mb-2 font-medium">
          Hour:
        </label>
        <input
          type="number"
          id="hour"
          value={hour}
          onChange={(e) => setHour(e.target.value)}
          className="border rounded p-2 w-full"
        />

      <button
        onClick={fetchStudents}
        type="submit"
        >
        Fetch Students
      </button>
        </div>

      {students.length > 0 && (
        <div className="student-list">
        <h2 className="student-list-title">Student List</h2>
        <div className="attendance-container">
          <table className="attendance-table">
            {students.map((student) => (
              <tr key={student.reg_num} className="student-row">
                <th className="student-info">
                  <p>ID: {student.reg_num}</p>
                  <p>Name: {student.name}</p>
                </th>
                <td className="attendance-options">
                  <label className="attendance-label">
                    <input
                      type="radio"
                      name={`attendance-${student.reg_num}`}
                      checked={attendance[student.reg_num] === "Present"}
                      onChange={() =>
                        handleRadioChange(student.reg_num, "Present")
                      }
                    />
                    Present
                  </label>
                  <label className="attendance-label">
                    <input
                      type="radio"
                      name={`attendance-${student.reg_num}`}
                      checked={attendance[student.reg_num] === "Absent"}
                      onChange={() =>
                        handleRadioChange(student.reg_num, "Absent")
                      }
                    />
                    Absent
                  </label>
                </td>
              </tr>
            ))}
          </table>
          <button
            onClick={handleSubmit}
            className="submit-btn"
            type="submit"
          >
            Submit Attendance
          </button>
        </div>
      </div>
      
      )}
    </div>
  );
};


export default AttendanceMarking ;