import axios from 'axios';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import Team from './components/Team';
import TeamMemberModal from './components/TeamMemberModal';
import teamMembers from './testing/teamMembers';

function App() {

  let handleClick = async () => {
    let res = await axios.get(`/test`);
    console.log("Received Info: " + res.data.msg);
  }

  return (
    <BrowserRouter>
        <div id='about-header'>Meet Our Team</div>
        <div id='about-disclaimer'>For demonstration only.<br></br><br></br>Software Engineering Class SFSU &nbsp; &lt;Spring, 2023&gt; &nbsp; Section 03 &nbsp; Team 01</div>
        <Team teamMembers={teamMembers}/>
        <Routes>
          {teamMembers.map((member) => (
            <Route key={member.id} path={`/team/${member.name.replace(/\s/g, '-')}`} element={<TeamMemberModal teamMember={member}/>} />
          ))}
        </Routes>
    </BrowserRouter>
  );
}

export default App;
