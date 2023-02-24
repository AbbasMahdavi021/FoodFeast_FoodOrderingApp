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

  //this should be cleaning up urls but the space is staying in for some reason, need to double check this later
  let rename = (name) =>{{
    name.replace(/\s/g, '-');
    return name;
  }}

  return (
    <BrowserRouter>
        <div id='about-header'>Meet Our Team</div>
        <Team teamMembers={teamMembers}/>
        <Routes>
          {teamMembers.map((member) => (
            <Route key={member.id} path={`/team/${rename(member.name)}`} element={<TeamMemberModal teamMember={member}/>} />
          ))}
        </Routes>
    </BrowserRouter>
  );
}

export default App;
