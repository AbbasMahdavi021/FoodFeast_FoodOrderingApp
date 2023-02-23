import './App.css';
import axios from 'axios';
import React, { useState } from 'react';

function App() {
  const [profileData, setProfileData] = useState(null);

  let handleClick = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/about/${userId}`);
      console.log(response);
      setProfileData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <p> Hello World</p>

      <button onClick={() => handleClick(1)}>Jed</button>
      <button onClick={() => handleClick(2)}>Nathan</button>
      <button onClick={() => handleClick(3)}>Abbas</button>
      {profileData && (
        <div>
          <h2>{`Name: ${profileData.name}`}</h2>
          <p>{`Email: ${profileData.email}`}</p>
          <p>{`Bio: ${profileData.bio}`}</p>
        </div>
      )}
    </div>
  );
}

export default App;
