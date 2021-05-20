import Handlebars from 'handlebars';

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
        this.singleProductTemplate = document.querySelector('#productItemTemplate').innerHTML;
        this.productsSumTotal = document.querySelector('#productsSumTotal');

        this.ulLists = document.querySelectorAll('ul');

        // Summary elements
        this.summaryListUl = document.querySelector('#summaryList');

        // Handlebars templates
        this.singleGuestTemplate = Handlebars.compile(
            document.querySelector('#guestItemTemplate').innerHTML
        );
        this.singleProductTemplate = Handlebars.compile(
            document.querySelector('#productItemTemplate').innerHTML
        );
    }

    // addGuest action
    addGuestAction(handler) {
        this.addGuestForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const guestName = event.target.elements.guestName.value.trim();
            if (guestName.length > 0) {
                handler(guestName);
                event.target.elements.guestName.value = '';
                this.addProductForm.classList.remove("was-validated");
            }
        });
    }

    // Render single guest
    renderSingleGuest(guest) {
        this.guestListUl.insertAdjacentHTML(
            'beforeend',
            this.singleGuestTemplate({
                guestId: guest.id,
                guestName: guest.name,
                guestDedtText: 'Saldo 0',
                guestDept: '0',
                guestInitial: guest.getInitialLetter()
            })
        );

        // Adding option to add producto select buyer
        const option = document.createElement("option");
        option.text = guest.name;
        option.value = guest.id;
        this.bindProductBuyer.add(option);
    }

    // addProduct action
    addProductAction(handler) {
        this.addProductForm.addEventListener('submit', (event) => {
            event.preventDefault();

            // Declare const to pass the handler
            const productValues = [];
            
            // Declare product title
            const productTitle = this.addProductInputName.value.trim();

            // Declare product price
            const productPrice = parseInt(this.addProductPrice.value * 100);

            // Declare product buyer id
            const productBuyerId = parseInt(this.bindProductBuyer.value);

            // Form validation
            if (productTitle === '' || productPrice === '' || (productBuyerId === '' || isNaN(productBuyerId))) {
                event.stopPropagation()
                this.addProductForm.classList.add('was-validated');
            } else {
                this.addProductForm.classList.remove('was-validated');
                this.addProductInputName.value = '';
                this.addProductPrice.value = '';
                this.bindProductBuyer.value = '';

                // Call handler
                handler(productTitle, productPrice, productBuyerId);
            }
        });
    }

    // Render single product
    renderSingleProduct(product) {
        this.productListUl.insertAdjacentHTML(
            'beforeend',
            this.singleProductTemplate({
                productId: product.id,
                guestId: product.productBuyerId,
                productTitle: product.productTitle,
                productBuyer: product.productBuyerName,
                productPrice: product.productPrice / 100
            })
        );
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
                const itemId = parseInt(event.target.closest('li').dataset.id);
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