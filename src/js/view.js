import { Model } from "./model";

class View {
    constructor() {
        // this.users = this.document.querySelector('#usersList');
    }

    // Testing
    testView () {
        console.log('Testing view');
    }

    // get element from the DOM
    getDomElement (selector) {
        const element = document.querySelector(selector);
        return element;
    }
};

const view = new View();

export { view };