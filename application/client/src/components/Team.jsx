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
      {props.teamMembers.map((member) => (
        <Link className='team-link' key={member.id} to={`/team/${(rename(member.name))}`}>
          <img className='team-image' src={member.photo} alt={member.name} />
          <div className='image-member-name'>{member.name}</div>
          <div className='image-member-role'>{member.role}</div>
        </Link>
      ))}
    </div>
  );
}

export default Team;