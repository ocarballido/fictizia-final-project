import { Model } from '../model/Model';
import { View } from '../views/View';

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

        // Load the data
        this.model.loadData()
            .then(() => {
                this.view.renderGuests(this.model.getGuests());
                this.view.renderProducts(this.model.getProducts());
            });
    }

    // addGuestHandler
    addGuestHandler(guestName) {
        this.model.addGuest(guestName)
            .then(guest => this.view.renderSingleGuest(guest));
    }

    // addProductHandler
    addProductHandler(productTitle, productPrice, productBuyerId) {
        this.model.addProduct(productTitle, productPrice, productBuyerId)
            .then(product => {

                this.view.renderSingleProduct(product);

                // Sum of prices
                /*this.sumOfProductPricesHandler();

                // Update guest expenses
                this.model.calcGuestExpenses(productPrice, productBuyerId);
                
                // Update guests debt
                // apiServices.globalDebt(productPrice, productBuyerId)
                // apiServices.calcDebt();
                apiServices.globalDebtBasedOnProduct();

                console.log(apiServices.data);*/

            });
    }

    // deleteGuestHandler
    deleteItemHandler(itemId, itemList) {

        const itemDeleted = () => {
            // Update delete item in view
            this.view.renderDeleteItem(itemId, itemList);
            // Call sumOfProductPricesHandler
            //this.sumOfProductPricesHandler();
        };

        if (itemList === 'guestsList') {
            this.model.deleteGuest(itemId)
                .then(() => itemDeleted())
        } else {
            this.model.deleteProduct(itemId)
                .then(() => itemDeleted())
        }
        
    }

    // Sum of prices
    sumOfProductPricesHandler() {
        /*const productSum = apiServices.data.productsList.reduce((acc, currentProduct) => {
            return (acc + currentProduct.productPrice);
        }, 0);
        this.view.renderSumOfProductPrices(productSum);*/
    }
}

const app = new Controller(new Model(), new View())

export { app };