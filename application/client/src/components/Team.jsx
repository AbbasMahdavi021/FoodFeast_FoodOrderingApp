import React from 'react';
import { Link } from 'react-router-dom';

function Team(props) {
  let rename = (name) =>{{
    let nameCopy = name;
    nameCopy.replace(/\s/g, '-');
    return nameCopy;
  }}
  return (
    <div id='team-container'>
      {props.teamMembers.map((teamMember) => (
        <Link className='team-link' key={teamMember.id} to={`/team/${(rename(teamMember.name))}`}>
          <img className='team-image' src={teamMember.photo} alt={teamMember.name} />
          <div className='image-member-name'>{teamMember.name}</div>
          <div className='image-member-role'>{teamMember.role}</div>
        </Link>
      ))}
    </div>
  );
}

export default Team;