/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: Admin.jsx
 * Created on: 04/23
 * Author(s): Abbas M.
 * Contact: amahdavi2@sfsu.edu
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: Cart Class handler, create, update, add, remove cart and items in it,
 * Keeps tracks of items, toatal, etc.
 */


module.exports = function Cart(oldCart) {

    this.itemList = oldCart.itemList || [];
    this.totalQuantity = oldCart.totalQuantity || 0;
    this.totalCost = oldCart.totalCost || 0;
    this.restaurantId = oldCart.restaurantId || -1;

    this.addItem = (item) => {

        //users trying to add two different items from different restaurants
        if (this.restaurantId != -1 && item.restaurantId != this.restaurantId) {
            //delete all items in cart
            this.itemList = [];
            this.totalQuantity = 0;
            this.totalCost = 0;
        }

        this.restaurantId = item.restaurantId;

        let i = 0;

        for (i; i < this.itemList.length; i++) {


            if (this.itemList[i].id === item.id) {
                this.itemList[i].itemQuantity++;
                break;
            }
        }

        if (i === this.itemList.length) {
            item.itemQuantity = 1;
            this.itemList.push(item)
        }

        this.totalQuantity += 1;
        this.totalCost += parseFloat(item.price);
    };

    this.removeItem = (item) => {

        for (let i = 0; i < this.itemList.length; i++) {
            if (this.itemList[i].id === item.id) {
                this.totalQuantity -= item.itemQuantity;
                this.totalCost -= item.itemQuantity * item.price;
                this.itemList.splice(i, 1);
            }
        }
    }

    this.updateItem = (id, addend) => {

        for (let i = 0; i < this.itemList.length; i++) {
            console.log(this.itemList[i].id);
            if (this.itemList[i].id === id) {
                this.totalQuantity += addend;
                this.itemList[i].itemQuantity += addend;
                this.totalCost += this.itemList[i].price * addend;
                if (this.itemList[i].itemQuantity <= 0) {
                    this.itemList.splice(i, 1);
                }
            }
        }
    }

}