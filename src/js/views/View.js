class View {
    constructor() {
        // Guests elements
        this.guestListUl = document.querySelector('#guestsList');
        this.addGuestForm = document.querySelector('#addGuestForm');
        this.addGuestInput = document.querySelector('#addGuestInpu');
        this.addGuestButton = document.querySelector('#addGuestButton');
        this.deleteGuestButton = document.querySelector('.btn-remove-guest');
        this.singleGuestTemplate = document.querySelector('#guestItemTemplate').innerHTML;

        // Products elements
        this.productListUl = document.querySelector('#productsList');
        this.addProductForm = document.querySelector('#productsForm');
        this.addProductInputName = document.querySelector('#addProductInpu');
        this.addProductPrice = document.querySelector('#productPrizeInput');
        this.bindProductBuyer = document.querySelector('#bindProductBuyer');
        this.addProductButton = document.querySelector('#addProductButton');
        this.singleProductTemplate = document.querySelector('#productItemTemplate').innerHTML;

        // Summary elements
        this.summaryListUl = document.querySelector('#summaryList');
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

    // deleteGuest action
    deleteGuestAction(handler) {
        this.guestListUl.addEventListener('click', (event) => {
            event.preventDefault();
            const isDeletGuestButton = event.target.tagName.toLowerCase() === 'button' ||event.target.tagName.toLowerCase() === 'i';
            if (isDeletGuestButton) {
                const userId = event.target.closest('li').dataset.id;
                handler(userId);
            }
        });
    }

    // Render single guest
    renderSingleGuest(guest) {
        const guestText = this.singleGuestTemplate
            .replace('[[guestId]]', guest.id)
            .replace('[[guestName]]', guest.name)
            .replace('[[guestDedtText]]', 'Saldo 0')
            .replace('[[guestDept]]', '0')
            .replace('[[guestInitial]]', guest.getInitialLetter());
        this.guestListUl.innerHTML += guestText;

        // Adding option to add producto select nuyer
        const option = document.createElement("option");
        option.text = guest.name;
        option.value = guest.id;
        this.bindProductBuyer.add(option);
    }

    // Render single guest
    renderDeleteGuest(guestId) {
        const guestToDelete = document.querySelector(`[data-id="${guestId}"]`);
        guestToDelete.remove();

        // Removing option to add producto select nuyer
        this.bindProductBuyer.remove(guestId);
    }

    // addProduct action
    addProductAction(handler) {
        this.addProductForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const productValues = [];
            
            const productTitle = this.addProductInputName.value.trim();
            const productPrice = this.addProductPrice.value;
            const productBuyer = this.bindProductBuyer.options[this.bindProductBuyer.selectedIndex].text;
            const productId = this.bindProductBuyer.value;

            if (productTitle === '' || productPrice === '' || productBuyer === '') {
                event.stopPropagation()
                this.addProductForm.classList.add('was-validated');
            } else {
                this.addProductForm.classList.remove('was-validated');
                productValues.push(productTitle);
                productValues.push(productPrice);
                productValues.push(productBuyer);
                this.addProductInputName.value = '';
                this.addProductPrice.value = '';
                this.bindProductBuyer.value = '';
                console.log(productBuyer);
                handler(...productValues);
            }
        });
    }

    // Render single product
    renderSingleProduct(product) {
        const productText = this.singleProductTemplate
            .replace('[[productId]]', product.productBuyer)
            .replace('[[productTitle]]', product.productTitle)
            .replace('[[productBuyer]]', product.productBuyer)
            .replace('[[productPrice]]', product.productPrice)
        this.productListUl.innerHTML += productText;
    }
};

export { View };