import axios from 'axios';
import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  BrowserRouter, 
  Routes
} from "react-router-dom";

import { Children } from 'react';

import Navbar from  './components/Navbar';
import Footer from  './components/Footer';

import Home from  './pages/Home';
import About from  './pages/About';
import Login from  './pages/Login';

import Register from './pages/Register';

import './styles/App.css';
import teamMembers from './testing/teamMembers';

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
        element:<About teamMembers={teamMembers}/>
      },

      {
        path: "/login",
        element: <Login/>,
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
    </div>

  );
}

export default App;