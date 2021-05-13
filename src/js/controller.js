import { model, UserTwo } from './model';
import { view } from './view';

class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view
    }
}

const app = new Controller(model, view)

// console.log(app.model.data);

export { app };