import axios from "axios";
import React from "react";



const AdminUser = (props) => {

    const handleDelete = async (e) => {

        let id = e.target.value;
        console.log(id + " HAHAH");

        const res = await axios.post("/admin/deleteUser", {userId : id },  {withCredentials: true});

        if(res.status === 200) {
            //props.consoleOut(`User ${userId} was deleted!`);
            console.log((`User ${id} was deleted!`));
            props.refresh(props.userId);

        }else {
            //props.consoleOut(`Error: ${res.status}`);
            console.log(`Error: ${res}`);
        }
    } 

    return(
        <div className="adminUser">

            <div className="admin-user-info">
                <div className={`info ${props.isOdd}`}>
                    {props.name}
                    {props.userId}
                    <button className="admin-delete" onClick={e => handleDelete(e)} value={props.userId}> X </button>
                </div>
            </div>
        </div>
    )
};

export default AdminUser;