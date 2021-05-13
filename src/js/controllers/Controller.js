import { Model } from '../model/Model';
import { View } from '../views/View';

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Binding view actions
        this.view.addUserAction(this.addUserHandler.bind(this));
    }

    // addUserHandler
    addUserHandler(userName) {
        const userAdded = this.model.addUser(userName);
        this.view.renderSingleUser(userAdded);
        // console.log(userAdded);
    }
}

const app = new Controller(new Model(), new View())

export { app };