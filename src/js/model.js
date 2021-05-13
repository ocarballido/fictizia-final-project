import { Guest } from './Guest';

export default class Model {
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