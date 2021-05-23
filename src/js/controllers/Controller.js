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

        // Binding view restart app action
        this.view.reStartAppAction(this.reStartAppHandler.bind(this));
    }

    // addGuestHandler
    addGuestHandler(guestName) {
        // Render
        const guestAdded = this.model.addGuest(guestName);
        this.view.renderSingleGuest(guestAdded, this.calcFuckingDebt());

        // Update guests debt
        this.calcFuckingDebt();

        // Update summary
        this.getDebtor(this.calcFuckingDebt());

        console.log(apiServices.data);
    }

    // addProductHandler
    addProductHandler(productTitle, productPrice, productBuyerId) {
        // AddProduct model
        const productAdded = this.model.addProduct(productTitle, productPrice, productBuyerId);

        // Render product view
        this.view.renderSingleProduct(productAdded, this.calcFuckingDebt());

        // Sum of prices
        this.sumOfProductPricesHandler();
        
        // Update guests debt
        this.calcFuckingDebt();

        // Update summary
        this.getDebtor(this.calcFuckingDebt());

        console.log(apiServices.data);
    }

    // deleteGuestHandler
    deleteItemHandler(itemId, itemList) {
        // Update delete item in model
        this.model.deleteItem(itemId, itemList);

        // Update delete item in view
        this.view.renderDeleteItem(itemId, itemList, this.calcFuckingDebt());

        // Call sumOfProductPricesHandler
        this.sumOfProductPricesHandler();

        // Update guests debt
        this.calcFuckingDebt();

        // Update summary
        this.getDebtor(this.calcFuckingDebt());
    }

    // Sum of prices
    sumOfProductPricesHandler() {
        const productsList = this.model.sumOfProductPrices();
        const productSum = productsList.reduce((acc, currentProduct) => {
            return (acc + currentProduct.productPrice);
        }, 0);
        this.view.renderSumOfProductPrices(productSum);
    }

    // Calculate the fucking debt
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
            const buyerName = guestsList.find(debtor => debtor.id === buyerId);
            let debtsSum = 0;
            const debts = guestsList.reduce((obj, debtor) => {
                const debtorId = debtor.id;
                if (buyerId !== debtorId) {
                    const debt = shouldReceiveFromBuyers[debtorId] - shouldReceiveFromBuyers[buyerId];
                    const debtorName = guestsList.find(debtor => debtor.id === debtorId);
                    if (debt > 0) {
                        obj[debtorName.name] = debt;
                        debtsSum = (debtsSum || 0) + obj[debtorName.name];
                    }
                    // obj[debtorName.name] = debt < 0
                    //     ? 0
                    //     : debt;
                    // debtsSum = (debtsSum || 0) + obj[debtorName.name];
                }
                return obj;
            }, {});

            return {
                id: buyerId,
                name: buyerName.name,
                debts,
                debtsSum,
            };
        });
        // console.log(debts);

        return debts;
    }

    getDebtor(debtCalc) {
        const guestsList = this.model.updateSummaryItem();

        const summaryArr = debtCalc.filter(debtor => {
            return debtor.debtsSum > 0;
        });

        this.view.clearSummary();

        summaryArr.forEach(debtor => {
            for (const debt in debtor.debts) {
                this.view.renderSummaryItem(debtor.name, debt, debtor.debts[debt]);
            }
        });
    }

    reStartAppHandler() {
        // const [guestsList, productsList] = this.model.renderReStartApp();
        this.model.clearData();
        this.view.renderReStartApp();
        this.calcFuckingDebt();
    }
}

const app = new Controller(new Model(), new View())

export { app };