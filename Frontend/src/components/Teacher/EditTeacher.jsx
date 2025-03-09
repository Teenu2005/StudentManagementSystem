import React, { useState } from "react";
import axios from "axios";

const EditTeacher = () => {
  const [FaculityId, setFaculityId] = useState("");
  const [FaculityData, setFaculityData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const API_URL =import.meta.env.VITE_BASE_URL;

  // Handle fetching Faculity data
  const fetchFaculityData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${API_URL}/teacher/${FaculityId}`);
      setFaculityData(response.data);
    } catch (err) {
      setError("Faculity not found or an error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Handle updating Faculity data
  const handleUpdate = async () => {
    try {
      await axios.patch(`${API_URL}/teacher/${FaculityId}`, FaculityData);
      alert("Faculity updated successfully!");
    } catch (err) {
      alert("Error updating Faculity data.");
    }
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFaculityData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div  className='card-view-student'>
      <h2 className='heading-smallbox'>Edit Faculity Data</h2>
      <div>
        <label>
          Enter Faculity ID:
          <input
            type="text"
            value={FaculityId}
            onChange={(e) => setFaculityId(e.target.value)}
          />
        </label>
        <button onClick={fetchFaculityData}>Fetch Faculity</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {FaculityData && (
        <form>
          <div>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={FaculityData.name}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Date of Birth:
              <input
                type="text"
                name="dob"
                value={FaculityData.dob}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={FaculityData.contact.email}
                onChange={(e) =>
                  setFaculityData((prev) => ({
                    ...prev,
                    contact: { ...prev.contact, email: e.target.value },
                  }))
                }
              />
            </label>
          </div>
          <div>
            <label>
              Phone:
              <input
                type="text"
                name="phone"
                value={FaculityData.contact.phone}
                onChange={(e) =>
                  setFaculityData((prev) => ({
                    ...prev,
                    contact: { ...prev.contact, phone: e.target.value },
                  }))
                }
              />
            </label>
          </div>
          <div>
            <label>
              Department Name:
              <input
                type="text"
                name="dep_name"
                value={FaculityData.department.dep_name}
                onChange={(e) =>
                  setFaculityData((prev) => ({
                    ...prev,
                    department: {
                      ...prev.department,
                      dep_name: e.target.value,
                    },
                  }))
                }
              />
            </label>
            <label>
              Department Id:
              <input
                type="text"
                name="dep_name"
                value={FaculityData.department.dep_id}
                onChange={(e) =>
                  setFaculityData((prev) => ({
                    ...prev,
                    department: {
                      ...prev.department,
                      dep_name: e.target.value,
                    },
                  }))
                }
              />
            </label>
            <label>
              Department Role:
              <input
                type="text"
                name="dep_name"
                value={FaculityData.department.dep_role}
                onChange={(e) =>
                  setFaculityData((prev) => ({
                    ...prev,
                    department: {
                      ...prev.department,
                      dep_name: e.target.value,
                    },
                  }))
                }
              />
            </label>
          </div>
          {/* Add more fields as needed */}
          <h3>Address</h3>
        <label>Street:</label>
        <input
          type="text"
          value={FaculityData.address.street}
          onChange={(e) => setFaculityData(e, 'address', 'street')}
        />
        

        <label>City:</label>
        <input
          type="text"
          value={FaculityData.address.city}
          onChange={(e) => setFaculityData(e, 'address', 'city')}
        />
       
        <label>Zip Code:</label>
        <input
          type="text"
          value={FaculityData.address.zipcode}
          onChange={(e) => setFaculityData(e, 'address', 'zipcode')}
        />
          <button type="submit" onClick={handleUpdate}>
            Confirm
          </button>
        </form>
      )}
    </div>
  );
};

export default EditTeacher;
