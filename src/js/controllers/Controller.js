import { Model } from '../model/Model';
import { View } from '../views/View';
import { apiServices } from '../services/ApiServices';

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Binding view addGuest action
        this.view.addGuestAction(this.addGuestHandler.bind(this));

        // Binding view addProduct action
        this.view.addProductAction(this.addProductHandler.bind(this));

        // Binding view deleteItem action
        this.view.deleteItemAction(this.deleteItemHandler.bind(this));
    }

    // addGuestHandler
    addGuestHandler(guestName) {
        const guestAdded = this.model.addGuest(guestName);
        this.view.renderSingleGuest(guestAdded);
        console.log(apiServices.data);
    }

    // addProductHandler
    addProductHandler(productTitle, productPrice, productBuyerId) {
        const productAdded = this.model.addProduct(productTitle, productPrice, productBuyerId);
        this.view.renderSingleProduct(productAdded);

        // Sum of prices
        this.sumOfProductPricesHandler();

        // Update guest expenses
        this.model.calcGuestExpenses(productPrice, productBuyerId);
        
        // Update guests debt
        // apiServices.globalDebt(productPrice, productBuyerId)
        // apiServices.calcDebt();
        // apiServices.globalDebtBasedOnProduct();
        this.calcFuckingDebt();

        console.log(apiServices.data);
    }

    // deleteGuestHandler
    deleteItemHandler(itemId, itemList) {
        // Update model calcGuestExpenses
        const productDeleted = apiServices.data.productsList.find(product => product.id === itemId);
        this.model.calcGuestExpenses(-productDeleted.productPrice, productDeleted.productBuyerId);

        // Update delete item in model
        this.model.deleteItem(itemId, itemList);

        // Update delete item in view
        this.view.renderDeleteItem(itemId, itemList);

        // Call sumOfProductPricesHandler
        this.sumOfProductPricesHandler();
    }

    // Sum of prices
    sumOfProductPricesHandler() {
        const productSum = apiServices.data.productsList.reduce((acc, currentProduct) => {
            return (acc + currentProduct.productPrice);
        }, 0);
        this.view.renderSumOfProductPrices(productSum);
    }

    calcFuckingDebt() {
        const [guestsList, productsList] = this.model.calcFuckingDebt();

        const expensesByBuyer = productsList.reduce((obj, product) => {
            const buyerId = product.productBuyerId;
            obj[buyerId] = obj[buyerId] || 0;
            obj[buyerId] += product.productPrice
            return obj;
        }, {});

        const totalBuyers = guestsList.length;
        const shouldReceiveFromBuyers = guestsList.reduce((obj, buyer) => {
            const buyerId = buyer.id;
            obj[buyerId] = (expensesByBuyer[buyerId] || 0) / totalBuyers;
            return obj;
        }, {});

        const debts = guestsList.map((buyer) => {
            const buyerId = buyer.id;
            const debts = guestsList.reduce((obj, debtor) => {
                const debtorId = debtor.id;
                if (buyerId !== debtorId) {
                    const debt = shouldReceiveFromBuyers[debtorId] - shouldReceiveFromBuyers[buyerId];
                    obj[debtorId] = debt < 0
                        ? 0
                        : debt;
                }
                return obj;
            }, {});
            return {
                id: buyerId,
                debts
            };
        });
        console.log(debts);
    }
}

const app = new Controller(new Model(), new View())

export { app };