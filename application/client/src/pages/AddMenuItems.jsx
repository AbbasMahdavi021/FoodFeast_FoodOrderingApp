/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: AddMenuItems.jsx
 * Created on: 04/23
 * Author(s):
 * Contact: 
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: Here the restaurant owner can add menu items to their restaurant.
 *    The items they add are displayed in a list below the form.
 *    Once they have added all of the items they want, they can click the "Finish" button
 *    which will take them to the "Menu Item Added Page" page.
 */

import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import '../styles/AddMenuItems.css'
import { useNavigate } from 'react-router-dom'

const AddMenuItems = (props) => {
  const navigate = useNavigate()
  const { restaurantId } = useParams()

  const [menuItemName, setMenuItemName] = useState('')
  const [menuItemPrice, setMenuItemPrice] = useState('')
  const [menuItemDescription, setMenuItemDescription] = useState('')
  const [menuItemImage, setMenuItemImage] = useState('')
  const [menuItems, setMenuItems] = useState([])

  const handleMenuItemSubmit = async (e) => {
    e.preventDefault()
    try {
        await axios.post('http://localhost:8080/addMenuItem', {
        name: menuItemName,
        price: menuItemPrice,
        restaurant_id: restaurantId,
        image: menuItemImage,
        description: menuItemDescription,
      })

      setMenuItems([
        ...menuItems,
        {
          name: menuItemName,
          price: menuItemPrice,
          description: menuItemDescription,
          image: menuItemImage,
        },
      ])

      setMenuItemName('')
      setMenuItemPrice('')
      setMenuItemDescription('')
      setMenuItemImage('')
    } catch (err) {
      console.error(err)
    }
  }

  const handleFinish = () => {
    navigate('/ThankYouForEnrolling')
  }

  return (
    <div className="add-menu-items">
      <h1>Add Menu Items</h1>
      <form onSubmit={handleMenuItemSubmit}>
        <div className="form-group">
          <label htmlFor="name">Item Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={menuItemName}
            onChange={(e) => setMenuItemName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={menuItemPrice}
            onChange={(e) => setMenuItemPrice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={menuItemDescription}
            onChange={(e) => setMenuItemDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="text"
            id="image"
            name="image"
            value={menuItemImage}
            onChange={(e) => setMenuItemImage(e.target.value)}
          />
        </div>
        <button type="submit">Add Item</button>
        <button type="button" onClick={handleFinish}>
          Finish
        </button>
      </form>
      <div className="added-menu-items">
        <h2>Added Menu Items</h2>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price} - {item.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AddMenuItems
