class User {
    constructor(name, expenses = 0) {
        this.name = name
        // this.money = money
        this.expenses = expenses
        // this.status = status
        // this.globalDebt = globalDebt
        // this.realDebt = realDebt
    }
    // Get initial letter
    getInitialLetter() {
        return this.name[0].toUppercase();
    }
}

class Product {
    constructor(productTitle, productEuro, productCents = 0, productBuyer) {
        this.productTitle = productTitle
        this.productEuro = productEuro
        this.productCents = productCents
        this.productBuyer = productBuyer
        this.productPrizeCents = (this.productEuro * 100) + this.productCents;
    }
}

class SummaryItem {
    constructor(userDebtorName, moneyDebt, userBeneficiaryName) {
        this.userDebtorName = userDebtorName
        this.moneyDebt = moneyDebt
        this.userBeneficiaryName = userBeneficiaryName
    }
}

// De tener una class que manejara el modelo de datos
class Model {
    constructor() {
        this.data = {
            usersList: [],
            productsList: [],
            summaryList: []
        }
    }

    // Testing
    testModel() {
        console.log('Testing model');
    }

    // Add new user
    addUser(userName) {
        const user = new User(userName.toLowerCase());
        this.data.usersList.push(user);
    }

    // Delete user from list
    deleteUser() {}

    // Add new product
    addProduct(productTitle, productEuro, productCents, productBuyer) {
        const product = new Product(productTitle, productEuro, productCents, productBuyer);
        this.data.productsList.push(product);
        const userMatch = this.data.usersList.findIndex((user) => {
            return user.name === productBuyer.toLowerCase();
        });
        this.data.usersList[userMatch].expenses = product.productPrizeCents;
    }

    // Delete product from list
    deleteProduct() {}

    // Order usersList
    orderUsersList() {
        this.usersList.sort((a, b) => {
            return (a.status === b.status)? 0 : b? -1 : 1;
        });
    }

    // Update data in localStorage
    updateStorage() {}

    // Calculate (This is the chicken of the chicken with rice)
    calcDebtPerUser() {}

    // Toggle user status (positive/negative)
    toggleStatus() {}

    // Restart app
    restart() {}
};

const model = new Model();

export { model };