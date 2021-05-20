import { Guest } from '../Guest';
import { Product } from '../Product';

class ApiServices {
    constructor() {
        this.data = {
            guestsList: [],
            productsList: [],
            summaryList: []
        }
    }

    // Add new guest
    addGuest(guestName) {
        const guest = new Guest(guestName);
        this.data.guestsList.push(guest);
        return guest;
    }

    // Add new product
    addProduct(productTitle, productPrice, productBuyerId, productBuyerName) {
        // Find guest based on productBuyer
        const guestBuyerIndex = apiServices.data.guestsList.findIndex(guest => {
            return guest.id === productBuyerId;
        });
        const guestBuyerId = apiServices.data.guestsList[guestBuyerIndex].name;
        const product = new Product(productTitle, productPrice, productBuyerId, productBuyerName = guestBuyerId);
        this.data.productsList.push(product);
        return product;
    }

    // Delete guest/peoduct from list
    deleteItem(itemId, itemList) {
        // Find item index on corresponding list
        const itemToDeleteIndex = this.data[itemList].findIndex(item => {
            return item.id === itemId;
        });
        // Removing item depending on item id
        this.data[itemList].splice(itemToDeleteIndex, 1);
        // Removing products depending on user id
        if (itemList === 'guestsList') {
            this.data.productsList = this.data.productsList.filter(product => {
                return product.productBuyerId !== itemId;
            });
        }
    }

    // Update guest expenses
    calcGuestExpenses(productPrice, productBuyerId) {
        // Find guest index on list
        const guestExpenceToUpdate = this.data.guestsList.findIndex(guest => {
            return guest.id === productBuyerId;
        });
        this.data.guestsList[guestExpenceToUpdate].expenses += productPrice;
    }

    calcDebt() {
        this.data.productsList.forEach(product => {
            this.globalDebt(product.productPrice, product.productBuyerId);
        });
    }

    globalDebt(productPrice, productBuyerId) {
        // Calc poprtion of product based on guest lebgth
        const productPricePortion = productPrice / this.data.guestsList.length;
        this.data.guestsList.forEach((guest, index, arr) => {
            // Get buyer
            const buyer = arr.find(buyer => buyer.id === productBuyerId);

            // Check if buyer own current guest money
            const buyerDebtToCurrentGuest = buyer.globalDebt[guest.id] === undefined ? 0 : buyer.globalDebt[guest.id];

            // Check if current guest is NOT the buyer
            if (guest.id !== productBuyerId) {
                // Check if current guest owns money to buyer
                let currentGuestDebtToBuyer = guest.globalDebt[productBuyerId] === undefined ? 0 : guest.globalDebt[productBuyerId];

                // Calc rest debt between buyer and current guest
                let restDebtBuyerCurrentGuest = (currentGuestDebtToBuyer + productPricePortion) - buyerDebtToCurrentGuest

                // Updating current guest object
                guest.globalDebt = {
                    ...guest.globalDebt,
                    balance: guest.globalDebt.balance === undefined ? restDebtBuyerCurrentGuest : guest.globalDebt.balance + restDebtBuyerCurrentGuest,
                    [productBuyerId]: restDebtBuyerCurrentGuest
                };

                // Updating buyer object
                buyer.globalDebt = {
                    ...buyer.globalDebt,
                    balance: 0,
                    [guest.id]: 0
                }
            }
        });
    }

    // funckingDebtFirst() {
    //     const poderesPorHeroeId = this.data.productsList.reduce((acc, product, index, productsArray) => {
    //         const guestsDebtors = productsArray.filter(buyer => {
    //             if (buyer.id !== product.productBuyerId) {
    //                 return buyer;
    //             }
    //         });
    //         console.log(guestsDebtors);
    //         if (acc[product.productBuyerId]) {
    //             acc[product.productBuyerId] = {
    //                 //...acc[product.productBuyerId],
    //                 // expenses: [product.productBuyerId] === [product.id] ? this.expenses + product.productPrice : this.expenses + product.productPrice / 3,
    //                 expenses: acc[product.productBuyerId].expenses + product.productPrice,
    //                 [productBuyerId]: product.productPrice / 3
    //             };
    //             // acc[product.id] = {
    //             //     expenses: product.productPrice,
    //             // };
    //         } else {
    //             acc[product.productBuyerId] = {
    //                 expenses: product.productPrice,
    //             };
    //         }
    //         return acc
    //     }, {})
    //     // console.log(poderesPorHeroeId);
    // }
}

const apiServices = new ApiServices();

export { apiServices };