import React from "react";



const AdminUser = (props) => {

    return(
        <div className="adminUser">

            <div className="admin-user-info">
                <div className="info">
                    {props.name}
                    {props.userId}
                    <button> X </button>
                </div>
            </div>
        </div>
    )
};

export default AdminUser;