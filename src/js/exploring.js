const dataExample = {
    userList: [
        {
            name: 'Oscar',
            money: 22,
            status: 'positive'
        },
        {
            name: 'Chini',
            money: -22,
            status: 'negative'
        },
        // ...
    ],
    productList: [
        {
            productTitle: 'Havana Club',
            productEuro: 10,
            productCents: 40,
            productBuyer: 'Oscar'
        }
        // ...
    ],
    summayList: [
        {
            userDebtorName: 'Chini',
            userBeneficiaryName: 'Oscar',
            moneyDebt: 11
        }
        // ...
    ]
}

// Debo tener una class User:
class User {
    constructor(name, expenses = 0, status = 'pending', globalDebt = {}, realDebt = {}) {
        this.name = name
        this.expenses = expenses
        this.status = status
        this.globalDebt = globalDebt
        this.realDebt = realDebt
    }
    // Debe tener un getter getInitialLetter() para sacar la inicial del nombre (Para la UI)
}

// Debo tener una class Product:
class Product {
    constructor(productTitle, productEuro, productCents = 0, productBuyer) {
        this.productTitle = productTitle
        this.productEuro = productEuro
        this.productCents = productCents
        this.productBuyer = productBuyer
    }
    // Debe tener un getter para obtener el cálculo en céntimos del producto. Esto lo daremos formato del tipo 2,50 € mas adelante
}

// Debo tener una class SummaryItem:
class SummaryItem {
    constructor(userDebtorName, moneyDebt, userBeneficiaryName) {
        this.userDebtorName = userDebtorName
        this.moneyDebt = moneyDebt
        this.userBeneficiaryName = userBeneficiaryName
    }
}

// Debo tener una class UserList:
class UserList {
    constructor(userList) {
        this.userList = userList
    }
    // Debe tener un métoido para ordenar
    //      Primero: Deudores
    //      Segundo: Beneficiarios
}

// Debo tener una class ProductList:
class ProductList {
    constructor(productList) {
        this.productList = productList
    }
    // Debe tener un getter getTotal() para obtener el total de gastos en productos
}

// Debo tener una class SummeyList:
class SummeyList {
    constructor(summayList) {
        this.summayList = summayList
    }
    // Debe tener un métoido para ordenar
    //      De mayor cantidad de deuda a menor
}

// De tener una class que manejara el modelo de datos
class DataModel {
    constructor() {
        this.userList = []
        this.productList = []
        this.summayList = []
    }
    // Debe tener un métoido addUser() --> Añadir usuario
    // Debe tener un métoido deleteUser() --> Eliminar usuario
    // Debe tener un métoido addProduct() --> Añadir producto
    // Debe tener un métoido deleteProduct() --> Eliminar producto
    // Debe tener un método para sobreescribir en localStorage updateStorage()
    // Debe tener un métoido calcDebtPerUser() --> Añadir calcular el saldo de cada usuario.
    //      Basado en la cantidad que cueste el producto
    //      Basado en la cantidad de usuarios
    //      Mantiene actualizado el objeto realDebt de cada usuario
    // Debe tener un métido para hacer un toggle del status del usuario (positive/negative)
    // Debe tener un métoido restart() --> Eliminar toda información y comenzar de nuevo
}

const test = {
    oscar: {
        expenses: 100,
        globalDebt: {
            toPepe: 10,
            toChini: 5,
            toBolo: 3,
            toPaco: 1
        },
        realDebt: {
            toPepe: 0,          // Me debe --> No le pago
            toChini: 0,         // Me debe --> No le pago
            toBolo: 0,          // Me debe --> No le pago
            toPaco: 0           // Me debe --> No le pago
        }
    },
    pepe: {
        expenses: 50,
        globalDebt: {
            toOscar: 20,
            toChini: 5,
            toBolo: 3,
            toPaco: 1
        },
        realDebt: {
            toOscar: 10,        // Le debo --> 20 - 10 = 10
            toChini: 15,        // Me debe --> No le pago
            toBolo: 3,          // Me debe --> No le pago
            toPaco: 3           // Me debe --> No le pago
        }
    },
    chini: {
        expenses: 25,
        globalDebt: {
            toOscar: 20,
            toPepe: 10,
            toBolo: 3,
            toPaco: 1
        },
        realDebt: {
            toOscar: 15,        // Le debo --> 20 - 5 = 15
            toPepe: 5,          // Le debo --> 10 - 5 = 5
            toBolo: 3,          // Me debe --> No le pago
            toPaco: 3           // Me debe --> No le pago
        }
    },
    bolo: {
        expenses: 15,
        globalDebt: {
            toOscar: 20,
            toPepe: 10,
            toChini: 5,
            toPaco: 1
        },
        realDebt: {
            toOscar: 17,        // Le debo --> 20 - 3 = 17
            toPepe: 7,          // Le debo --> 10 - 3 = 7
            toChini: 2,         // Le debo --> 5 - 3 = 2
            toPaco: 3           // Me debe --> No le pago
        }
    },
    paco: {
        expenses: 5,
        globalDebt: {
            toOscar: 20,
            toPepe: 10,
            toChini: 5,
            toBolo: 3,
        },
        realDebt: {
            toOscar: 19,        // Le debo --> 20 - 1 = 19
            toPepe: 9,          // Le debo --> 10 - 1 = 9
            toChini: 4,         // Le debo --> 5 - 1 = 4
            toBolo: 2,          // Le debo --> 3 - 1 = 2
        }
    },
}