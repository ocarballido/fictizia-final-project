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
        this.view.deleteGuestAction(this.deleteGuestHandler.bind(this));
        // Binding view addProduct action
        this.view.addProductAction(this.addProductHandler.bind(this));
    }

    // addGuestHandler
    addGuestHandler(guestName) {
        const guestAdded = this.model.addGuest(guestName);
        this.view.renderSingleGuest(guestAdded);
        // console.log(guestAdded);
        console.log(apiServices.data);
    }

    // deleteGuestHandler
    deleteGuestHandler(guestId) {
        const guestToDelete = this.model.deleteGuest(guestId);
        this.view.renderDeleteGuest(guestId);
    }

    // addProductHandler
    addProductHandler(productTitle, productPrice, productBuyer) {
        const productAdded = this.model.addProduct(productTitle, productPrice, productBuyer);
        // this.view.renderSingleGuest(productAdded);
        console.log(productAdded);
    }
}

const app = new Controller(new Model(), new View())

export { app };