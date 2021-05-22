import Handlebars from 'handlebars';
import * as Templates from './templates';

class View {
    constructor() {
        // All
        this.allLists = document.querySelector('#allLists');

        // Guests elements
        this.guestListUl = document.querySelector('#guestsList');
        this.addGuestForm = document.querySelector('#addGuestForm');
        this.addGuestInput = document.querySelector('#addGuestInpu');
        this.addGuestButton = document.querySelector('#addGuestButton');
        this.deleteGuestButton = document.querySelector('.btn-remove-guest');

        // Products elements
        this.productListUl = document.querySelector('#productsList');
        this.addProductForm = document.querySelector('#productsForm');
        this.addProductInputName = document.querySelector('#addProductInpu');
        this.addProductPrice = document.querySelector('#productPrizeInput');
        this.bindProductBuyer = document.querySelector('#bindProductBuyer');
        this.addProductButton = document.querySelector('#addProductButton');
        this.productsSumTotal = document.querySelector('#productsSumTotal');

        this.ulLists = document.querySelectorAll('ul');

        // Summary elements
        this.summaryListUl = document.querySelector('#summaryList');

        // Handlebars
        const guestTemplate = Templates.guestItemTemplate;
        const productTemplate = Templates.productItemTemplate;
        const buyerOptionTemplate = Templates.buyerOption;

        this.singleGuestTemplate = Handlebars.compile(guestTemplate);
        this.guestsListTemplate = Handlebars.compile(Templates.guestListTemplate);

        this.singleProductTemplate = Handlebars.compile(productTemplate);
        this.productsListTemplate = Handlebars.compile(Templates.productListTemplate);

        this.singleBuyerOption = Handlebars.compile(buyerOptionTemplate);
        this.buyersOptionsTemplate = Handlebars.compile(Templates.buyerOptions);

        Handlebars.registerHelper('guestInitial', function() {
            return this.name[0].toUpperCase();
        });

        Handlebars.registerHelper('displayPrice', function() {
            return this.price / 100;
        });

        Handlebars.registerPartial('guestRow', guestTemplate);
        Handlebars.registerPartial('productRow', productTemplate);
        Handlebars.registerPartial('buyerOption', buyerOptionTemplate);
        
    }

    renderGuests(guests) {
        const guestsMapped = guests.map(guest => ({
            ...guest,
            debt: '0',
            debtText: 'Saldo 0'
        }));
        this.guestListUl.innerHTML = this.guestsListTemplate({
            guests: guestsMapped
        });
        this.bindProductBuyer.insertAdjacentHTML(
            'beforeend',
            this.buyersOptionsTemplate({ guests })
        );
    }

    renderProducts(products) {
        this.productListUl.innerHTML = this.productsListTemplate({products});
    }

    // Render single guest
    renderSingleGuest(guest) {
        this.guestListUl.insertAdjacentHTML(
            'beforeend',
            this.singleGuestTemplate({
                ...guest,
                debt: '0',
                debtText: 'Saldo 0'
            })
        );

        // Adding option to add producto select buyer
        this.bindProductBuyer.insertAdjacentHTML(
            'beforeend',
            this.singleBuyerOption({...guest})
        );
    }

    // Render single product
    renderSingleProduct(product) {
        this.productListUl.insertAdjacentHTML(
            'beforeend',
            this.singleProductTemplate({...product})
        );
    }

    // addGuest action
    addGuestAction(handler) {
        this.addGuestForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = event.target.elements.guestName.value.trim();
            if (name.length > 0) {
                handler(name);
                event.target.elements.guestName.value = '';
                this.addProductForm.classList.remove("was-validated");
            }
        });
    }

    // addProduct action
    addProductAction(handler) {
        this.addProductForm.addEventListener('submit', (event) => {
            event.preventDefault();

            // Declare const to pass the handler
            const productValues = [];
            
            // Declare product title
            const title = this.addProductInputName.value.trim();

            // Declare product price
            const price = parseInt(this.addProductPrice.value * 100);

            // Declare product buyer id
            const buyer = parseInt(this.bindProductBuyer.value);

            // Form validation
            if (title === '' || price === '' || (buyer === '' || isNaN(buyer))) {
                event.stopPropagation()
                this.addProductForm.classList.add('was-validated');
            } else {
                this.addProductForm.classList.remove('was-validated');
                this.addProductInputName.value = '';
                this.addProductPrice.value = '';
                this.bindProductBuyer.value = '';

                // Call handler
                handler(title, price, buyer);
            }
        });
    }

    // Delete item action
    deleteItemAction(handler) {
        this.allLists.addEventListener('click', (event) => {
            const element = event.target;
            const classes = element.classList;
            const isDeletButton = (
                classes.contains('btn-remove-guest') ||
                classes.contains('bi') ||
                classes.contains('btn-deleteProduct')
            );
            if (isDeletButton) {
                const itemId = +event.target.closest('li').dataset.id;
                const itemList = event.target.closest('ul').id;
                handler(itemId, itemList);
            }
        });
    }

    // Render delete item
    renderDeleteItem(itemId, itemList) {
        if (itemList === this.guestListUl.id || itemList === this.productListUl.id) {
            const itemToDelete = document.querySelector(`#${itemList} [data-id="${itemId}"]`);
            itemToDelete.remove();
            
            if (itemList === 'guestsList') {
                // Removing option to add producto select buyer
                const option = this.bindProductBuyer.querySelector(`option[value="${itemId}"]`);
                option.remove();
                // .querySelectorAll(`[data-id="${itemId}"]`)

                // Removing product from product list
                this.productListUl.querySelectorAll(`[data-userid="${itemId}"]`).forEach(el => el.remove());
            }
        }
    }

    // Render calc sum of all producto price
    renderSumOfProductPrices(productSum) {
        this.productsSumTotal.lastElementChild.innerHTML = productSum / 100;
        this.productsSumTotal.classList.toggle('d-none', productSum <= 0);
        // if (productSum > 0) {
        //     this.productsSumTotal.classList.remove('d-none');
        // } else {
        //     this.productsSumTotal.classList.add('d-none');
        // }
    }
};

export { View };