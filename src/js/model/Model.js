import { apiServices } from '../services/ApiServices';

class Model {
    // Add new guest
    addGuest(guestName) {
        return apiServices.addGuest(guestName);
    }

    // Add new product
    addProduct(productTitle, productPrice, productBuyer) {
        return apiServices.addProduct(productTitle, productPrice, productBuyer);
    }

    // Delete guest/peoduct from list
    deleteItem(itemId, itemList) {
        return apiServices.deleteItem(itemId, itemList);
    }
};

export { Model };