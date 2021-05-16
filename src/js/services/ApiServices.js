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
    addProduct(productTitle, productPrice, productBuyer) {
        // Find guest based on productBuyer
        const guestBuyerIndex = apiServices.data.guestsList.findIndex(guest => {
            return guest.id === productBuyer;
        });
        const guestBuyerId = apiServices.data.guestsList[guestBuyerIndex].name;
        const product = new Product(productTitle, productPrice, productBuyer = guestBuyerId);
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
        // Removing item from corresponding list
        this.data[itemList].splice(itemToDeleteIndex, 1);
        if (itemList === 'guestsList') {
            this.data.productsList.splice(itemToDeleteIndex, 1);
        }
    }

    // Test
    test(productPrice, productBuyer) {
        let productPricePortion = productPrice / this.data.guestsList.length;

        let debt = {};

        // Find buyer guest index
        // const guestBuyerIndex = this.data.guestsList.findIndex(guest => guest.id === productBuyer);

        // const totalBebt = this.data.guestsList.forEach((guest, index) => {
        //     if (guest.id !== productBuyer) {
        //         if (!guest.globalDebt[productBuyer]) {
        //             guest.globalDebt = {
        //                 ...guest.globalDebt,
        //                 [productBuyer]: productPricePortion
        //             };
        //         } else {
        //             let debtValue = guest.globalDebt[productBuyer]
        //             guest.globalDebt = {
        //                 ...guest.globalDebt,
        //                 [productBuyer]: debtValue + productPricePortion
        //             };
        //         }
        //     }
        // });

        // const testTotalBebt = this.data.guestsList.forEach((guest, index) => {
        //     if (guest.id !== productBuyer) {
        //         if (!debt[productBuyer]) {
        //             return {
        //                 ...debt,
        //                 [guest.id]: {
        //                     [productBuyer]: productPricePortion,
        //                 }
        //             };
        //         } else {
        //             let debtValue = guest.globalDebt[productBuyer]
        //             return {
        //                 ...debt,
        //                 [guest.id]: {
        //                     [productBuyer]: debtValue + productPricePortion,
        //                 }
        //             };
        //         }
        //     }
        // });

        // console.log(product.id);
        // console.log(product.productTitle);
        // console.log(product.productPrice);
        // console.log(product.productBuyer);
        // console.log(productPricePortion);
    }
}

const apiServices = new ApiServices();

export { apiServices };