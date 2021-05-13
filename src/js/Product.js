class Product {
    constructor(productTitle, productEuro, productBuyer) {
        this.productTitle = productTitle;
        this.productEuro = productEuro;
        this.productBuyer = productBuyer;
        this.productPrizeCents = this.productEuro * 100;
    }
}

export { Product };