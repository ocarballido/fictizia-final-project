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
        // Find guest based on product id
        const guestBuyerIndex = apiServices.data.guestsList.findIndex(guest => {
            return guest.id === productBuyer;
        });
        const guestBuyerId = apiServices.data.guestsList[guestBuyerIndex].name;
        const productAdded = this.model.addProduct(productTitle, productPrice, productBuyer = guestBuyerId);
        this.view.renderSingleProduct(productAdded);
        console.log(apiServices.data);
    }

    // deleteGuestHandler
    deleteItemHandler(itemId, itemList) {
        this.model.deleteItem(itemId, itemList);
        this.view.renderDeleteItem(itemId, itemList);
    }
}

const app = new Controller(new Model(), new View())

export { app };