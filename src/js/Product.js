class Product {
    constructor(productTitle, productPrice, productBuyer) {
        this.productTitle = productTitle;
        this.productPrice = productPrice * 100;
        this.productBuyer = productBuyer;
    }
}

export { Product };