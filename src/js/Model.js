import { apiServices } from './ApiServices';
import { Guest } from './classes/Guest';
import { Product } from './classes/Product';

class Model {
    constructor() {
        this.data = apiServices.getDataStorage();
    }
    // Add new guest
    addGuest(guestName) {
        // Create guest instance
        const guest = new Guest(guestName);

        // Add tu data
        this.data.guestsList.push(guest);
        apiServices.saveDataStorage(this.data);

        return guest;
    }

    // Add new product
    addProduct(productTitle, productPrice, productBuyerId, productBuyerName) {
        // Find index guest based on productBuyer
        const guestBuyerIndex = this.data.guestsList.findIndex(guest => {
            return guest.id === productBuyerId;
        });

        // Find guest
        const guestBuyerId = this.data.guestsList[guestBuyerIndex].name;

        // Create instance
        const product = new Product(productTitle, productPrice, productBuyerId, productBuyerName = guestBuyerId);

        // Add to data
        this.data.productsList.push(product);
        apiServices.saveDataStorage(this.data);

        return product;
    }

    // Delete guest/peoduct from list
    deleteItem(itemId, itemList) {
        if (itemList === 'guestsList') {
            // Find guest index
            const guestToDelete = this.data.guestsList.findIndex(item => {
                return item.id === itemId;
            });

            // Remove guest
            this.data.guestsList.splice(guestToDelete, 1);
            
            // Remove products asociated
            this.data.productsList = this.data.productsList.filter(product => {
                return product.productBuyerId !== itemId
            })
        } else {
            // Find product index
            const productToDelete = this.data.productsList.findIndex(item => {
                return item.id === itemId;
            });

            // Remove product
            this.data.productsList.splice(productToDelete, 1);
        }

        apiServices.saveDataStorage(this.data);
    }

    // Sum of all prices
    sumOfProductPrices() {
        const productSum = this.data.productsList.reduce((acc, currentProduct) => {
            return (acc + currentProduct.productPrice);
        }, 0);
        return productSum;
    }

    // Calculate debt
    calcDebt() {
        const expensesByBuyer = this.data.productsList.reduce((obj, product) => {
            const buyerId = product.productBuyerId;
            obj[buyerId] = obj[buyerId] || 0;
            obj[buyerId] += product.productPrice
            return obj;
        }, {});

        const totalBuyers = this.data.guestsList.length;
        const shouldReceiveFromBuyers = this.data.guestsList.reduce((obj, buyer) => {
            const buyerId = buyer.id;
            obj[buyerId] = (expensesByBuyer[buyerId] || 0) / totalBuyers;
            return obj;
        }, {});

        const debts = this.data.guestsList.map((buyer) => {
            const buyerId = buyer.id;
            const buyerName = this.data.guestsList.find(debtor => debtor.id === buyerId);
            let debtsSum = 0;
            const debts = this.data.guestsList.reduce((obj, debtor) => {
                const debtorId = debtor.id;
                if (buyerId !== debtorId) {
                    const debt = shouldReceiveFromBuyers[debtorId] - shouldReceiveFromBuyers[buyerId];
                    const debtorName = this.data.guestsList.find(debtor => debtor.id === debtorId);
                    if (debt > 0) {
                        obj[debtorName.name] = debt;
                        debtsSum = (debtsSum || 0) + obj[debtorName.name];
                    }
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

        return debts;
    }

    // Add summary item
    updateSummaryItem() {
        const guestsList = this.data.guestsList;
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