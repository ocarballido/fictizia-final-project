const Guest = (function () {
    let id = 0;
    return class Guest {
        constructor(name, expenses = 0, globalDebt = {}, realDebt = {}) {
            this.id = ++id;
            this.name = name;
            this.expenses = expenses;
            this.globalDebt = globalDebt;
            this.realDebt = realDebt;
        }
        // Get initial letter
        getInitialLetter() {
            return this.name[0].toUppercase();
        }
    }
})();

class Product {
    constructor(productTitle, productEuro, productBuyer) {
        this.productTitle = productTitle;
        this.productEuro = productEuro;
        this.productBuyer = productBuyer;
        this.productPrizeCents = this.productEuro * 100;
    }
}

class SummaryItem {
    constructor(userDebtorName, moneyDebt, userBeneficiaryName) {
        this.userDebtorName = userDebtorName;
        this.moneyDebt = moneyDebt;
        this.userBeneficiaryName = userBeneficiaryName;
    }
}

// De tener una class que manejara el modelo de datos
class Model {
    constructor() {
        this.data = {
            lastUserId: 0,
            usersList: [],
            productsList: [],
            summaryList: []
        }
    }

    // Add new user
    addUser(userName) {
        const user = new Guest(userName.toLowerCase());
        user.id = ++this.data.lastUserId;
        this.data.usersList.push(user);
    }

    // Delete user from list
    deleteUser() {}
};

const model = new Model();

export { model };