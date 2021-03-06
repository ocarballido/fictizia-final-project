import Handlebars from 'handlebars';

class View {
    constructor() {
        // All
        this.allLists = document.querySelector('#allLists');

        // AlertsUI
        this.guestsAlert = document.getElementById('guestsAlert');
        this.productsAlert = document.getElementById('productsAlert');
        this.summaryAlert = document.getElementById('summaryAlert');

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

        // Controls
        this.controls = document.getElementById('controls');
        this.reStartApp = document.getElementById('reStartApp');

        // Summary elements
        this.summaryListUl = document.querySelector('#summaryList');

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
        this.singleSummaryTemplate = Handlebars.compile(
            document.querySelector('#summaryItemTemplate').innerHTML
        );
    }

    // First app render action
    firstAppRenderAction(handler) {
        document.addEventListener("DOMContentLoaded", (event) => {
            handler();

            this.sortGuest()
        });
    }

    // First app render action
    firstAppRender(data) {
        console.log(data);
    }

    // addGuest action
    addGuestAction(handler) {
        this.addGuestForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const guestName = event.target.elements.guestName.value.trim();

             // Form validation
            if (guestName === '') {
                event.stopPropagation()
                this.addGuestForm.classList.add('was-validated');
            } else {
                this.addProductForm.classList.remove("was-validated");
                this.addGuestForm.classList.remove('was-validated');
                this.addGuestInput.value = '';

                // Call handler
                handler(guestName);

                this.sortGuest()
            }
        });
    }

    // Render single guest
    renderSingleGuest(guest, debtCalc) {
        // Find guest debt data in calc
        const guestDebtData = debtCalc.find(guestData => guestData.id === guest.id);
        const isGuestDebtor = guestDebtData.debtsSum > 0;

        // Filling template
        this.guestListUl.insertAdjacentHTML(
            'beforeend',
            this.singleGuestTemplate({
                guestId: guest.id,
                guestName: guest.name,
                guestDebtText: isGuestDebtor ? 'Saldo negativo | debe pagar' : 'Saldo positivo',
                guestDept: guestDebtData.debtsSum > 0 ? guestDebtData.debtsSum : 0,
                guestInitial: guest.name[0].toUpperCase()
            })
        );

        // Adding balance guest clase (positive/negative)
        isGuestDebtor ? this.guestListUl.lastElementChild.classList.add('negative') : this.guestListUl.lastElementChild.classList.remove('negative');

        // Adding option to add producto select buyer
        const option = document.createElement("option");
        option.text = guest.name;
        option.value = guest.id;
        this.bindProductBuyer.add(option);

        this.reRenderGuests(debtCalc);

        this.renderWelcomeUI();
    }

    // Rerender all guests styles
    reRenderGuests(debtCalc) {
        // Get guests li nodelist
        const guestsNodeList = this.guestListUl.children;
        Array.prototype.forEach.call(guestsNodeList, function (guestLi) {
            // Get guest ID in <ul>
            const guestIdNode = guestLi.dataset.id;

            // Get guest debt data
            const guestDebtData = debtCalc.find(guestData => guestData.id === guestIdNode);
            const isGuestDebtor = guestDebtData.debtsSum > 0;

            // Modify guest <li> styles
            isGuestDebtor ? guestLi.classList.add('negative') : guestLi.classList.remove('negative');

            // Modify balance money
            guestLi.querySelector('.guestItem-badge').innerHTML = guestDebtData.debtsSum > 0 ? `${(guestDebtData.debtsSum / 100).toFixed(2)}???` : 0;
            guestLi.querySelector('.guestItem-badge').classList.toggle('d-none', guestDebtData.debtsSum <= 0);

            // Modify balance text
            guestLi.querySelector('.guestsItem-info_content').innerHTML = isGuestDebtor ? 'Saldo negativo | debe pagar' : 'Saldo positivo';

            // Add data-debt to <li>
            isGuestDebtor ? guestLi.dataset.debt = `${Math.ceil(guestDebtData.debtsSum)}` : guestLi.dataset.debt = `${0}`;
        });
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
            const productBuyerId = this.bindProductBuyer.value;

            // Form validation
            if (productTitle === '' || productPrice === '' || (productBuyerId === '' || productBuyerId === '')) {
                event.stopPropagation()
                this.addProductForm.classList.add('was-validated');
            } else {
                this.addProductForm.classList.remove('was-validated');
                this.addProductInputName.value = '';
                this.addProductPrice.value = '';
                this.bindProductBuyer.value = '';

                // Call handler
                handler(productTitle, productPrice, productBuyerId);

                this.sortGuest()
            }
        });
    }

    // Render single product
    renderSingleProduct(product, debtCalc) {
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

        this.reRenderGuests(debtCalc);

        this.renderWelcomeUI();
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
                const itemId = event.target.closest('li').dataset.id;
                const itemList = event.target.closest('ul').id;
                handler(itemId, itemList);

                this.sortGuest();
                console.log(itemId);
            }
        });
    }

    // Render delete item
    renderDeleteItem(itemId, itemList, debtCalc) {
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

        this.reRenderGuests(debtCalc);

        this.renderWelcomeUI();
    }

    // Render calc sum of all producto price
    renderSumOfProductPrices(productSum) {
        this.productsSumTotal.lastElementChild.innerHTML = productSum / 100;
        this.productsSumTotal.classList.toggle('d-none', productSum <= 0);
    }

    // Empty summatu ul
    clearSummary() {
        this.summaryListUl.innerHTML = "";
    }

    // Render summary items
    renderSummaryItem(debtorName, beneficiaryName, beneficiaryMoney, dataBorder) {
        this.summaryListUl.insertAdjacentHTML(
            'beforeend',
            this.singleSummaryTemplate({
                guestDebtorName: debtorName,
                productPrice: (beneficiaryMoney / 100).toFixed(2),
                guestBeneficiaryName: beneficiaryName,
                dataBorder: dataBorder
            })
        );
    }

    // Render welcome UI elements
    renderWelcomeUI() {
        const guestsPopulationChecker = this.guestListUl.children.length;
        const productsPopulationChecker = this.productListUl.children.length;
        this.guestsAlert.classList.toggle('d-none', guestsPopulationChecker > 0);
        this.productsAlert.classList.toggle('d-none', productsPopulationChecker > 0);
        this.summaryAlert.classList.toggle('d-none', productsPopulationChecker > 0);
        this.controls.classList.toggle('d-none', guestsPopulationChecker === 0);
    }

    // Restart app action
    reStartAppAction(handler) {
        this.reStartApp.addEventListener('click', (event) => {
            event.preventDefault();
            handler();
            window.location.reload();
        });
    }

    // Restart app render
    renderReStartApp() {
        this.guestListUl.innerHTML = '';
        this.productListUl.innerHTML = '';
        this.summaryListUl.innerHTML = '';
        this.productsSumTotal.lastElementChild.innerHTML = '';
        this.productsSumTotal.classList.add('d-none');
        // this.bindProductBuyer.innerHTML = '';
        this.bindProductBuyer.querySelectorAll('option').forEach((option, index) => {
            if (option.value !== '') {
                option.remove()
            }
        });
        this.renderWelcomeUI();
    }

    sortGuest() {
        const list = this.guestListUl;
        let shouldSwitch;
        let switching = true;
        let counter;
        
        while (switching) {
            switching = false;
            const guest = list.getElementsByTagName("LI");
            
            for (counter = 0; counter < (guest.length - 1); counter ++) {
                shouldSwitch = false;
                if (guest[counter].dataset.debt / 100 < guest[counter + 1].dataset.debt / 100) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                guest[counter].parentNode.insertBefore(guest[counter + 1], guest[counter]);
                switching = true;
            }
        }
    }
};

export { View };