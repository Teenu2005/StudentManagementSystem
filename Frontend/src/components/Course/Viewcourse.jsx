import { useEffect, useState } from "react";

const CourseDetails = () => {
  const [courseId, setCourseId] = useState("");
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_URL =import.meta.env.VITE_BASE_URL;

  const fetchCourseDetails = async () => {
    if (!courseId) return;
    setLoading(true);
    setError(null);
    setCourse(null);
    try {
      const response = await fetch(`${API_URL}/class/${courseId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch course details");
      }
      const data = await response.json();
      setCourse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <>
    {!course && <div className="card-view-student">
      <h2 className="heading-smallbox">Enter Course ID</h2>
      <input 
        type="text" 
        value={courseId} 
        onChange={(e) => setCourseId(e.target.value.toUpperCase())} 
        className="border p-2 rounded-md w-full"
        placeholder="Enter Course ID"
      />
      <button 
        onClick={fetchCourseDetails} 
        className="button-smallbox"
      >
        Fetch Details
      </button>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
    </div>
    }
      {course && (
        <div className="card-course">
          <h2 className="heading-smallbox">Course Details</h2>
          <table>
          <tr><th>ID:</th><td> {course._id}</td></tr>
          <tr><th>Name:</th><td> {course.course_name}</td></tr>
          <tr><th>Hours:</th><td> {course.hour}</td></tr>
          <tr><th>Batch:</th><td> {course.Student_list.batch}</td></tr>
          <tr><th>Department:</th> <td>{course.Student_list.dep_id}</td></tr>
          </table>
          <h2 className="mt-2 font-semibold">Teacher Details</h2>
          <table>
          <tr><th>ID:</th><td> {course.Teacher_detail.teacher_id}</td></tr>
          <tr><th>Name:</th><td> {course.Teacher_detail.teacher_name}</td></tr>
          </table>
        </div>
      )}
      </>
  );
};

export default CourseDetails;
