import { apiServices } from '../services/ApiServices';

class Model {
    // Add new guest
    addGuest(guestName) {
        return apiServices.addGuest(guestName);
    }

    // Add new product
    addProduct(productTitle, productPrice, productBuyerId, productBuyerName) {
        // Find guest based on productBuyer
        const guestsList = apiServices.getGuestsList();
        const guestBuyerIndex = guestsList.findIndex(guest => {
            return guest.id === productBuyerId;
        });
        const guestBuyerId = guestsList[guestBuyerIndex].name;
        return apiServices.addProduct(productTitle, productPrice, productBuyerId, productBuyerName = guestBuyerId);
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

    // Clear data
    clearData() {
        apiServices.clearData();
    }
};

export { Model };