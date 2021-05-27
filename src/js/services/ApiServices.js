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

    // Getting guests list
    getGuestsList() {
        return this.dataStorage.guestsList;
    }

    // Getting products list
    getProductsList() {
        return this.dataStorage.productsList;
    }

    // Clear data
    clearData() {
        // Testing localStorage
        this.dataStorage.guestsList = [];
        this.dataStorage.productsList = [];
        this.saveDataStorage(this.dataStorage);
    }
}

const apiServices = new ApiServices();

export { apiServices };