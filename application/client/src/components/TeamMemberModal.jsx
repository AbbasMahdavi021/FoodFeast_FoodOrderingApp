import React, { useState, useEffect } from 'react';

function TeamMemberModal(props) {
    const { teamMember} = props;

    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        setIsOpen(true);
    }, [teamMember]);

    return isOpen ? (
        <div className="modal-overlay">
            <div className="modal">
                <button className="modal-close" onClick={() => setIsOpen(false)}>
                    X
                </button>
                <h2>{teamMember.name}</h2>
                <p>{teamMember.bio}</p>
                <p>Email: {teamMember.id}</p>
            </div>
        </div>
    ) : null;
}

export default TeamMemberModal;