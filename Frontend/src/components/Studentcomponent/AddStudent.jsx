import React, { useState } from 'react';
import axios from 'axios';


const StudentForm = () => {
  const [formData, setFormData] = useState({
    department: {
      dep_id: '',
      dep_name: ''
    },
    student_num: {
      aadhaar_number: '',
      umis_number: '',
      em_number: '',
      community_id: '',
      income_id: '',
      first_graduate_id: ''
    },
    parents: {
      father_name: '',
      mother_name: '',
      annualIncome: ''
    },
    Info: {
      religion: '',
      community: ''
    },
    contact: {
      email: '',
      phone1: '',
      phone2: ''
    },
    address: {
      street: '',
      city: '',
      zipcode: ''
    },
    _id: '',
    name: '',
    batch: '',
    dob: '',
    image: null
  });
  const departmentOptions = [
    "BSc Computer Science",
    "BSc Physics",
    "BSc Chemistry",
    "BSc Mathematics",
    "Commerce",
    "BA Economic",
    "BA Tamil",
    "BA English",
  ];
  const batchOption = [
    "2022-25",
    "2023-26",
    "2024-27",
  ];
  const [errors, setErrors] = useState({});
  const API_URL =import.meta.env.VITE_BASE_URL;

  const handleChange = (e, section, key) => {
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [key]: value
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Department validation
    if (!formData.department.dep_id) newErrors.dep_id = 'Department ID is required';
    if (!formData.department.dep_name) newErrors.dep_name = 'Department Name is required';

    // Student numbers validation
    if (!formData.student_num.aadhaar_number) newErrors.aadhaar_number = 'Aadhaar Number is required';
    // else if (!/^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$/.test(formData.contact.aadhaar_number)) newErrors.aadhaar_number = 'Invalid Aadhaar format';
    // “”
    
    // Parent details validation
    if (!formData.parents.father_name) newErrors.father_name = "Father's Name is required";
    if (!formData.parents.annualIncome) newErrors.annualIncome = 'Annual Income is required';

    // Contact validation
    if (!formData.contact.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact.email)) newErrors.email = 'Invalid email format';
    if (!formData.contact.phone1) newErrors.phone1 = 'Primary phone number is required';
    else if (!formData.contact.phone1.toString().match(/^\d{10}$/)) newErrors.phone = "Phone number must be 10 digits.";

    // Address validation
    if (!formData.address.street) newErrors.street = 'Street is required';
    if (!formData.address.city) newErrors.city = 'City is required';
    if (!formData.address.zipcode) newErrors.zipcode = 'Zip Code is required';
    else if (!formData.address.zipcode.toString().match(/^\d{5,6}$/)) newErrors.zipcode = "Zipcode must be 5 or 6 digits.";

    // General validation
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.batch) newErrors.batch = 'Batch is required';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert('Please correct the errors in the form');
      return;
    }

    // Create FormData object to send the data, including the image
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('_id', formData._id);
    formDataToSubmit.append('name', formData.name);
    formDataToSubmit.append('batch', formData.batch);
    formDataToSubmit.append('dob', formData.dob);
    formDataToSubmit.append('image', formData.image); // Attach image file

    // Append other form data in a similar manner
    formDataToSubmit.append('department[dep_id]', formData.department.dep_id);
    formDataToSubmit.append('department[dep_name]', formData.department.dep_name);
    formDataToSubmit.append('student_num[aadhaar_number]', formData.student_num.aadhaar_number);
    formDataToSubmit.append('student_num[umis_number]', formData.student_num.umis_number);
    formDataToSubmit.append('parents[father_name]', formData.parents.father_name);
    formDataToSubmit.append('parents[mother_name]', formData.parents.mother_name);
    formDataToSubmit.append('parents[annualIncome]', formData.parents.annualIncome);
    formDataToSubmit.append('contact[email]', formData.contact.email);
    formDataToSubmit.append('contact[phone1]', formData.contact.phone1);
    formDataToSubmit.append('contact[phone2]', formData.contact.phone2);
    formDataToSubmit.append('address[street]', formData.address.street);
    formDataToSubmit.append('address[city]', formData.address.city);
    formDataToSubmit.append('address[zipcode]', formData.address.zipcode);
    formDataToSubmit.append('Info[religion]', formData.Info.religion);
    formDataToSubmit.append('Info[community]', formData.Info.community);

    try {
      const response = await axios.post(`${API_URL}/addStudent`, formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data', // Make sure to set the correct header for multipart/form-data
        },
      });
      alert(response.data.message);
      console.log('Data submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting the form:', error);
      alert('Failed to submit the form. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Student Information Form</h2>


      <div className='sub-form'>
        <label>Register Number:</label>
        <input
          type="text"
          value={formData._id}
          onChange={(e) => setFormData({ ...formData, _id: e.target.value })}
          />
        {errors._id && <span className="error">{errors._id}</span>}

        <label>Name:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        {errors.name && <span className="error">{errors.name}</span>}

        {/* <label>Batch:</label>
        <input
          type="text"
          value={formData.batch}
          onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
          /> */}
          <label>Department Name:</label>
        <select
          name="department.dep_name"
          value={formData.batch}
          onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
          >
  <option value="">Select Department</option>
  {batchOption.map((dep) => (
    <option key={dep} value={dep}>
      {dep}
    </option>
  ))}
        </select>
        {errors.batch && <span className="error">{errors.batch}</span>}

        <label>Date of Birth:</label>
        <input
          type="date"
          value={formData.dob}
          onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
        />
        {errors.dob && <span className="error">{errors.dob}</span>}

        <label>Image:</label>
        <input
          type="file"
          onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
          />
      </div>

      <div className='sub-form'>
        <label>Department ID:</label>
        <input
          type="text"
          value={formData.department.dep_id}
          onChange={(e) => handleChange(e, 'department', 'dep_id')}
        />
        {errors.dep_id && <span className="error">{errors.dep_id}</span>}
        <label>Department Name:</label>
        <select
  name="department.dep_name"
  value={formData.department.dep_name}
  onChange={(e) => handleChange(e, 'department', 'dep_name')}
>
  <option value="">Select Department</option>
  {departmentOptions.map((dep) => (
    <option key={dep} value={dep}>
      {dep}
    </option>
  ))}
        </select>

      </div>

      <div className='sub-form'>
        <label>Aadhaar Number:</label>
        <input
          type="text"
          value={formData.student_num.aadhaar_number}
          onChange={(e) => handleChange(e, 'student_num', 'aadhaar_number')}
        />
        {errors.aadhaar_number && <span className="error">{errors.aadhaar_number}</span>}

        <label>UMIS Number:</label>
        <input
          type="text"
          value={formData.student_num.umis_number}
          onChange={(e) => handleChange(e, 'student_num', 'umis_number')}
        />

        <label>EMIS Number:</label>
        <input
          type="text"
          value={formData.student_num.em_number}
          onChange={(e) => handleChange(e, 'student_num', 'em_number')}
        />

        <label>Community ID:</label>
        <input
          type="text"
          value={formData.student_num.community_id}
          onChange={(e) => handleChange(e, 'student_num', 'community_id')}
        />

        <label>Income ID:</label>
        <input
          type="text"
          value={formData.student_num.income_id}
          onChange={(e) => handleChange(e, 'student_num', 'income_id')}
        />

        <label>First Graduate ID:</label>
        <input
          type="text"
          value={formData.student_num.first_graduate_id}
          onChange={(e) => handleChange(e, 'student_num', 'first_graduate_id')}
        />
      </div>

      <div className='sub-form'>
        <label>Father's Name:</label>
        <input
          type="text"
          value={formData.parents.father_name}
          onChange={(e) => handleChange(e, 'parents', 'father_name')}
        />
        {errors.father_name && <span className="error">{errors.father_name}</span>}

        <label>Mother's Name:</label>
        <input
          type="text"
          value={formData.parents.mother_name}
          onChange={(e) => handleChange(e, 'parents', 'mother_name')}
        />

        <label>Annual Income:</label>
        <input
          type="number"
          value={formData.parents.annualIncome}
          onChange={(e) => handleChange(e, 'parents', 'annualIncome')}
        />
        {errors.annualIncome && <span className="error">{errors.annualIncome}</span>}
      </div>

      <div className='sub-form'>
        <label>Religion:</label>
        <input
          type="text"
          value={formData.Info.religion}
          onChange={(e) => handleChange(e, 'Info', 'religion')}
        />

        <label>Community:</label>
        <input
          type="text"
          value={formData.Info.community}
          onChange={(e) => handleChange(e, 'Info', 'community')}
        />
      </div>

      <div className='sub-form'>
        <label>Email:</label>
        <input
          type="email"
          value={formData.contact.email}
          onChange={(e) => handleChange(e, 'contact', 'email')}
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <label>Phone Number:</label>
        <input
          type="text"
          value={formData.contact.phone1}
          onChange={(e) => handleChange(e, 'contact', 'phone1')}
        />
        {errors.phone1 && <span className="error">{errors.phone1}</span>}

        <label>Parent Number:</label>
        <input
          type="text"
          value={formData.contact.phone2}
          onChange={(e) => handleChange(e, 'contact', 'phone2')}
        />
      </div>

      <div className='sub-form'>
        <label>Street:</label>
        <input
          type="text"
          value={formData.address.street}
          onChange={(e) => handleChange(e, 'address', 'street')}
        />
        {errors.street && <span className="error">{errors.street}</span>}

        <label>City:</label>
        <input
          type="text"
          value={formData.address.city}
          onChange={(e) => handleChange(e, 'address', 'city')}
        />
        {errors.city && <span className="error">{errors.city}</span>}

        <label>Zip Code:</label>
        <input
          type="text"
          value={formData.address.zipcode}
          onChange={(e) => handleChange(e, 'address', 'zipcode')}
        />
        {errors.zipcode && <span className="error">{errors.zipcode}</span>}
      </div>



      <button type="submit">Submit</button>
    </form>
  );
};

