import { apiServices } from '../services/ApiServices';

class Model {
    // Add new guest
    addGuest(guestName) {
        return apiServices.addGuest(guestName);
    }

    // Add new product
    addProduct(productTitle, productPrice, productBuyerId) {
        return apiServices.addProduct(productTitle, productPrice, productBuyerId);
    }

    // Delete guest/peoduct from list
    deleteItem(itemId, itemList) {
        return apiServices.deleteItem(itemId, itemList);
    }

    // Sum of all prices
    sumOfProductPrices() {
        return apiServices.getProductsList();
    }

    // Calc debt
    calcFuckingDebt() {
        return apiServices.calcFuckingDebt();
    }

    // Add summary item
    updateSummaryItem() {
        return apiServices.getGuestsList();
    }
};

export { Model };