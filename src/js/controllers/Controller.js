import { Model } from '../model/Model';
import { View } from '../views/View';

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Binding view addGuest action
        this.view.addGuestAction(this.addGuestHandler.bind(this));
    }

    // addGuestHandler
    addGuestHandler(guestName) {
        const guestAdded = this.model.addGuest(guestName);
        this.view.renderSingleGuest(guestAdded);
        // console.log(guestAdded);
    }
}

const app = new Controller(new Model(), new View())

export { app };