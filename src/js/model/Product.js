class Product {
    constructor(productData) {
        this.id = productData.id;
        this.productTitle = productData.title;
        this.productPrice = productData.price;
        this.productBuyerId = productData.buyer;
    }
}

class ProductAssigned extends Product {
    constructor(productData, productBuyerName) {
        super(productData);
        this.productBuyerName = productBuyerName;
    }
}

export { Product, ProductAssigned };