export default StudentForm;

// import React, { useState } from 'react';
// import axios from 'axios';

// const StudentForm = () => {
//   const [formData, setFormData] = useState({
//     department: {
//       dep_id: '',
//       dep_name: ''
//     },
//     student_num: {
//       aadhaar_number: '',
//       umis_number: '',
//       em_number: '',
//       community_id: '',
//       income_id: '',
//       first_graduate_id: ''
//     },
//     parents: {
//       father_name: '',
//       mother_name: '',
//       annualIncome: ''
//     },
//     Info: {
//       religion: '',
//       community: ''
//     },
//     contact: {
//       email: '',
//       phone1: '',
//       phone2: ''
//     },
//     address: {
//       street: '',
//       city: '',
//       zipcode: ''
//     },
//     _id: '',
//     name: '',
//     batch: '',
//     dob: '',
//     image: null
//   });

//   const departmentOptions = [
//     "BSc Computer Science",
//     "BSc Physics",
//     "BSc Chemistry",
//     "BSc Mathematics",
//     "Commerce",
//     "BA Economic",
//     "BA Tamil",
//     "BA English",
//   ];
  
//   const batchOption = [
//     "2022-25",
//     "2023-26",
//     "2024-27",
//   ];
  
//   const [errors, setErrors] = useState({});
//   const [currentSection, setCurrentSection] = useState(0);

