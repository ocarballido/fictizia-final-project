import { apiServices } from '../services/ApiServices';

import { Guest } from './Guest';
import { Product } from './Product';
import { ProductAssigned } from './Product';

class Model {

    constructor() {
        this._guests = [];
        this._products = [];
        this._guestsObject = {};
    }

    _insertGuest(guestData) {
        const guest = new Guest(guestData);
        this._guests.push(guest);
        this._guestsObject[guest.id] = guest;
        return guest;
    }

    _insertProduct(productData) {
        const product = new Product(productData);
        this._products.push(product);
        return product;
    }

    _getProductAssigned(product) {
        return new ProductAssigned(
            {
                id: product.id,
                title: product.productTitle,
                price: product.productPrice,
                buyer: product.productBuyerId
            },
            this._guestsObject[product.productBuyerId].name
        );
    };

    loadData() {
        return Promise.all([
            this.loadGuests(),
            this.loadProducts()
        ]);
    }

    // Get all the guests in the database
    loadGuests() {
        return new Promise((resolve, reject) => {
            apiServices
                .loadGuests()
                .then(guests => {
                    guests.forEach(guestData => this._insertGuest(guestData));
                    resolve();
                })            
                .catch(error => {
                    reject(error);
                    console.log(error);
                });
        });
    }

    loadProducts() {
        return new Promise((resolve, reject) => {
            apiServices
                .loadProducts()
                .then((products) => {
                    products.forEach(productData => this._insertProduct(productData));
                    resolve();
                })
                .catch(error => {
                    reject(error);
                    console.log(error);
                });
        });
    }

    // Add new guest
    addGuest(guestName) {
        return apiServices
            .addGuest(guestName)
            .then(guestData => this._insertGuest(guestData))
            .catch(error => console.log(error));     
    }

    // Add new product
    addProduct(productTitle, productPrice, productBuyerId) {
        return apiServices
            .addProduct(productTitle, productPrice, productBuyerId)
            .then(productData => {
                const product = this._insertProduct(productData);
                return this._getProductAssigned(product);
            })
            .catch(error => console.log(error));
    }

    getGuests() {
        return this._guests;
    }

    getProducts() {
        return this._products.map(product => this._getProductAssigned(product));
    }

    deleteGuest(id) {
        return apiServices
            .deleteGuest(id)
            .then(() => {
                this._guests = this._guests.filter(guest => guest.id !== id);
                delete this._guestsObject[id];
                return true;
            })
            .catch(error => console.log(error));
    }

    deleteProduct(id) {
        return apiServices
            .deleteProduct(id)
            .then(() => {
                this._products = this._products.filter(product => product.id !== id);
                return true;
            })
            .catch(error => console.log(error));
    }

    // Update guest expenses
    /*calcGuestExpenses(productPrice, productBuyerId) {
        apiServices.calcGuestExpenses(productPrice, productBuyerId);
    }*/
};

export { Model };