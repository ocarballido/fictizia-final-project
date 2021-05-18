let id = 0;

class Product {
    constructor(productTitle, productPrice, productBuyerId, productBuyerName) {
        this.id = ++id;
        this.productTitle = productTitle;
        this.productPrice = productPrice;
        this.productBuyerId = productBuyerId;
        this.productBuyerName = productBuyerName;
    }
}

export { Product };