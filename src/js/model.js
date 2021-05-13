class IdGenerator {
    constructor() {
        this.id = IdGenerator.getID();
    }
    static getID() {
        return (Date.now() + Math.random()).toString(36);
    }
}

class UserTwo extends IdGenerator {
    constructor(name, expenses = 0) {
        super();
        this.name = name;
        // this.money = money
        this.expenses = expenses;
        // this.status = status
        this.globalDebt = {};
        this.realDebt = {};
    }
    // Get initial letter
    getInitialLetter() {
        return this.name[0].toUppercase();
    }
}

class User {
    constructor(name, expenses = 0) {
        this.name = name;
        // this.money = money
        this.expenses = expenses;
        // this.status = status
        this.globalDebt = {};
        this.realDebt = {};
    }
    // Get initial letter
    getInitialLetter() {
        return this.name[0].toUppercase();
    }
}

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
        const user = new User(userName.toLowerCase());
        user.id = ++this.data.lastUserId;
        this.data.usersList.push(user);
    }

    // Delete user from list
    deleteUser() {}

    // Add new product
    addProduct(productTitle, productEuro, productBuyer) {
        const product = new Product(productTitle, productEuro, productBuyer);
        this.data.productsList.push(product);
        this.addUsersExpenses(product);
        // this.addUsersGlobalDebt(product);
        // this.addUsersReallDebt(product)
        this.globalDebt(product);
    }

    // Add each user expenses
    addUsersExpenses(product) {
        const userMatch = this.data.usersList.findIndex((user) => {
            return user.id === product.productBuyer;
        });
        this.data.usersList[userMatch].expenses += product.productPrizeCents;
    }

    globalDebt(product) {
        const id = product.productBuyer;
        const productBuyerIndex = this.data.usersList.findIndex((user) => {
            return user.id === id;
        });
        const productBuyer = this.data.usersList[productBuyerIndex];
        // const debtFromBuyer = this.data.usersList[productBuyerIndex]
        this.data.usersList.forEach((user, index) => {
            const currentUserID = user.id;
            const buyerDebtCurrentUser = productBuyer
            const temp = buyerDebtCurrentUser.globalDebt[currentUserID] || 0;
            if (user.id !== id) {                
                user.globalDebt = {
                    ...user.globalDebt,
                    // [id]: buyerDebtCurrentUser.globalDebt[currentUserID] === undefined ? product.productPrizeCents / this.data.usersList.length : (product.productPrizeCents / this.data.usersList.length) - buyerDebtCurrentUser.globalDebt[currentUserID],
                    [id]: (product.productPrizeCents / this.data.usersList.length) - temp
                }
                
                // console.log(currentUserID, buyerDebtCurrentUser, buyerDebtCurrentUser.globalDebt[currentUserID]);
                console.log(buyerDebtCurrentUser.globalDebt[currentUserID], temp);
            }
        });
        // console.log(productBuyer.globalDebt);
    }

    // Add each user global debt
    addUsersGlobalDebt(product) {
        this.data.usersList.forEach(user => {
            if (user.id !== product.productBuyer) {
                if (!user.globalDebt[product.productBuyer]) {
                    user.globalDebt = {
                        ...user.globalDebt,
                        [product.productBuyer]: product.productPrizeCents / this.data.usersList.length
                    }
                } else {
                    let debtValue = user.globalDebt[product.productBuyer]
                    user.globalDebt = {
                        ...user.globalDebt,
                        [product.productBuyer]: debtValue + product.productPrizeCents / this.data.usersList.length
                    }
                }

            }
        });
    }

    // Add each user real debt
    // addUsersReallDebt(product) {
    //     this.data.usersList.reduce((acc, actualUser) => {
    //         if (actualUser.globalDebt.hasOwnProperty(acc.name)) {
    //             console.log('yes')
    //         }
    //     });
    // }
    addUsersReallDebt(product) {
        // Get buyer ID, this way we can know the buyr
        const productBuyerID = product.productBuyer;
        // Find buyer index
        const productBuyer = this.data.usersList.findIndex((user) => {
            return user.id === productBuyerID;
        });
        // Get debt portion per user
        const debtPortionPerUser = product.productPrizeCents / this.data.usersList.length;
        this.data.usersList.forEach((user, index) => {

            const currentUser = user.id;
            const debtToBuyer = user.globalDebt[productBuyerID]
            const productBuyerIndex = this.data.usersList.findIndex((user) => {
                return user.id === productBuyerID;
            });
            const debtFromBuyer = this.data.usersList[productBuyerIndex]

            let debtFromBuyerTwo = user.globalDebt;
            console.log(debtFromBuyerTwo);

            if (user.globalDebt.hasOwnProperty(productBuyerID)) {
                // if (user.globalDebt[productBuyerID] < this.data.usersList[productBuyer].globalDebt[user.id]) {
                //     user.realDebt = {
                //         ...user.realDebt,
                //         [productBuyerID]: 0
                //     }
                // } else {
                //     user.realDebt = {
                //         ...user.realDebt,
                //         [productBuyerID]: user.globalDebt[productBuyerID] - this.data.usersList[productBuyer].globalDebt[user.id]
                //     }
                //     console.log(this.data.usersList[productBuyer].globalDebt[productBuyerID], user.globalDebt[productBuyerID])
                // }

                console.log('exist', currentUser, debtToBuyer, productBuyerIndex, debtFromBuyer);
                // console.log(currentUser);
            }
        });
    }

    // Delete product from list
    deleteProduct() {}

    // Order usersList
    orderUsersList() {
        this.usersList.sort((a, b) => {
            return (a.status === b.status)? 0 : b? -1 : 1;
        });
    }

    // Calculate (This is the chicken of the chicken with rice)
    calcDebtPerUser() {
        const users = this.data.usersList;
        this.data.productsList.forEach(product => {
            let productBuyer = product.productBuyer.toLowerCase();
            let productPize = product.productPrizeCents;
            // console.log(product);
            for (const user of users) {
                if (!user.name.toLowerCase() === productBuyer) {
                    // user.expenses += productPize;
                    // console.log(user, user.name, productBuyer, user.expenses);
                    // console.log(productBuyer, user);
                    user.globalDebt = {
                        ...user.globalDebt,
                        [product.productBuyer]: product.productPrizeCents / users.length
                    }
                }
            }
        });
    }

    // Update data in localStorage
    updateStorage() {}

    // Toggle user status (positive/negative)
    toggleStatus() {}

    // Restart app
    restart() {}
};

const model = new Model();

export { model, UserTwo };