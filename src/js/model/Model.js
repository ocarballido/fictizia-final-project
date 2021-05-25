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
        const guestsList = apiServices.getGuestsList();
        const productsList = apiServices.getProductsList();

        // Find item index on corresponding list
        const itemToDeleteIndex = [itemList].findIndex(item => {
            return item.id === itemId;
        });

        if (itemList === 'guestsList') {
            // Find guest index
            const guestToDelete = guestsList.findIndex(item => {
                return item.id === itemId;
            });
            // Find product asociated
            const productAsociated = productsList.filter(product => {
                return product.productBuyerId !== itemId;
            });

            return apiServices.deleteGuest(guestToDelete, productAsociated);
        } else {
            // Find product index
            const productToDelete = productsList.findIndex(item => {
                return item.id === itemId;
            });
            return apiServices.deleteProduct(productToDelete);
        }
    }

    // Sum of all prices
    sumOfProductPrices() {
        // Get value
        const productsList = apiServices.getProductsList();
        const productSum = productsList.reduce((acc, currentProduct) => {
            return (acc + currentProduct.productPrice);
        }, 0);
        return productSum;
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