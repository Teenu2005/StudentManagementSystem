import React, { useState, useEffect } from "react";
import axios from "axios";
import img from '../../assets/images/profile.jpg'
import navItem from './facuiltyitem'
import NavBar from '../../components/NavBar'

import { checkAuth } from "../../utils/api";

const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const API_MAIN_URL =import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
                const res = await checkAuth();
                const response = await axios.get(`${API_MAIN_URL}/profile/${res.data.user.id}`, {withCredentials: true});
                setUser(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

if (loading) return <p>Loading...</p>;
if (!user) return <p>No user found. Please log in.</p>;

return (
  <>
    <NavBar nav={navItem} />
    <main>
      <div className="profile-container">
        {user.image == null ? (
          <img src={img} className="profile-pic" alt="student image" />
        ) : (
          <img src={student.image} alt="Student Image" className="profile-pic" />
        )}
        <div className="profile-card">
          <table className="profile-table">
            <tbody>
              <tr>
                <th>Name:</th>
                <td>{user.name}</td>
              </tr>
              <tr>
                <th>Email:</th>
                <td>{user.contact?.email}</td>
              </tr>
              <tr>
                <th>Phone:</th>
                <td>{user.contact?.phone}</td>
              </tr>
              <tr>
                <th>Department:</th>
                <td>{user.department?.dep_name}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </>
);

};

export default UserProfile;
