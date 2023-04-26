/*
This code is a React component that allows users to filter a list of cuisines by selecting from a dropdown menu.

When the component is loaded, it sets the default value of the dropdown menu to "All" and stores the selectedCuisine in state.

The handleCuisineSelected function is called whenever the user selects a cuisine from the dropdown menu, and updates the selected cuisine in state. If the selected cuisine is "All", 
it calls the handleFilterChange function with an empty array, otherwise, it calls the function with an array containing the selected cuisine name.

The cuisinse name are dynamically recieved from the props, and mapped to create the drop down. Meaning the drop down options, are not set values/specific.

The returned file displays a container that includes a dropdown menu with a list of cuisines based on the data passed through props.

By: Abbas M

*/

import React, { useState } from 'react';

const Filter = (props) => {

  const [selectedCuisine, setSelectedCuisine] = useState('All');

  const handleCuisineSelected = (event) => {
    setSelectedCuisine(event.target.value);
    if (event.target.value === 'All') {
      props.handleFilterChange([]);
    } else {
      props.handleFilterChange([{ name: event.target.value, isChecked: true }]);
    }
  };

  return (
    <div className="filter-container">
      <select value={selectedCuisine} onChange={handleCuisineSelected}>
        <option value="All">All</option>
        {props.cuisines.map(cuisine => (
          <option key={cuisine.name} value={cuisine.name}>{cuisine.name}</option>
        ))}
      </select>
    </div>
  );
};

export default Filter;