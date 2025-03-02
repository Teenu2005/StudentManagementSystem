import React, { useState } from "react";
import navItem from '../../../../../../StudentManagementSystem/frontend/src/components/Admin/AdminNavItem'
import AddTeacher from '../../../components/Teacher/AddTeacher'
import EditTeacher from '../../../components/Teacher/EditTeacher'
import DeleteTeacher from '../../../components/Teacher/DeleteTeacher'

import NavBar from '../../../components/NavBar'


function AdminTeacherShow() {
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
          return ;
        case "edit":
          return <EditTeacher /> ;
        case "add":
          return <AddTeacher />;
        case "delete":
          return <DeleteTeacher /> ;
      }
  
    };

  return (
    <>
    <NavBar nav={navItem} />
    {empty?<main id="main" className="main-cont">
      <div className="contanier">

        {/* <div className="option">
          <h2>Teacher</h2>
          <hr />
          <span className="dummy">View Teacher and their Infromation <br />Select Option</span>
          <button id='button-1'  className="button"  onClick={() => handleOptionSelect("view")}>View Teacher</button >
          </div> */}
        <div className="option">
          <h2>Add Teacher</h2>
          <hr />
          <span className="dummy">Add Teacher and their Infromation</span>
          <button id='button-2' className="button"   onClick={() => handleOptionSelect("add")}>Add Teacher</button >
        </div>
        <div className="option">
          <h2>Edit Teacher</h2>
          <hr />
          <span className="dummy">Edit Teacher and their Infromation</span>
          <button id='button-2' className="button"   onClick={() => handleOptionSelect("edit")}>Edit Teacher</button >
        </div>
        <div className="option">
          <h2>Delete Teacher</h2>
          <hr />
          <span className="dummy">Delete Teacher and their Infromation </span>
          <button id='button-3'  className="button"  onClick={() => handleOptionSelect("delete")}>Delete Teacher</button >
      
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

export default AdminTeacherShow