/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: Footer.jsx
 * Created on: 03/23
 * Author(s): Abbas M.
 * Contact: 
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: Basic footer that contains the For Demostration only" tag.
 *      Plus a secret link if you know where to look ;)
 */
import React from 'react';
import "../styles/Footer.css";

const Footer = () => (
    <footer className="footer">
        <p className="footer-text">SFSU Software Engineering Project CSC 648-848, Team01, Spring 2023.
            For Demonstration Only</p>
        <p className="footer-text"> CopyRight@ SFSU-<a href="/adminlogin">FoodFeast</a>-2023</p>

    </footer>

);

export default Footer;