import { Guest } from '../Guest';
import { Product } from '../Product';

class ApiServices {
    constructor() {
        this.data = {
            guestsList: [],
            productsList: [],
            summaryList: []
        }
    }

    // Add new guest
    addGuest(guestName) {
        const guest = new Guest(guestName);
        this.data.guestsList.push(guest);
        return guest;
    }

    // Delete guest from list
    // deleteGuest(guestId) {
    //     const guestToDeleteIndex = this.data.guestsList.findIndex(guest => {
    //         return guest.id === guestId;
    //     });
    //     this.data.guestsList.splice(guestToDeleteIndex, 1);
    // }

    // Add new product
    addProduct(productTitle, productPrice, productBuyer) {
        const product = new Product(productTitle, productPrice, productBuyer);
        this.data.productsList.push(product);
        return product;
    }

    // Delete product from list
    // deleteProduct(productId) {
    //     const productToDeleteIndex = this.data.productsList.findIndex(product => {
    //         return product.id === productId;
    //     });
    //     this.data.productsList.splice(guestToDeleteIndex, 1);
    // }

    // Delete guest/peoduct from list
    deleteItem(itemId, itemList) {
        const itemToDeleteIndex = this.data[itemList].findIndex(item => {
            return item.id === itemId;
        });
        this.data[itemList].splice(itemToDeleteIndex, 1);
        if (itemList === 'guestsList') {
            this.data.productsList.splice(itemToDeleteIndex, 1);
        }
    }
}

const apiServices = new ApiServices();

export { apiServices };