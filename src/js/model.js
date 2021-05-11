class User {
    constructor(name) {
        this.name = name
        // this.money = money
        // this.expenses = expenses
        // this.status = status
        // this.globalDebt = globalDebt
        // this.realDebt = realDebt
    }
    // Get initial letter
    getInitialLetter() {
        return this.name[0].toUppercase();
    }
    // getMoneyDebt() {
    //     return this.expenses
    // }
}

class Product {
    constructor(productTitle, productEuro, productCents = 0, productBuyer) {
        this.productTitle = productTitle
        this.productEuro = productEuro
        this.productCents = productCents
        this.productBuyer = productBuyer
    }
    // Get prize in cents
    get productPrizeCents() {
        return (this.productEuro * 100) + this.productCents;
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
        this.usersList = []
        this.productsList = []
        this.summaryList = []
    }

    // Testing
    testModel() {
        console.log('Testing model');
    }

    // Add new user
    addUser() {
        const user = new User(userName);
        user.
        this.userList.push(user);
    }

    // Delete user from list
    deleteUser() {}

    // Add new product
    addProduct() {}

    // Delete product from list
    deleteProduct() {}

    // Order userList
    orderUserList() {
        this.userList.sort((a, b) => {
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