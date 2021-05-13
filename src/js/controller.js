import Model from './model';
import View from './view';

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Binding view actions
        this.view.addUserAction(this.addUserHandler);
    }

    addUserHandler(userName) {
        console.log('yeah');
        this.model.addUser(userName);
    }
}

const app = new Controller(new Model(), new View())

export { app };