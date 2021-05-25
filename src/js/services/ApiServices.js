import { Guest } from '../Guest';
import { Product } from '../Product';

class ApiServices {
    constructor() {
        this.data = {
            guestsList: [],
            productsList: [],
        };
        this.dataStorage = JSON.parse(localStorage.getItem('dataStorage'))
        ||
        {
            guestsList: [],
            productsList: [],
        }
    }

    // Add new guest
    addGuest(guestName) {
        const guest = new Guest(guestName);
        // this.data.guestsList.push(guest);

        // Adding local storage
        this.dataStorage.guestsList.push(guest);
        localStorage.setItem('dataStorage', JSON.stringify(this.dataStorage));

        return guest;
    }

    // Add new product
    addProduct(productTitle, productPrice, productBuyerId, productBuyerName) {
        const product = new Product(productTitle, productPrice, productBuyerId, productBuyerName);
        // this.data.productsList.push(product);

        // Adding local storage
        this.dataStorage.productsList.push(product);
        localStorage.setItem('dataStorage', JSON.stringify(this.dataStorage));

        return product;
    }

    // Delete guest
    deleteGuest(guestToDelete, productAsociated) {
        // Removing guest
        // this.data.guestsList.splice(guestToDelete, 1);

        // Removing product asociated
        // this.data.productsList.splice(productAsociated, 1);

        // Adding local storage
        this.dataStorage.guestsList.splice(guestToDelete, 1);
        this.dataStorage.productsList.splice(productAsociated, 1);
        localStorage.setItem('dataStorage', JSON.stringify(this.dataStorage));

        return guestToDelete;
    }

    // Delete product
    deleteProduct(productToDelete) {
        // Removing product
        // this.data.productsList.splice(productToDelete, 1);

        // Adding local storage
        this.dataStorage.productsList.splice(productToDelete, 1);
        localStorage.setItem('dataStorage', JSON.stringify(this.dataStorage));

        return productToDelete;
    }

    // Getting guests list
    getGuestsList() {
        return this.dataStorage.guestsList;
    }

    // Getting products list
    getProductsList() {
        return this.dataStorage.productsList;
    }

    getDataFromLocalStogare() {
        return this.dataStorage;
    }

    // Clear data
    clearData() {
        this.dataStorage.guestsList = [];
        this.dataStorage.productsList = [];
        localStorage.setItem('dataStorage', JSON.stringify(this.dataStorage));
    }
}

const apiServices = new ApiServices();

export { apiServices };