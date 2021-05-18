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

    // Delete guest from list
    // deleteGuest(guestId) {
    //     const guestToDeleteIndex = this.data.guestsList.findIndex(guest => {
    //         return guest.id === guestId;
    //     });
    //     this.data.guestsList.splice(guestToDeleteIndex, 1);
    // }

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

    // Delete product from list
    // deleteProduct(productId) {
    //     const productToDeleteIndex = this.data.productsList.findIndex(product => {
    //         return product.id === productId;
    //     });
    //     this.data.productsList.splice(guestToDeleteIndex, 1);
    // }

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
            // this.data.productsList = unique;
        }
    }

    // Test
    test(productPrice, productBuyer) {
        const numberOfGeusts = this.data.guestsList.length;
        const productPricePortion = productPrice / this.data.guestsList.length;
        const productBuyerGuest = this.data.guestsList.find(guest => {
            return guest.id === productBuyer;
        });

        const guestsDebtors = this.data.guestsList.filter(buyer => {
            if (buyer.id !== productBuyer) {
                return buyer;
            }
        });

        // const putaDeuda = this.data.productsList.forEach(product => {
        //     const productPortion = product.productPrice / numberOfGeusts;
        //     const productGuestBuyer = product.productBuyer;
            
        // });

        // const poderesPorHeroeId = this.data.productsList.reduce((acc, debt) => {
        //     if (acc[debt.heroe]) {
        //         acc[debt.heroe] = [...acc[debt.heroe], debt]
        //     } else {
        //         acc[debt.heroe] = [debt]
        //     }
        //     return acc
        // }, {})

        // guestsDebtors.forEach(guestDeptor => {
        //     debtObject = {
        //         [productBuyerGuest.id]: {
        //             [productBuyer]: 0
        //         },
        //         [productBuyer]: {
        //             [productBuyerGuest.id]: productPricePortion
        //         }
        //     };
        //     console.log(debtObject);
        // });
        // console.log(debtObject);

        // const totalBebt = this.data.guestsList.forEach((guest, index) => {
        //     if (guest.id !== productBuyer) {
        //         if (!guest.globalDebt[productBuyer]) {
        //             let buyerBebToMe = productPricePortion - productBuyerGuest.globalDebt[guest.id];
        //             if (isNaN(buyerBebToMe)) {
        //                 guest.globalDebt = {
        //                     ...guest.globalDebt,
        //                     [productBuyer]: productPricePortion
        //                 };
        //             } else if (buyerBebToMe < 0) {
        //                 // productBuyerGuest.globalDebt[guest.id] = 0;
        //                 guest.globalDebt = {
        //                     ...guest.globalDebt,
        //                     [productBuyer]: 0
        //                 };
        //             } else {
        //                 // productBuyerGuest.globalDebt[guest.id] = productBuyerGuest.globalDebt[guest.id] - productPricePortion;
        //                 guest.globalDebt = {
        //                     ...guest.globalDebt,
        //                     [productBuyer]: buyerBebToMe
        //                 };
        //             }
                    
        //         } else {
        //             let debtValue = guest.globalDebt[productBuyer];
        //             let buyerBebToMe = (debtValue + productPricePortion) - productBuyerGuest.globalDebt[guest.id];
        //             if (buyerBebToMe < 0) {
        //                 // productBuyerGuest.globalDebt[guest.id] = 0;
        //                 guest.globalDebt = {
        //                     ...guest.globalDebt,
        //                     [productBuyer]: 0
        //                 };
        //             } else {
        //                 // productBuyerGuest.globalDebt[guest.id] = productBuyerGuest.globalDebt[guest.id] - productPricePortion;
        //                 guest.globalDebt = {
        //                     ...guest.globalDebt,
        //                     [productBuyer]: buyerBebToMe
        //                 };
        //             }
        //         }
        //     }
        // });
    }
}

const apiServices = new ApiServices();

export { apiServices };