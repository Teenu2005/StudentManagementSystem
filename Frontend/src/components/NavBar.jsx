import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { logout } from "../utils/api";
import imglogo from '../assets/images/owl&logo-01.png'
import "boxicons";
function NavBar({ nav }) {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [menuicon, setmenuicon] = useState("menu");
  const [state, setstate] = useState("block");
  
  function open() {
    const sidebar = document.querySelector("aside");
    setmenuicon(menuicon === "menu" ? "chevron-right" : "menu");
    sidebar.style.display = state;
    setstate(state === "block" ? "none" : "block");
  }

  const [size, setsize] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setsize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout =async() => {
    await logout();
    setUser(null);
    navigate("/login");
    console.log("hello")
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <img src={imglogo} width={'34px'} height={'34px'} className="logopng" alt="img" />
          <a href="" className="dashboardIcon">{}</a>
        </div>

        {size <= 950 && (
          <a className="menubut">
            <box-icon name={menuicon} onClick={open} id="icon"></box-icon>
          </a>
        )}

        {size > 950 && (
          <div className="nav-list">
            {nav.map((navItem) => (
              <li className="items" key={navItem.id}>
                <box-icon name={navItem.icon}></box-icon>
                <Link to={navItem.path} className="link">
                  {navItem.name}
                </Link>
              </li>
            ))}
            
            {user ? (
              <li className="items" onClick={handleLogout}>
                <box-icon name="log-out"></box-icon>
                <span className="link" style={{ cursor: "pointer" }}>Logout</span>
              </li>
            ) : (
              <li className="items">
                <box-icon name="log-in"></box-icon>
                <Link to="/login" className="link">Login</Link>
              </li>
            )}
          </div>
        )}
      </nav>

      {size <= 950 && (
        <aside>
          <div className="sidebar-list">
            {nav.map((navItem) => (
              <li  key={navItem.id}>
                <box-icon name={navItem.icon}></box-icon>
                <Link className="link" to={navItem.path}>
                  {navItem.name}
                </Link>
              </li>
            ))}

            {user ? (
              <li  onClick={handleLogout}>
                <box-icon name="log-out"></box-icon>
                <span className="link" style={{ cursor: "pointer" }}>Logout</span>
              </li>
            ) : (
              <li >
                <box-icon name="log-in"></box-icon>
                <Link className="link" to="/login">Login</Link>
              </li>
            )}
          </div>
        </aside>
      )}
    </>
  );
}

export default NavBar;
