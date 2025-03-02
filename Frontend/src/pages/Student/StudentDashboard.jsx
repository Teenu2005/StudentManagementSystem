import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Profile from './Profile'
import StudentHome from './StudentHome'
import MarkDataDisplay from './StudentShow/Performance'
function StudentDashboard() {
  return (
    <>
      <Routes>
                        <Route path="/" element={<StudentHome />} />
                         <Route path='*' element={<Navigate to="/" />} />
                         <Route path="/profile" element={<Profile />} />
                         <Route path="/perform" element={<MarkDataDisplay />} />
                         {/* <Route path="/class" element={<AdminShowCourse />} /> */}
                         {/* <Route path="/attendence" element={<AdminAttendence />} /> */}
                    </Routes>
 

    </>
  )
}

export default StudentDashboard
