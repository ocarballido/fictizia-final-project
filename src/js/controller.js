import {model} from './model';
import {view} from './view';

class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view
    }
    testing() {
        this.model.testModel()
        this.view.testView()
    }
}

const app = new Controller(model, view)

app.testing();

export { app };