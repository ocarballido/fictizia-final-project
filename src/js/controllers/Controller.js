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

        // Binding view first app render
        this.view.firstAppRenderAction(this.firstAppRenderHandler.bind(this));
    }

    // First app render
    firstAppRenderHandler() {
        // const data = this.model.getDataFromLocalStogare();
        // const debtObject = this.model.calcFuckingDebt();

        // data.guestsList.forEach(guest => {
        //     this.view.renderSingleGuest(guest, debtObject);
        // });

        // data.productsList.forEach(product => {
        //     this.view.renderSingleProduct(product, debtObject);
        // });

        // this.getDebtsObject(debtObject);

        // this.sumOfProductPricesHandler();

        // data.productsList.forEach(product => {
        //     this.view.renderSingleProduct(product, debtObject);
        // });renderSummaryItem
    }


    // addGuestHandler
    addGuestHandler(guestName) {
        const guestAdded = this.model.addGuest(guestName);
        // Get debt object from model
        const debtObject = this.model.calcFuckingDebt();
        this.view.renderSingleGuest(guestAdded, debtObject);

        console.log(apiServices.data);
    }

    // addProductHandler
    addProductHandler(productTitle, productPrice, productBuyerId) {
        // AddProduct model
        const productAdded = this.model.addProduct(productTitle, productPrice, productBuyerId);

        // Get debt object from model
        const debtObject = this.model.calcFuckingDebt();

        // Render product view
        this.view.renderSingleProduct(productAdded, debtObject);

        // Sum of prices
        this.sumOfProductPricesHandler();

        // Update summary
        this.getDebtsObject(debtObject);

        console.log(apiServices.data);
    }

    // deleteGuestHandler
    deleteItemHandler(itemId, itemList) {
        // Update delete item in model
        this.model.deleteItem(itemId, itemList);

        // Call sumOfProductPricesHandler
        this.sumOfProductPricesHandler();

        // Get debt object from model
        const debtObject = this.model.calcFuckingDebt();

        // Update delete item in view
        this.view.renderDeleteItem(itemId, itemList, debtObject);

        // Update summary
        this.getDebtsObject(debtObject);
    }

    // Sum of prices
    sumOfProductPricesHandler() {
        const productSum = this.model.sumOfProductPrices();
        this.view.renderSumOfProductPrices(productSum);
    }

    getDebtsObject(debtCalc) {
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
        this.model.clearData();
        this.view.renderReStartApp();
    }
}

const app = new Controller(new Model(), new View())

export { app };