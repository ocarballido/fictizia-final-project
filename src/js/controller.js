import {model} from './model';
import {view} from './view';

class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view
    }
}

const app = new Controller(model, view)

// Test adding user
app.model.addUser('Oscar');
app.model.addUser('Pepe');
app.model.addUser('chini');
app.model.addUser('bolo');
app.model.addUser('paco');

// Test adding product
app.model.addProduct('Ron', 1, 0, 1);
app.model.addProduct('Sal', 0.5, 0, 2);
app.model.addProduct('Sal', 0.25, 0, 3);
app.model.addProduct('Sal', 0.15, 0, 4);
app.model.addProduct('Sal', 0.05, 0, 5);

console.log(app.model.data);

export { app };