//   const sections = [
//     'personalDetails',
//     'departmentDetails',
//     'studentNumbers',
//     'parentsDetails',
//     'infoDetails',
//     'contactDetails',
//     'addressDetails',
//     'imageDetails'
//   ];

//   const handleChange = (e, section, key) => {
//     const value = e.target.value;
//     setFormData((prevData) => ({
//       ...prevData,
//       [section]: {
//         ...prevData[section],
//         [key]: value
//       }
//     }));
//   };

//   const validateSection = () => {
//     const newErrors = {};
//     const currentForm = sections[currentSection];

//     switch (currentForm) {
//       case 'personalDetails':
//         if (!formData._id) newErrors._id = 'Register Number is required';
//         if (!formData.name) newErrors.name = 'Name is required';
//         if (!formData.batch) newErrors.batch = 'Batch is required';
//         if (!formData.dob) newErrors.dob = 'Date of Birth is required';
//         break;

//       case 'departmentDetails':
//         if (!formData.department.dep_id) newErrors.dep_id = 'Department ID is required';
//         if (!formData.department.dep_name) newErrors.dep_name = 'Department Name is required';
//         break;

//       case 'studentNumbers':
//         if (!formData.student_num.aadhaar_number) newErrors.aadhaar_number = 'Aadhaar Number is required';
//         break;

//       case 'parentsDetails':
//         if (!formData.parents.father_name) newErrors.father_name = "Father's Name is required";
//         if (!formData.parents.annualIncome) newErrors.annualIncome = 'Annual Income is required';
//         break;

//       case 'infoDetails':
//         if (!formData.Info.religion) newErrors.religion = 'Religion is required';
//         if (!formData.Info.community) newErrors.community = 'Community is required';
//         break;

