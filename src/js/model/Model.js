import { apiServices } from '../services/ApiServices';

class Model {
    // Add new guest
    addGuest(guestName) {
        return apiServices.addGuest(guestName);
    }

    // Delete guest from list
    // deleteGuest(guestId) {
    //     return apiServices.deleteGuest(guestId);
    // }

    // Add new product
    addProduct(productTitle, productPrice, productBuyer) {
        return apiServices.addProduct(productTitle, productPrice, productBuyer);
    }

    // Delete product from list
    // deleteProduct(productId) {
    //     return apiServices.deleteProduct(productId);
    // }

    // Delete guest/peoduct from list
    deleteItem(itemId, itemList) {
        return apiServices.deleteItem(itemId, itemList);
    }
};

export { Model };