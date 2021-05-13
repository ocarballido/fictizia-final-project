import { apiServices } from '../services/ApiServices';

class Model {
    // Add new user
    addUser(userName) {
        return apiServices.addUser(userName);
    }

    // Delete user from list
    // deleteUser() {}
};

export { Model };