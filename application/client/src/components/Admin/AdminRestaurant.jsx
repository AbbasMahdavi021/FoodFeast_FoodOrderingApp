import axios from "axios";
import React from "react";



const AdminRestaurant = (props) => {

    const handleDelete = async (e) => {

        let id = e.target.value;
        console.log(id + " HAHAH");

        const res = await axios.post("/admin/deleteRestaurant", {restaurantId : id },  {withCredentials: true});

        if(res.status === 200) {
            //props.consoleOut(`User ${userId} was deleted!`);
            console.log((`Restaurant ${id} was deleted!`));
            props.refresh(props.restaurantId);

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
                    {props.restaurantId}
                    <button className="admin-delete" onClick={e => handleDelete(e)} value={props.restaurantId}> X </button>
                </div>
            </div>
        </div>
    )
};

export default AdminRestaurant;