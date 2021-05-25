import { Guest } from '../Guest';
import { Product } from '../Product';

class ApiServices {
    constructor() {
        this.data = {
            guestsList: [],
            productsList: [],
        }
    }

    // Add new guest
    addGuest(guestName) {
        const guest = new Guest(guestName);
        this.data.guestsList.push(guest);
        return guest;
    }

    // Add new product
    addProduct(productTitle, productPrice, productBuyerId, productBuyerName) {
        const product = new Product(productTitle, productPrice, productBuyerId, productBuyerName);
        this.data.productsList.push(product);
        return product;
    }

    // Delete guest
    deleteGuest(guestToDelete, productAsociated) {
        // Removing guest
        this.data.guestsList.splice(guestToDelete, 1);

        // Removing product asociated
        this.data.productsList.splice(productAsociated, 1);

        return guestToDelete;
    }

    // Delete product
    deleteProduct(productToDelete) {
        // Removing product
        this.data.productsList.splice(productToDelete, 1);

        return productToDelete;
    }

    // Calc debt
    calcFuckingDebt() {
        return [this.data.guestsList, this.data.productsList];
    }

    // Getting guests list
    getGuestsList() {
        return this.data.guestsList;
    }

    // Getting products list
    getProductsList() {
        return this.data.productsList;
    }

    // Clear data
    clearData() {
        this.data.guestsList = [];
        this.data.productsList = [];
    }
}

const apiServices = new ApiServices();

export { apiServices };