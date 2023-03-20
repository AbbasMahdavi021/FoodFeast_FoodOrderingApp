import React from "react";

import './styles/App.css';
import RoutesManager from "./Routes-Manager/RoutesManager";

function App() {
  return (
    <div className='app'>
      <div className='container'>
        <RoutesManager />
      </div>
    </div>
  );
}

export default App;