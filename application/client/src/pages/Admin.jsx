
import React, {useState, useEffect} from 'react';
import axios from 'axios';


const Admin = () => {


  const [isAdminLoggedIn, setIsAdminLoggedin] = useState(false);



  useEffect(() => {
    const getStatus = async () => {
      try {
        const res = await axios.get("/auth/getStatus", { withCredentials: true });
        setIsAdminLoggedin(res.data.isAdminLoggedIn);
        console.log(isAdminLoggedIn + " HAH");

      } catch (err) {
        console.error(err);
      }
    }
    getStatus();
  }, []);



  return (



      (isAdminLoggedIn && (
      <div>
        <h1>Welcome to the Admin Dashboard</h1>
      </div>

      ) )



  );


};

export default Admin