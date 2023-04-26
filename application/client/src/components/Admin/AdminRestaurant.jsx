/*

Admin dashboard related

By; Abbas M.

*/

import axios from "axios";
import React from "react";


const AdminRestaurant = (props) => {

    const handleDelete = async (e) => {

        let id = e.target.value;

        const res = await axios.post("/admin/deleteRestaurant", { restaurantId: id }, { withCredentials: true });

        if (res.status === 200) {
            //props.consoleOut(`User ${userId} was deleted!`);
            console.log((`Restaurant ${id} was deleted!`));
            props.refresh(props.restaurantId);

        } else {
            //props.consoleOut(`Error: ${res.status}`);
            console.log(`Error: ${res}`);
        }
    }

    return (

        <div className={`info ${props.isOdd}`}>
            <div className="admin-user-info">
                <div className="admin-user-name">{props.name} </div>
                <div className="admin-user-name"></div> {props.restaurantId}
            </div>
            <button className="admin-delete" onClick={e => handleDelete(e)} value={props.restaurantId}> X </button>
        </div>


    )
};

export default AdminRestaurant;