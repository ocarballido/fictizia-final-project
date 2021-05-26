import { apiServices } from '../services/ApiServices';

class Model {
    // Add new guest
    addGuest(guestName) {
        return apiServices.addGuest(guestName);
    }

    // Add new product
    addProduct(productTitle, productPrice, productBuyerId, productBuyerName) {
        // Find guest based on productBuyer
        const data = apiServices.getDataStorage();
        const guestsList = data.guestsList;
        const guestBuyerIndex = guestsList.findIndex(guest => {
            return guest.id === productBuyerId;
        });
        const guestBuyerId = guestsList[guestBuyerIndex].name;
        return apiServices.addProduct(productTitle, productPrice, productBuyerId, productBuyerName = guestBuyerId);
    }

    // Delete guest/peoduct from list
    deleteItem(itemId, itemList) {
        const data = apiServices.getDataStorage();
        const guestsList = data.guestsList;
        const productsList = data.productsList;

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
            const productAsociated = productsList.findIndex(product => {
                return product.productBuyerId === itemId;
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
        const data = apiServices.getDataStorage();
        const productsList = data.productsList;
        // console.log(productsList);
        const productSum = productsList.reduce((acc, currentProduct) => {
            return (acc + currentProduct.productPrice);
        }, 0);
        return productSum;
    }

    // Calculate the fucking debt
    calcFuckingDebt() {
        const guestsList = apiServices.getGuestsList();
        const productsList = apiServices.getProductsList();

        const expensesByBuyer = productsList.reduce((obj, product) => {
            const buyerId = product.productBuyerId;
            obj[buyerId] = obj[buyerId] || 0;
            obj[buyerId] += product.productPrice
            return obj;
        }, {});

        const totalBuyers = guestsList.length;
        const shouldReceiveFromBuyers = guestsList.reduce((obj, buyer) => {
            const buyerId = buyer.id;
            obj[buyerId] = (expensesByBuyer[buyerId] || 0) / totalBuyers;
            return obj;
        }, {});

        const debts = guestsList.map((buyer) => {
            const buyerId = buyer.id;
            const buyerName = guestsList.find(debtor => debtor.id === buyerId);
            let debtsSum = 0;
            const debts = guestsList.reduce((obj, debtor) => {
                const debtorId = debtor.id;
                if (buyerId !== debtorId) {
                    const debt = shouldReceiveFromBuyers[debtorId] - shouldReceiveFromBuyers[buyerId];
                    const debtorName = guestsList.find(debtor => debtor.id === debtorId);
                    if (debt > 0) {
                        obj[debtorName.name] = debt;
                        debtsSum = (debtsSum || 0) + obj[debtorName.name];
                    }
                    // obj[debtorName.name] = debt < 0
                    //     ? 0
                    //     : debt;
                    // debtsSum = (debtsSum || 0) + obj[debtorName.name];
                }
                return obj;
            }, {});

            return {
                id: buyerId,
                name: buyerName.name,
                debts,
                debtsSum,
            };
        });
        // console.log(debts);

        return debts;
    }

    // Calculate debt
    calcDebt() {
        const data = apiServices.getDataStorage();
        const guestsList = data.guestsList;
        const productsList = data.productsList;

        const expensesByBuyer = productsList.reduce((obj, product) => {
            const buyerId = product.productBuyerId;
            obj[buyerId] = obj[buyerId] || 0;
            obj[buyerId] += product.productPrice
            return obj;
        }, {});

        const totalBuyers = guestsList.length;
        const shouldReceiveFromBuyers = guestsList.reduce((obj, buyer) => {
            const buyerId = buyer.id;
            obj[buyerId] = (expensesByBuyer[buyerId] || 0) / totalBuyers;
            return obj;
        }, {});

        const debts = guestsList.map((buyer) => {
            const buyerId = buyer.id;
            const buyerName = guestsList.find(debtor => debtor.id === buyerId);
            let debtsSum = 0;
            const debts = guestsList.reduce((obj, debtor) => {
                const debtorId = debtor.id;
                if (buyerId !== debtorId) {
                    const debt = shouldReceiveFromBuyers[debtorId] - shouldReceiveFromBuyers[buyerId];
                    const debtorName = guestsList.find(debtor => debtor.id === debtorId);
                    if (debt > 0) {
                        obj[debtorName.name] = debt;
                        debtsSum = (debtsSum || 0) + obj[debtorName.name];
                    }
                    // obj[debtorName.name] = debt < 0
                    //     ? 0
                    //     : debt;
                    // debtsSum = (debtsSum || 0) + obj[debtorName.name];
                }
                return obj;
            }, {});

            return {
                id: buyerId,
                name: buyerName.name,
                debts,
                debtsSum,
            };
        });
        // console.log(debts);

        return debts;
    }

    // Add summary item
    updateSummaryItem() {
        const data = apiServices.getDataStorage();
        const guestsList = data.guestsList;
        const productsList = data.productsList;
        return guestsList;
    }

    // Get data from local storage
    getDataFromLocalStogare() {
        return apiServices.getDataStorage();
    }

    // Clear data
    clearData() {
        apiServices.clearData();
    }
};

export { Model };