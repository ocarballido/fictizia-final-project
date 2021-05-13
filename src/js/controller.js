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
        this.model.addUser(userName);
        console.log('yeah');
    }
}

const app = new Controller(new Model(), new View())

// console.log(app.model.data);

export { app };