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

    // Test
    // test(productPrice, productBuyerId) {
    //     // const numberOfGeusts = this.data.guestsList.length;
    //     const productPricePortion = productPrice / this.data.guestsList.length;
    //     // const productBuyerIdGuest = this.data.guestsList.find(guest => {
    //     //     return guest.id === productBuyerId;
    //     // });

    //     // const guestsDebtors = this.data.guestsList.filter(buyer => {
    //     //     if (buyer.id !== productBuyerId) {
    //     //         return buyer;
    //     //     }
    //     // });

    //     // const putaDeuda = this.data.productsList.forEach(product => {
    //     //     const productPortion = product.productPrice / numberOfGeusts;
    //     //     const productGuestBuyer = product.productBuyerId;
            
    //     // });

    //     const globalDebt = this.data.guestsList.forEach((guest) => {
    //         if (guest.id !== productBuyerId) {
    //             if (!guest.globalDebt[productBuyerId]) {
    //                 guest.globalDebt = {
    //                     ...guest.globalDebt,
    //                     [productBuyerId]: productPricePortion
    //                 };
    //             } else {
    //                 let debtValue = guest.globalDebt[productBuyerId];
    //                 guest.globalDebt = {
    //                     ...guest.globalDebt,
    //                     [productBuyerId]: debtValue + productPricePortion
    //                 };
    //             }
    //         }
    //     });
    // }

    // globalDebt(productPrice, productBuyerId) {
    //     const productPricePortion = productPrice / this.data.guestsList.length;
    //     this.data.guestsList.forEach((guest) => {
    //         if (guest.id !== productBuyerId) {
    //             if (!guest.globalDebt[productBuyerId]) {
    //                 guest.globalDebt = {
    //                     ...guest.globalDebt,
    //                     [productBuyerId]: productPricePortion
    //                 };
    //             } else {
    //                 let debtValue = guest.globalDebt[productBuyerId];
    //                 guest.globalDebt = {
    //                     ...guest.globalDebt,
    //                     [productBuyerId]: debtValue + productPricePortion
    //                 };
    //             }
    //         }
    //     });
    // }

    // funckingDebt(productBuyerId) {
    //     const poderesPorHeroeId = this.data.productsList.reduce((acc, product, index) => {
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
    //     console.log(poderesPorHeroeId);
    // }

    // funckingDebtFirst(productBuyerId) {
    //     const poderesPorHeroeId = this.data.productsList.reduce((acc, product) => {
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
    //     console.log(poderesPorHeroeId);
    // }
}

const apiServices = new ApiServices();

export { apiServices };