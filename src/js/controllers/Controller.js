import { Model } from '../model/Model';
import { View } from '../views/View';
import { apiServices } from '../services/ApiServices';

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Binding view addGuest action
        this.view.addGuestAction(this.addGuestHandler.bind(this));

        // Binding view deleteGuest action
        // this.view.deleteGuestAction(this.deleteGuestHandler.bind(this));

        // Binding view addProduct action
        this.view.addProductAction(this.addProductHandler.bind(this));

        // Binding view deleteItem action
        this.view.deleteItemAction(this.deleteItemHandler.bind(this));
    }

    // addGuestHandler
    addGuestHandler(guestName) {
        const guestAdded = this.model.addGuest(guestName);
        this.view.renderSingleGuest(guestAdded);
        console.log(apiServices.data);
    }

    // deleteGuestHandler
    // deleteGuestHandler(guestId) {
    //     this.model.deleteGuest(guestId);
    //     this.view.renderDeleteGuest(guestId);
    // }

    // addProductHandler
    addProductHandler(productTitle, productPrice, productBuyer) {
        const productAdded = this.model.addProduct(productTitle, productPrice, productBuyer);
        this.view.renderSingleProduct(productAdded);

        // Sum of prices
        this.renderSumOfProductPricesHandler();
        
        // this.view.renderSumOfProductPrices(productSum);
        console.log(apiServices.data);
    }

    // deleteGuestHandler
    deleteItemHandler(itemId, itemList) {
        this.model.deleteItem(itemId, itemList);
        this.view.renderDeleteItem(itemId, itemList);
        this.renderSumOfProductPricesHandler();
    }

    // Sum of prices
    renderSumOfProductPricesHandler() {
        const productSum = apiServices.data.productsList.reduce((acc, currentProduct) => {
            return (acc + currentProduct.productPrice);
        }, 0);
        this.view.renderSumOfProductPrices(productSum);
    }
}

const app = new Controller(new Model(), new View())

export { app };