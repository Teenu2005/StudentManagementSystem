import React, { useState } from "react";
import navItem from '../facuiltyitem'
import CourseForm from '../../../components/Course/AddClass'
import NavBar from '../../../components/NavBar'
import CourseDetails from '../../../components/Course/Viewcourse'

function AdminShowCourse() {
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
          return <CourseDetails/>;
        case "add":
          return <CourseForm /> ;
      }
  
    };

  return (
    <>
    <NavBar nav={navItem} />
    {empty?<main id="main" className="main-cont">
      <div className="contanier">

        <div className="option">
          <h2>View Course</h2>
          <hr />
          <span className="dummy">View Course and their Infromation <br />Select Option</span>
          <button id='button-1'  className="button"  onClick={() => handleOptionSelect("view")}>View Course</button >
          </div>
        <div className="option">
          <h2>Add Course</h2>
          <hr />
          <span className="dummy">Add Course and their Infromation</span>
          <button id='button-2' className="button"   onClick={() => handleOptionSelect("add")}>Add Course</button >
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

export default AdminShowCourse;