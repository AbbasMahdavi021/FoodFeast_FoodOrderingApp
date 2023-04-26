/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: TeamMemberModal.jsx
 * Created on: 02/23
 * Author(s): Nathan Rennacker
 * Contact: 
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: A React component for displaying a modal with team member info, populated from a jsx enum
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function TeamMemberModal(props) {
  const { teamMember } = props;
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const closeModal = () => {
    setIsOpen(false);
    navigate('/about');
  };

  useEffect(() => {
    setIsOpen(true);
  }, [teamMember]);

  return isOpen ? (
    <div className="modal-overlay">
      <button className="modal-close" onClick={closeModal}>
        X
      </button>
      <div className="modal-image-container">
        <img className="modal-image" src={teamMember.photo} alt={teamMember.name} />
      </div>
      <div className="modal-text-container">
        <div className="modal-name">{teamMember.name}</div>
        <p className="modal-bio">{teamMember.bio}</p>
      </div>
    </div>
  ) : null;
}

export default TeamMemberModal;