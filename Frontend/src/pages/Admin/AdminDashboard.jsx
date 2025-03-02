import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminHome from './AdminHome';
import AdminStudent from './AdminShows/AdminStudentShow';
import AdminShowCourse from './AdminShows/CourseShow';
import AdminTeacherShow from './AdminShows/TeacherShow';
import AdminAttendence from './AdminShows/AttendenceShow';
import PerformanceShow from './AdminShows/PerformanceShow';
import MailShow from './AdminShows/MailShow';
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
                         <Route path="/teacher" element={<AdminTeacherShow />} />
                         <Route path="/attendence" element={<AdminAttendence />} />
                         <Route path="/mail" element={<MailShow />} />
                    </Routes>
 

    </>
  )
}

export default AdminDashboard