import {useState} from 'react'
import BulkUpload from '../../../components/Performance/Multiple'
import SaveStudentMarks from '../../../components/Performance/SingleData'
import StudentDataComponent from '../../../components/Performance/Markviews'
import navItem from '../AdminNavItem'
import NavBar from '../../../components/NavBar'
function PerformanceShow() {
    const[empty,setempty]=useState(true);
    const [selectedOption, setSelectedOption] = useState("");
    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setempty(false);
      };
      const renderForm = () => {
    switch (selectedOption) {
        case "single":
          return <SaveStudentMarks/>;
        case "multiple":
          return <BulkUpload /> ;
        case "show":
          return <StudentDataComponent />;
      }}
  return (
    <>
    <NavBar nav={navItem} />
    {empty?<main id="main" className="main-cont">
      <div className="contanier">

        <div className="option">
          <h2>Single Data</h2>
          <hr />
          <span className="dummy">View Course and their Infromation <br />Select Option</span>
          <button id='button-1'  className="button"  onClick={() => handleOptionSelect("single")}>Single Data</button >
          </div>
        <div className="option">
          <h2>Multiple Data</h2>
          <hr />
          <span className="dummy">Add Mark Infromation By CSV file</span>
          <button id='button-2' className="button"   onClick={() => handleOptionSelect("multiple")}>Multiple Data</button >
        </div>
        <div className="option">
          <h2>View Data</h2>
          <hr />
          <span className="dummy">Add Mark</span>
          <button id='button-2' className="button"   onClick={() => handleOptionSelect("show")}>View Data</button >
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

export default PerformanceShow