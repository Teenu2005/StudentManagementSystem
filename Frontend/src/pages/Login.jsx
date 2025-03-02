import { useState, useContext } from "react";
import { studentLogin, teacherLogin } from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import "boxicons";
const Login = () => {
  const { setUser } = useContext(AuthContext);
  const [isStudent, setIsStudent] = useState(true);
  const [credentials, setCredentials] = useState({ id: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isStudent) {
        response = await studentLogin(credentials.id, credentials.password);
      } else {
        response = await teacherLogin(credentials.id, credentials.password);
      }

      setUser({ role: response.data.role, id: response.data.id });
      window.location.href = "/";
    } catch (error) {
      alert("Invalid credentials");
      console.log(error);
    }
  };

  return (
    <main>
      <p className="empty"></p>
      <form onSubmit={handleSubmit}>
      <h2>{isStudent ? "Student" : "Teacher"} Login</h2>
        <input
          type="text"
          placeholder="ID"
          value={credentials.id}
          onChange={(e) => setCredentials({ ...credentials, id: e.target.value })}
          required
        />
        <div style={{ position: "relative"}}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder={isStudent ? "DD-MM-YYYY" : "Password"}
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            required
            style={{ paddingRight: "30px" }}
          />
          
          <i
            type="button"
            className="eye-button"
            onClick={() => setShowPassword(!showPassword)}
          >
            
            {showPassword ? <box-icon className="lock" name="lock-open" type='solid'></box-icon> : <box-icon className="lock" name="lock" type='solid'></box-icon>}
            {/* {showPassword ? <p className="lock">hr</p> : <p className="lock">bi</p>} */}
          </i>
        </div>
        <button type="submit">Login</button> <br />
        <a className="links" onClick={() => setIsStudent(!isStudent)}>
          Switch to <span className="link-head"> {isStudent ? "Teacher" : "Student"}</span > Login
        </a>
      </form>
    </main>
  );
};

export default Login;
