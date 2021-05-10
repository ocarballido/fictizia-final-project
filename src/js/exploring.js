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
    constructor(name, money = 0, status = 'pending') {
        this.name = name
        this.money = money
        this.status = status
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
    // Debe tener un métido para hacer un toggle del status del usuario (positive/negative)
    // Debe tener un métoido restart() --> Eliminar toda información y comenzar de nuevo
}