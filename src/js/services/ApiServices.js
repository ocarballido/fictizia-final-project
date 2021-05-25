import { Guest } from '../Guest';
import { Product } from '../Product';

class ApiServices {
    constructor() {
        this.data = {
            guestsList: [],
            productsList: [],
        };
        this.dataStorage = localStorage.getItem('dataStorage')
        ? 
        JSON.parse(localStorage.getItem('dataStorage'))
        :
        {
            guestsList: [],
            productsList: [],
        }
    }

    // Save in localStorage
    saveDataStorage(dataStorage) {
        if (dataStorage.guestsList.length === 0 && dataStorage.productsList.length === 0) {
            localStorage.setItem('dataStorage', '');
        } else {
            localStorage.setItem('dataStorage', JSON.stringify(dataStorage));
        }
    }

    // Get in localStorage
    getDataStorage() {
        return this.dataStorage;
    }

    // Add new guest
    addGuest(guestName) {
        const guest = new Guest(guestName);
        this.data.guestsList.push(guest);

        // Testing localStorage
        this.dataStorage.guestsList.push(guest);
        this.saveDataStorage(this.dataStorage);
        console.log(this.getDataStorage());

        return guest;
    }

    // Add new product
    addProduct(productTitle, productPrice, productBuyerId, productBuyerName) {
        const product = new Product(productTitle, productPrice, productBuyerId, productBuyerName);
        this.data.productsList.push(product);

        // Testing localStorage
        this.dataStorage.productsList.push(product);
        this.saveDataStorage(this.dataStorage);
        console.log(this.getDataStorage());

        return product;
    }

    // Delete guest
    deleteGuest(guestToDelete, productAsociated) {
        // Removing guest
        this.data.guestsList.splice(guestToDelete, 1);

        // Removing product asociated
        this.data.productsList.splice(productAsociated, 1);

        // Testing localStorage
        this.dataStorage.guestsList.splice(guestToDelete, 1);
        this.dataStorage.productsList.splice(productAsociated, 1);
        this.saveDataStorage(this.dataStorage);
        console.log(this.getDataStorage());

        return guestToDelete;
    }

    // Delete product
    deleteProduct(productToDelete) {
        // Removing product
        this.data.productsList.splice(productToDelete, 1);

        // Testing localStorage
        this.dataStorage.productsList.splice(productToDelete, 1);
        this.saveDataStorage(this.dataStorage);
        console.log(this.getDataStorage());

        return productToDelete;
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

        // Testing localStorage
        this.dataStorage.guestsList = [];
        this.dataStorage.productsList = [];
        this.saveDataStorage(this.dataStorage);
    }
}

const apiServices = new ApiServices();

export { apiServices };