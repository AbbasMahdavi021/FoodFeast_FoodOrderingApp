import React, { useState, useEffect } from 'react';
import './styles/App.css';
import RoutesManager from './Routes-Manager/RoutesManager';
import { UserProvider } from './context';
import { RestaurantsProvider } from './components/RestaurantsContext';

function App() {
  return (
    <div className='app'>
      <div className='container'>
        <UserProvider>
          <RestaurantsProvider>
            <RoutesManager />
          </RestaurantsProvider>
        </UserProvider>
      </div>
    </div>
  );
}

export default App;
