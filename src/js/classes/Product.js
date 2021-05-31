import { IdGenerator } from './IdGenerator';

class Product extends IdGenerator {
    constructor(productTitle, productPrice, productBuyerId, productBuyerName) {
        super();
        this.productTitle = productTitle;
        this.productPrice = productPrice;
        this.productBuyerId = productBuyerId;
        this.productBuyerName = productBuyerName;
    }
}

export { Product };