import { apiServices } from '../services/ApiServices';

class Model {
    // Add new guest
    addGuest(guestName) {
        return apiServices.addGuest(guestName);
    }

    // Delete guest from list
    deleteGuest(guestId) {
        return apiServices.deleteGuest(guestId);
    }

    // Add new product
    addProduct(productTitle, productPrice, productBuyer) {
        return apiServices.addProduct(productTitle, productPrice, productBuyer);
    }
};

export { Model };