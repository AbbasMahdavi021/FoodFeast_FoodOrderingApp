import React from 'react';
import './styles/App.css';
import RoutesManager from './Routes-Manager/RoutesManager';
import { UserProvider } from './context';

function App() {
  return (
    <div className='app'>
      <div className='container'>
        <UserProvider>
          <RoutesManager />
        </UserProvider>
      </div>
    </div>
  );
}

export default App;
