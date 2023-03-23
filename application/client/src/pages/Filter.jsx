import React , { useState } from 'react';

const Filter = ( props ) => {

  const [allChecked, setAllChecked] = useState(true);
  const [cuisineChecked, setCuisineChecked] = useState([
    {name: 'American', isChecked: true},
    {name: 'Italian', isChecked: true},
    {name: 'Mexican', isChecked: true},
    {name: 'Japanese', isChecked: true},
    {name: 'Indian', isChecked: true},
  ]);

  const handleAllChecked = (e) => {
    setAllChecked(!allChecked);
    props.handleFilterChange(
      {name: 'American', isChecked: true},
      {name: 'Italian', isChecked: true},
      {name: 'Mexican', isChecked: true},
      {name: 'Japanese', isChecked: true},
      {name: 'Indian', isChecked: true},
    );
  };

  const handleCuisineChecked = (e) => {
    let newCuisines = [...cuisineChecked];
    newCuisines[e.target.value].isChecked = !newCuisines[e.target.value].isChecked;
    setCuisineChecked(
      newCuisines
    );
    // setAllChecked(false);
    props.handleFilterChange(cuisineChecked);
  };

  return (
    <div className="filter-container">
      <h2>Cuisines</h2>
      {/* <label>
        <input
          type="checkbox"
          checked={allChecked}
          onChange={(e)=>{handleAllChecked(e)}}
        />
        All
      </label> */}
      <label>
        <input
          type="checkbox"
          name="American"
          value={0}
          checked={cuisineChecked[0].isChecked}
          onChange={(e)=>{handleCuisineChecked(e)}}
        />
        American
      </label>
      <label>
        <input
          type="checkbox"
          name="Italian"
          value={1}
          checked={cuisineChecked[1].isChecked}
          onChange={(e)=>{handleCuisineChecked(e)}}
        />
        Italian
      </label>
      <label>
        <input
          type="checkbox"
          name="Mexican"
          value={2}
          checked={cuisineChecked[2].isChecked}
          onChange={(e)=>{handleCuisineChecked(e)}}
        />
        Mexican
      </label>
      <label>
        <input
          type="checkbox"
          name="Japanese"
          value={3}
          checked={cuisineChecked[3].isChecked}
          onChange={(e)=>{handleCuisineChecked(e)}}
        />
        Japanese
      </label>
      <label>
        <input
          type="checkbox"
          name="Indian"
          value={4}
          checked={cuisineChecked[4].isChecked}
          onChange={(e)=>{handleCuisineChecked(e)}}
        />
        Indian
      </label>
    </div>
  );
};

export default Filter;