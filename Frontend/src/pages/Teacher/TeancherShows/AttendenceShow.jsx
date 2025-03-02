import React, { useState } from "react";
import navItem from '../facuiltyitem'
import AttendanceMarking from '../../../components/Attendence/Attendence'
import NavBar from '../../../components/NavBar'
import Attendance from '../../../components/Attendence/AllAttendence'

function AttendenceShow() {
  const[empty,setempty]=useState(true);
    const [selectedOption, setSelectedOption] = useState("");
    const handleOptionSelect = (option) => {
      setSelectedOption(option);
      setempty(false);
    };
    
    const renderForm = () => {
      console.log(empty)
      switch (selectedOption) {
        case "view":
          return <Attendance /> ;
        case "add":
          return <AttendanceMarking /> ;
      }
  
    };

  return (
    <>
    <NavBar nav={navItem} />
    {empty?<main id="main" className="main-cont">
      <div className="contanier">
        <div className="option">
          <h2>View Marked Attendence</h2>
          <hr />
          <span className="dummy">View Course and their Infromation <br />Select Option</span>
          <button id='button-1'  className="button"  onClick={() => handleOptionSelect("view")}>View Course</button >
          </div>
        <div className="option">
          <h2> Mark Attendence</h2>
          <hr />
          <span className="dummy">Mark Attendence and their Infromation</span>
          <button id='button-2' className="button"   onClick={() => handleOptionSelect("add")}>Mark Attendence</button >
        </div>
    </div>
    </main>
    :
    <main>
   <button className="button" id="back-but" onClick={()=>{setempty(true)}}>Back</button>
   <div className="contanier">
    {renderForm()}
    </div>
    </main>
    }
    </>
  )
}

export default AttendenceShow;