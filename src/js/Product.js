class Product {
    constructor(productTitle, productPrice, productBuyer, id) {
        this.productTitle = productTitle;
        this.productPrice = productPrice * 100;
        this.productBuyer = productBuyer;
        this.id = id;
    }
}

export { Product };