import axios from 'axios';
import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
} from "react-router-dom";

import { Children } from 'react';

import Navbar from  './components/Navbar';
import Footer from  './components/Footer';

import Home from  './pages/Home';
import About from  './pages/About';
import Login from  './pages/Login';
import Register from './pages/Register';


// import { BrowserRouter, Routes } from 'react-router-dom';
// import './styles/App.css';
// import Team from './components/Team';
// import TeamMemberModal from './components/TeamMemberModal';
// import teamMembers from './testing/teamMembers';

const Layout = ()=> {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path:"/",
        element:<Home />
      },

      {
        path:"/about",
        element:<About />
      },

      {
        path: "/login",
        element: <div>Login</div>,
      },
    
      {
        path: "/register",
        element: <div>Register</div>,
      },

    ]
  
  },



]);

function App() {
  return (

    <div className='app'>
      <div className='container'> 
        <RouterProvider router={router} />
      </div>

      {/* <BrowserRouter>
        <div id='about-header'>Meet Our Team</div>
        <div id='about-disclaimer'>For demonstration only.<br></br><br></br>Software Engineering Class SFSU &nbsp; &lt;Spring, 2023&gt; &nbsp; Section 03 &nbsp; Team 01</div>
        <Team teamMembers={teamMembers} />
        <Routes>
          {teamMembers.map((member) => (
            <Route key={member.id} path={`/team/${member.name.replace(/\s/g, '-')}`} element={<TeamMemberModal teamMember={member} />} />
          ))}
        </Routes>
      </BrowserRouter> */}

    </div>

  );
}

export default App;
