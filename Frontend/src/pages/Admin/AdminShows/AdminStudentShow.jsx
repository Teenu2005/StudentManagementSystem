import React, { useState } from "react";
import navItem from '../AdminNavItem'
import StudentForm from '../../../components/Studentcomponent/AddStudent'
import EditStudentForm from '../../../components/Studentcomponent/EditStudent'
import DeleteStudent from '../../../components/Studentcomponent/DeleteStudent'
import StudentDisplay from '../../../components/Studentcomponent/ViewStudent'
import NavBar from '../../../components/NavBar'
import BulkUpload from '../../../components/Studentcomponent/bulckadd'


function AdminStudentShow() {
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
          return <StudentDisplay />;
        case "edit":
          return <EditStudentForm />;
        case "add":
          return <StudentForm />;
        case "delete":
          return <DeleteStudent />;
        case "bulck":
          return <BulkUpload />;
      }
  
    };

  return (
    <>
    <NavBar nav={navItem} />
    {empty?<main >
      <div className="contanier">
        <div className="option">
          <h2>Student</h2>
          <hr />
          <span className="dummy">View Student and their Infromation </span>
          <button id='button-1'  className="button"  onClick={() => handleOptionSelect("view")}>View Student</button >
          </div>
        <div className="option">
          <h2>Add Student</h2>
          <hr />
          <span className="dummy">Add Student and their Infromation</span>
          <button id='button-2' className="button"   onClick={() => handleOptionSelect("add")}>Add Student</button >
          <button id='button-2' className="button"   onClick={() => handleOptionSelect("bulck")}>Add Multiple Student</button >
        </div>
        <div className="option">
          <h2>Edit Student</h2>
          <hr />
          <span className="dummy">Edit Student and their Infromation</span>
          <button id='button-2' className="button"   onClick={() => handleOptionSelect("edit")}>Edit Student</button >
        </div>
        <div className="option">
          <h2>Delete Student</h2>
          <hr />
          <span className="dummy">Delete Student and their Infromation </span>
          <button id='button-3'  className="button"  onClick={() => handleOptionSelect("delete")}>Delete Student</button >
      
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

export default AdminStudentShow