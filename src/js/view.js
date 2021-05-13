import { Model } from "./model";

class View {
    constructor() {
        // Guests elements
        this.guestListUl = this.getDomElement('#usersList');
        this.addGuestForm = this.getDomElement('#addUserForm');
        this.addGuestInput = this.getDomElement('#addUserInpu');
        this.addGuestButton = this.getDomElement('#addUserButton');

        // Products elements
        this.productListUl = this.getDomElement('#productsList');
        this.addProductForm = this.getDomElement('#productsForm');
        this.addProductInputName = this.getDomElement('#addProductInpu');
        this.addProductPrice = this.getDomElement('#productPrizeEuroInpu');
        this.bindProductBuyer = this.getDomElement('#bindProductBuyer');
        this.addProductButton = this.getDomElement('#addProductButton');

        // Summary elements
        this.summaryListUl = this.getDomElement('#summaryList');
    }

    // get element from the DOM
    getDomElement (selector) {
        const element = document.querySelector(selector);
        return element;
    }
};

const view = new View();

export { view };