import { Guest } from './Guest';
import { Product } from './Product';
import { SummaryItem } from './SummaryItem';

class Model {
    constructor() {
        this.data = {
            usersList: [],
            productsList: [],
            summaryList: []
        }
    }

    // Add new user
    addUser(userName) {
        const user = new Guest(userName.toLowerCase());
        this.data.usersList.push(user);
    }

    // Delete user from list
    deleteUser() {}
};

const model = new Model();

export { model };