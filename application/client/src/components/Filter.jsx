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
      <h2>Cuisines</h2>
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