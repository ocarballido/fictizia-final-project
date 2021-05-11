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

// Test adding user
app.model.addUser('Oscar');
app.model.addUser('Pepe');

// Test adding product
app.model.addProduct('Ron', 10, 20, 'oscar');
// app.model.addProduct('Sal', 8, 12, 'Pepe');

console.log(app.model.data);

export { app };