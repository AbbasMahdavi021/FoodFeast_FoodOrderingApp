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
        <option value="American">American</option>
        <option value="Italian">Italian</option>
        <option value="Mexican">Mexican</option>
        <option value="Japanese">Japanese</option>
        <option value="Indian">Indian</option>
      </select>
    </div>
  );
};

export default Filter;
