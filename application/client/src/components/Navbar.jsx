import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import UserContext from '../context';


import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import "../styles/Navbar.css";

function Navbar() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [active, setActive] = useState("navList");
  const [icon, setIcon] = useState("navButton");
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const getStatus = async () => {
      try {
        const res = await axios.get("/auth/getStatus", { withCredentials: true });
        setIsLoggedIn(res.data.isLoggedIn);
      } catch (err) {
        console.error(err);
      }
    }
    getStatus();
  }, [user]);


  const handleLogout = async () => {
    try {
      const res = await axios.post("/auth/logout", {}, { withCredentials: true });
      console.log("Logged Out Status: " + res.data);
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem('user');
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };


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

      <a href="/" className="Logo">
        <img alt="logo" src={process.env.PUBLIC_URL + '/images/brand/Logo.png'} className="Logo" />
      </a>

      <ul className={active}>

        <li className="navItem">
          <a href="/enroll" className="navLink">
            Enroll Resturant
          </a>
        </li>

        <li className="navItem">
          <a href="/restaurantDashboard" className="navLink">
            Restaurant Dashboard
          </a>
        </li>

        <li className="navItem">
          <a href="/driver" className="navLink">
            Drivers
          </a>
        </li>

        <li className="navItem">
          <a href="/about" className="navLink">
            About Us
          </a>
        </li>

        <li className="navItem">
          <a href="/map" className="navItem">
            <LocationOnIcon style={{ fontSize: 36, filter: 'drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.5))'}} />
          </a>
        </li>

        <li className="navItem">
          {isLoggedIn ? (
            <a href="/cart" className="navItem">
              <ShoppingCartIcon style={{ fontSize: 36, filter: 'drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.5))' }} />
            </a>
          ) : (
            <a href="/login" className="navItem">
              <ShoppingCartIcon style={{ fontSize: 36, filter: 'drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.5))' }} />
            </a>
          )}
        </li>

        <li className="navItem">
          {isLoggedIn ? (
            <a href="/login" className="log-button" onClick={handleLogout}>
              Logout
            </a>
          ) : (
            <a href="/login" className="log-button">
              Login
            </a>
          )}
        </li>

        {!isLoggedIn && (
          <li className="navItem">
            <a href="/register" className="log-button" onClick={handleLogout}>
              Register
            </a>
          </li>
        )}


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