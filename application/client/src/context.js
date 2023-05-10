import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [restaurantId, setRestaurantId] = useState(null);

  const fetchRestaurantId = async (user) => {
    if (user.isRestaurantOwner) {
      try {
        const response = await fetch(`http://localhost:8080/restaurants/owner/${user.id}`);
        const data = await response.json();
        console.log('data', data);
        if (data && data.restaurants && data.restaurants.length > 0) {
          setAndPersistRestaurantId(data.restaurants[0].id);
        }
      } catch (error) {
        console.error('Error fetching restaurant ID:', error);
      }
    }
  };
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedRestaurantId = localStorage.getItem('restaurantId');

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      if (storedRestaurantId) {
        const parsedRestaurantId = JSON.parse(storedRestaurantId);
        console.log("Retrieved restaurantId:", parsedRestaurantId);
        setRestaurantId(parsedRestaurantId);
      } else {
        fetchRestaurantId(parsedUser);
      }
    } else {
      console.log('No user in local storage')
    }
  }, []);

  const setAndPersistRestaurantId = (id) => {
    console.log('restaurant id in context', id)
    setRestaurantId(id);
    localStorage.setItem('restaurantId', JSON.stringify(id));
  };

  const setPersistedUser = (newUser) => {
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  return (
    <UserContext.Provider value={{ user, restaurantId, setUser: setPersistedUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
