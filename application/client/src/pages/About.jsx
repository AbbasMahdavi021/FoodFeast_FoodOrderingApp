import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/About.css';

function About(props) {
  return (
    <>
      <div id='about-header'>Meet Our Team</div>
      <div id='team-container'>
        {props.teamMembers.map((teamMember) => (
          <Link className='team-link'
            key={teamMember.id}
            to={`/team/${(teamMember.name.replace(/\s/g, '-'))}`}>
            <img className='team-image' src={teamMember.photo} alt={teamMember.name} />
            <div className='image-member-name'>{teamMember.name}</div>
            <div className='image-member-role'>{teamMember.role}</div>
          </Link>
        ))}

      </div>
    </>

  );
}

export default About;