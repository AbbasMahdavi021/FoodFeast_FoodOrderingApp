import React, { useState } from 'react';

const Filter = (props) => {
  const [allChecked, setAllChecked] = useState(true);
  const [cuisineChecked, setCuisineChecked] = useState([
    { name: 'American', isChecked: true },
    { name: 'Italian', isChecked: true },
    { name: 'Mexican', isChecked: true },
    { name: 'Japanese', isChecked: true },
    { name: 'Indian', isChecked: true },
  ]);

  const handleAllChecked = () => {
    const newAllChecked = !allChecked;
    setAllChecked(newAllChecked);

    const newCuisineChecked = cuisineChecked.map((cuisine) => {
      return {
        ...cuisine,
        isChecked: newAllChecked,
      };
    });
    setCuisineChecked(newCuisineChecked);

    props.handleFilterChange(newCuisineChecked);
  };

  const handleCuisineChecked = (index) => {
    const newCuisineChecked = [...cuisineChecked];
    newCuisineChecked[index].isChecked = !newCuisineChecked[index].isChecked;
    setCuisineChecked(newCuisineChecked);

    const isAllChecked = newCuisineChecked.every((cuisine) => cuisine.isChecked);
    setAllChecked(isAllChecked);

    props.handleFilterChange(newCuisineChecked);
  };

  return (
    <div className="filter-container">
      <h2>Cuisines</h2>
      <button className={allChecked ? "active" : ""} onClick={handleAllChecked}>All</button>
      {cuisineChecked.map((cuisine, index) => (
        <button className={cuisine.isChecked ? "active" : ""} key={cuisine.name} onClick={() => handleCuisineChecked(index)}>
          {cuisine.name}
        </button>
      ))}
    </div>
  );
};

export default Filter;
