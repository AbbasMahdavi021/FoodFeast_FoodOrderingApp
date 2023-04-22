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

        for (i ; i < this.itemList.length; i++) {


            if (this.itemList[i].id === item.id) {
                this.itemList[i].itemQuantity ++;
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

    this.removeItem= (item) => {

        for (let i = 0; i < this.itemList; i++) {
            if (this.itemList[i].id === item.id) {
                this.totalQuantity -= item.itemQuantity;
                this.totalCost -= item.itemQuantity * item.price;
                this.itemList.splice(i, 1);
            }
        }
    }

    this.updateItem = (item, addend) => {
        for (let i = 0; i < this.itemList; i++) {
            if (this.itemList[i].id === item.id) {
                this.totalQuantity += addend;
                item.itemQuantity += addend;
                this.totalCost -= item.itemQuantity * item.price;
                this.itemList.splice(i, 1);
            }
        }
    }




}