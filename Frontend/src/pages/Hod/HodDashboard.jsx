import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminHome from './HodHome';
import AdminStudent from './HodShows/HodStudentShow';
import AdminShowCourse from './HodShows/CourseShow';
import AdminAttendence from './HodShows/AttendenceShow';
import PerformanceShow from './HodShows/PerformanceShow';
import Profile from './Profile'

function AdminDashboard() {
  return (
    <>
      <Routes>
                        <Route path="/" element={<AdminHome />} />
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

export default AdminDashboard