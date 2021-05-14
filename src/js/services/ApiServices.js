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
    deleteGuest(guestId) {
        const guestToDeleteIndex = this.data.guestsList.findIndex(guest => {
            return guest.id === guestId;
        });
        this.data.guestsList.splice(guestToDeleteIndex, 1);
    }

    // Add new product
    addProduct(productTitle, productPrice, productBuyer) {
        const product = new Product(productTitle, productPrice, productBuyer);
        this.data.productsList.push(product);
        return product;
    }

    // Delete product from list
}

const apiServices = new ApiServices();

export { apiServices };