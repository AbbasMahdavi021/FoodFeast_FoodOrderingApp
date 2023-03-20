import React, { useState } from "react";
import "../styles/Navbar.css";

function Navbar() {
  const [active, setActive] = useState("navList");
  const [icon, setIcon] = useState("navButton");
  const navToggle = () => {
    if (active === "navList") {
      setActive("navList openList");
    } else setActive("navList");

    // Icon Toggler
    if (icon === "navButton") {
      setIcon("navButton toggle");
    } else setIcon("navButton");
  };
  return (
    <nav className="nav">
      <a href="/" className="brand">
        SFSU-FoodFeast
      </a>
  
      <img alt="logo" src={process.env.PUBLIC_URL + '/images/brand/Logo.png'} className="Logo"/>
  
      <ul className={active}>
        <li className="navItems">
          <a href="/" className="navLink">
            Home
          </a>
        </li>
  
        <li className="navItem">
          <a href="/login" className="navLink">
            Login
          </a>
        </li>
  
        <li className="navItem">
          <a href="/" className="navLink">
            Enroll Resturant
          </a>
        </li>
  
        <li className="navItem">
          <a href="/about" className="navLink">
            About Us
          </a>
        </li>
  
      </ul>
      <div onClick={navToggle} className={icon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
  
}

export default Navbar;