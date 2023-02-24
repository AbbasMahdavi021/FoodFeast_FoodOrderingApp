import React, { useState, useEffect } from 'react';

function TeamMemberModal(props) {
    const { teamMember } = props;

    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        setIsOpen(true);
    }, [teamMember]);
    return isOpen ? (
        <div className="modal-overlay">
            <button className="modal-close" onClick={() => setIsOpen(false)}>
                X
            </button>
            <div className='modal-image-container'>
                <img className='modal-image' src={teamMember.photo} alt={teamMember.name} />
            </div>
            <div className='modal-text-container'>
                <div className='modal-name'>{teamMember.name}</div>
                <p className='modal-bio'>{teamMember.bio}</p>
            </div>
        </div>
    ) : null;
}

export default TeamMemberModal;