let id = 0;

class Product {
    constructor(productTitle, productPrice, productBuyer) {
        this.id = ++id;
        this.productTitle = productTitle;
        this.productPrice = productPrice * 100;
        this.productBuyer = productBuyer;
    }
}

export { Product };