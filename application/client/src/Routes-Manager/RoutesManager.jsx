import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import Home from '../pages/Home';
import Favorites from '../pages/Favorites';
import About from '../pages/About';
import Login from '../pages/Login';
import Register from '../pages/Register';

import TeamMemberModal from "../components/TeamMemberModel";
import teamMembers from '../components/teamMembers';
import Restaurant from '../pages/Restaurant';

function RoutesManager() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        <Route path="/" element={
          <div className="flex-container">
            <div className="flex-item">
              <Home />
            </div>
            <Favorites />
          </div>
        } />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About teamMembers={teamMembers} />} />

        <Route path="/restaurant/getMenu/:id" element= {<Restaurant/>} />

        {teamMembers.map((member) => (
          <Route key={member.id}
            path={`/team/${member.name.replace(/\s/g, '-')}`}
            element={<TeamMemberModal teamMember={member} />} />
        ))}

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default RoutesManager;