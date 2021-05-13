import { Guest } from '../Guest';

class ApiServices {
    constructor() {
        this.data = {
            usersList: [],
            productsList: [],
            summaryList: []
        }
    }

    // Add new user
    addUser(userName) {
        const user = new Guest(userName);
        this.data.usersList.push(user);
        return user;
    }

    // Delete user from list
    // deleteUser() {}
}

const apiServices = new ApiServices();

export { apiServices };