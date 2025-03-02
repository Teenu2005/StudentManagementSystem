import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import FaculityHome from './FaculityHome';
import AdminStudent from './TeancherShows/TeacherStudentShow';
import AdminShowCourse from './TeancherShows/CourseShow';
import AdminAttendence from './TeancherShows/AttendenceShow';
import PerformanceShow from './TeancherShows/PerformanceShow';
import Profile from './Profile'

function StaffDashboard() {
  return (
    <>
      <Routes>
                        <Route path="/" element={<FaculityHome />} />
                         <Route path='*' element={<Navigate to="/" />} />
                         <Route path="/profile" element={<Profile />} />
                         <Route path="/student" element={<AdminStudent />} />
                         <Route path="/perform" element={<PerformanceShow />} />
                         
                         <Route path="/class" element={<AdminShowCourse />} />
                         <Route path="/attendence" element={<AdminAttendence />} />
                    </Routes>
 

    </>
  )
}

export default StaffDashboard;