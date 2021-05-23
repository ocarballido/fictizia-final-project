import { apiServices } from '../services/ApiServices';

class Model {

    constructor() {
        this._guests = [];
        this._products = [];
        this._guestsObject = {};
    }

    _insertGuest(guest) {
        this._guests.push(guest);
        this._guestsObject[guest.id] = guest;
        return guest;
    }

    _insertProduct(product) {
        this._products.push(product);
        return product;
    }

    _getProductAssigned(product) {
        return {
            ...product,
            buyerName: this._guestsObject[product.buyer].name
        };
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
                    guests.forEach(guest => this._insertGuest(guest));
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
                    products.forEach(product => this._insertProduct(product));
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
            .then(guest => this._insertGuest(guest))
            .catch(error => console.log(error));     
    }

    // Add new product
    addProduct(title, price, buyer) {
        return apiServices
            .addProduct(title, price, buyer)
            .then(product => {
                this._insertProduct(product);
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
        return new Promise((resolve, reject) => {
            const products = this._products.filter(product => product.buyer === id);
            const deletes = products.map(product => this.deleteProduct(product.id));
            Promise.all(deletes)
                .then(() => {
                    apiServices
                        .deleteGuest(id)
                        .then(() => {
                            this._guests = this._guests.filter(guest => guest.id !== id);
                            delete this._guestsObject[id];
                            resolve(true);
                        })
                        .catch(error => console.log(error));
                })
                .catch(error => reject(error));
        });
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