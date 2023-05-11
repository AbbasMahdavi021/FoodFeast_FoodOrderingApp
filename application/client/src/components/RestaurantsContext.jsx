/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: RegisterForm.jsx
 * Created on: 03/23
 * Author(s): Abbas M
 * Contact:  amahdavi2@sfsu.edu
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: Context provider to be able to modify and render the RestaurantList.jsx
 * in different components accross the app
 */

import React, { createContext, useState } from 'react';

export const RestaurantsContext = createContext();

export const RestaurantsProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);

  return (
    <RestaurantsContext.Provider value={{ restaurants, setRestaurants }}>
      {children}
    </RestaurantsContext.Provider>
  );
};