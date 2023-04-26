import axios from "axios";
import React from "react";



const AdminUser = (props) => {

    const handleDelete = async (e) => {

        let id = e.target.value;
        console.log(id + " HAHAH");

        const res = await axios.post("/admin/deleteUser", { userId: id }, { withCredentials: true });

        if (res.status === 200) {
            //props.consoleOut(`User ${userId} was deleted!`);
            console.log((`User ${id} was deleted!`));
            props.refresh(props.userId);

        } else {
            //props.consoleOut(`Error: ${res.status}`);
            console.log(`Error: ${res}`);
        }
    }

    return (

        <div className={`info ${props.isOdd}`}>
            <div className="admin-user-info">
                <div className="admin-user-name">{props.name} </div>
                <div className="admin-user-name"></div> {props.userId}
            </div>
            <button className="admin-delete" onClick={e => handleDelete(e)} value={props.userId}> X </button>
        </div>

    )
};

export default AdminUser;