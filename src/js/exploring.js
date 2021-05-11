const dataExample = {
    userList: [
        {
            name: 'Oscar',
            money: 22,
            status: 'positive',
            expenses: 60,
            globalDebt: {
                chini: 11,
                // ...
            },
            realDebt: {
                chini: 0,
                // ...
            }
        },
        {
            name: 'Chini',
            money: -22,
            status: 'negative',
            expenses: 22,
            globalDebt: {
                oscar: 30,
                // ...
            },
            realDebt: {
                oscar: 22,
                // ...
            }
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
    summaryList: [
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
    constructor(name, expenses = 0) {
        this.name = name
        this.expenses = expenses
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
        this.productPrizeCents = (this.productEuro * 100) + this.productCents;
    }
}

// Debo tener una class SummaryItem:
class SummaryItem {
    constructor(userDebtorName, moneyDebt, userBeneficiaryName) {
        this.userDebtorName = userDebtorName
        this.moneyDebt = moneyDebt
        this.userBeneficiaryName = userBeneficiaryName
    }
}

// De tener una class que manejara el modelo de datos
class DataModel {
    constructor() {
        this.userList = []
        this.productList = []
        this.summaryList = []
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
    // Debe tener un métoido para ordenar
    //      Primero: Deudores
    //      Segundo: Beneficiarios
    // Debe tener un métido para hacer un toggle del status del usuario (positive/negative)
    // Debe tener un método getTotal() para obtener el total de gastos en productos
    // Debe tener un métoido orderSummary() para ordenar la lista de mayor deudor a menor
    //      De mayor cantidad de deuda a menor
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