//       case 'contactDetails':
//         if (!formData.contact.email) newErrors.email = 'Email is required';
//         else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact.email)) newErrors.email = 'Invalid email format';
//         if (!formData.contact.phone1) newErrors.phone1 = 'Primary phone number is required';
//         else if (!formData.contact.phone1.toString().match(/^\d{10}$/)) newErrors.phone = "Phone number must be 10 digits.";
//         break;

//       case 'addressDetails':
//         if (!formData.address.street) newErrors.street = 'Street is required';
//         if (!formData.address.city) newErrors.city = 'City is required';
//         if (!formData.address.zipcode) newErrors.zipcode = 'Zip Code is required';
//         else if (!formData.address.zipcode.toString().match(/^\d{5,6}$/)) newErrors.zipcode = "Zipcode must be 5 or 6 digits.";
//         break;

//       case 'imageDetails':
//         if (!formData.image) newErrors.image = 'Image is required';
//         break;

//       default:
//         break;
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateSection()) {
//       alert('Please correct the errors in the form');
//       return;
//     }
//     try {
//       const formDataToSubmit = {
//         ...formData,
//         image: formData.image ? URL.createObjectURL(formData.image) : null
//       };
//       const response = await axios.post('http://127.0.0.1:5000/admin/addStudent', formDataToSubmit);
//       console.log('Data submitted successfully:', response.data);
//       alert('Form submitted successfully!');
//     } catch (error) {
//       console.error('Error submitting the form:', error);
//       alert('Failed to submit the form. Please try again.');
//     }
//   };

//   const nextSection = () => {
//     if (validateSection() && currentSection < sections.length - 1) {
//       setCurrentSection(currentSection + 1);
//     }
//   };

//   const previousSection = () => {
//     if (currentSection > 0) {
//       setCurrentSection(currentSection - 1);
//     }
//   };

//   const renderSection = () => {
//     switch (sections[currentSection]) {
//       case 'personalDetails':
//         return (
//           <div className='sub-form'>
//             <label>Register Number:</label>
//             <input
//               type="text"
//               value={formData._id}
//               onChange={(e) => setFormData({ ...formData, _id: e.target.value })}
//             />
//             {errors._id && <span className="error">{errors._id}</span>}

//             <label>Name:</label>
//             <input
//               type="text"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             />
//             {errors.name && <span className="error">{errors.name}</span>}

//             <label>Batch:</label>
//             <select
//               value={formData.batch}
//               onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
//             >
//               <option value="">Select Batch</option>
//               {batchOption.map((batch) => (
//                 <option key={batch} value={batch}>
//                   {batch}
//                 </option>
//               ))}
//             </select>
//             {errors.batch && <span className="error">{errors.batch}</span>}

//             <label>Date of Birth:</label>
//             <input
//               type="date"
//               value={formData.dob}
//               onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
//             />
//             {errors.dob && <span className="error">{errors.dob}</span>}
//           </div>
//         );
//       case 'departmentDetails':
//         return (
//           <div className='sub-form'>
//             <label>Department ID:</label>
//             <input
//               type="text"
//               value={formData.department.dep_id}
//               onChange={(e) => handleChange(e, 'department', 'dep_id')}
//             />
//             {errors.dep_id && <span className="error">{errors.dep_id}</span>}

//             <label>Department Name:</label>
//             <select
//               value={formData.department.dep_name}
//               onChange={(e) => handleChange(e, 'department', 'dep_name')}
//             >
//               <option value="">Select Department</option>
//               {departmentOptions.map((dep) => (
//                 <option key={dep} value={dep}>
//                   {dep}
//                 </option>
//               ))}
//             </select>
//             {errors.dep_name && <span className="error">{errors.dep_name}</span>}
//           </div>
//         );
//       case 'studentNumbers':
//         return (
//           <div className='sub-form'>
//         <label>Aadhaar Number:</label>
//         <input
//           type="text"
//           value={formData.student_num.aadhaar_number}
//           onChange={(e) => handleChange(e, 'student_num', 'aadhaar_number')}
//         />
//         {errors.aadhaar_number && <span className="error">{errors.aadhaar_number}</span>}

//         <label>UMIS Number:</label>
//         <input
//           type="text"
//           value={formData.student_num.umis_number}
//           onChange={(e) => handleChange(e, 'student_num', 'umis_number')}
//         />

//         <label>EMIS Number:</label>
//         <input
//           type="text"
//           value={formData.student_num.em_number}
//           onChange={(e) => handleChange(e, 'student_num', 'em_number')}
//         />

//         <label>Community ID:</label>
//         <input
//           type="text"
//           value={formData.student_num.community_id}
//           onChange={(e) => handleChange(e, 'student_num', 'community_id')}
//         />

//         <label>Income ID:</label>
//         <input
//           type="text"
//           value={formData.student_num.income_id}
//           onChange={(e) => handleChange(e, 'student_num', 'income_id')}
//         />

//         <label>First Graduate ID:</label>
//         <input
//           type="text"
//           value={formData.student_num.first_graduate_id}
//           onChange={(e) => handleChange(e, 'student_num', 'first_graduate_id')}
//         />
//       </div>
//         );
//       case 'parentsDetails':
//         return (
//           <div className='sub-form'>
//           <label>Father's Name:</label>
//           <input
//             type="text"
//             value={formData.parents.father_name}
//             onChange={(e) => handleChange(e, 'parents', 'father_name')}
//           />
//           {errors.father_name && <span className="error">{errors.father_name}</span>}
  
//           <label>Mother's Name:</label>
//           <input
//             type="text"
//             value={formData.parents.mother_name}
//             onChange={(e) => handleChange(e, 'parents', 'mother_name')}
//           />
  
//           <label>Annual Income:</label>
//           <input
//             type="number"
//             value={formData.parents.annualIncome}
//             onChange={(e) => handleChange(e, 'parents', 'annualIncome')}
//           />
//           {errors.annualIncome && <span className="error">{errors.annualIncome}</span>}
//         </div>
//         );
//       case 'infoDetails':
//         return (
//           <div className='sub-form'>
//           <label>Religion:</label>
//           <input
//             type="text"
//             value={formData.Info.religion}
//             onChange={(e) => handleChange(e, 'Info', 'religion')}
//           />
  
//           <label>Community:</label>
//           <input
//             type="text"
//             value={formData.Info.community}
//             onChange={(e) => handleChange(e, 'Info', 'community')}
//           />
//         </div>
//         );
//       case 'contactDetails':
//         return (
//           <div className='sub-form'>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={formData.contact.email}
//             onChange={(e) => handleChange(e, 'contact', 'email')}
//           />
//           {errors.email && <span className="error">{errors.email}</span>}
  
//           <label>Phone Number:</label>
//           <input
//             type="text"
//             value={formData.contact.phone1}
//             onChange={(e) => handleChange(e, 'contact', 'phone1')}
//           />
//           {errors.phone1 && <span className="error">{errors.phone1}</span>}
  
//           <label>Parent Number:</label>
//           <input
//             type="text"
//             value={formData.contact.phone2}
//             onChange={(e) => handleChange(e, 'contact', 'phone2')}
//           />
//         </div>
//         );
//       case 'addressDetails':
//         return (
//           <div className='sub-form'>
//           <label>Street:</label>
//           <input
//             type="text"
//             value={formData.address.street}
//             onChange={(e) => handleChange(e, 'address', 'street')}
//           />
//           {errors.street && <span className="error">{errors.street}</span>}
  
//           <label>City:</label>
//           <input
//             type="text"
//             value={formData.address.city}
//             onChange={(e) => handleChange(e, 'address', 'city')}
//           />
//           {errors.city && <span className="error">{errors.city}</span>}
  
//           <label>Zip Code:</label>
//           <input
//             type="text"
//             value={formData.address.zipcode}
//             onChange={(e) => handleChange(e, 'address', 'zipcode')}
//           />
//           {errors.zipcode && <span className="error">{errors.zipcode}</span>}
//         </div>
//         );
//       case 'imageDetails':
//         return (
//           <div className='sub-form'>
//               <label>Image:</label>
//               <input
//                 type="file"
//                 onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
//                 />
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Student Information Form</h2>
//       {renderSection()}

//       <div className='navigation'>
//         {currentSection > 0 && (
//           <button type="button" onClick={previousSection}>Previous</button>
//         )}
//         {currentSection < sections.length - 1 ? (
//           <button type="button" onClick={nextSection}>Next</button>
//         ) : (
//           <button type="submit">Submit</button>
//         )}
//       </div>
//     </form>
//   );
// };

// export default StudentForm;
