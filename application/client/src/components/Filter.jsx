/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: Filter.jsx
 * Created on: 03/23
 * Author(s): Abbas M
 * Contact:  amahdavi2@sfsu.edu
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: This code is a React component that allows users to filter a list of cuisines 
 *    by selecting from a dropdown menu.
 * 
 *    When the component is loaded, it sets the default value of the dropdown menu to "All" and 
 *    stores the selectedCuisine in state.
 * 
 *    The handleCuisineSelected function is called whenever the user selects a cuisine from the 
 *    dropdown menu, and updates the selected cuisine in state. If the selected cuisine is "All", 
 *    it calls the handleFilterChange function with an empty array, otherwise, it calls the function 
 *    with an array containing the selected cuisine name.
 * 
 *    The cuisinse name are dynamically recieved from the props, and mapped to create the drop down. 
 *    Meaning the drop down options, are not set values/specific.
 * 
 *    The returned file displays a container that includes a dropdown menu with a list of cuisines 
 *    based on the data passed through props.
 */

import React, { useState } from 'react';
import Select from 'react-select';


const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: '#fc3',
    color: 'black',
    border: 'none',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: 'yellow',
    },
  }),
  option: (styles, { isDisabled, isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isSelected
      ? 'grey' 
      : isFocused
      ? 'lightblue'
      : null,
    color: isSelected ? 'white' : 'black',
    cursor: isDisabled ? 'not-allowed' : 'default',
  }),
};

const Filter = (props) => {
  const [selectedCuisine, setSelectedCuisine] = useState('All');

  const handleCuisineSelected = (selectedOption) => {
    setSelectedCuisine(selectedOption.value);
    if (selectedOption.value === 'All') {
      props.handleFilterChange([]);
    } else {
      props.handleFilterChange([{ name: selectedOption.value, isChecked: true }]);
    }
  };

  const options = [
    { value: 'All', label: 'All' },
    ...props.cuisines.map((cuisine) => ({
      value: cuisine.name,
      label: cuisine.name
    }))
  ];

  return (
    <div className="filter-container">
      <Select
        className='filter-dropdown'
        value={{ value: selectedCuisine, label: selectedCuisine }}
        options={options}
        onChange={handleCuisineSelected}
        styles={colourStyles}
      />
    </div>
  );
};

export default Filter;
