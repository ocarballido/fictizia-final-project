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
                guestDebtText: isGuestDebtor ? 'Saldo negativo | debe padar' : 'Saldo positivo',
                guestDept: guestDebtData.debtsSum > 0 ? guestDebtData.debtsSum : 0,
                guestInitial: guest.getInitialLetter()
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
    }

    // Rerender all guests styles
    reRenderGuests(debtCalc) {
        // Get guests li nodelist
        const guestsNodeList = this.guestListUl.children;
        Array.prototype.forEach.call(guestsNodeList, function (guestLi) {
            // Get guest ID in <ul>
            const guestIdNode = parseInt(guestLi.dataset.id);

            // Get guest debt data
            const guestDebtData = debtCalc.find(guestData => guestData.id === guestIdNode);
            const isGuestDebtor = guestDebtData.debtsSum > 0; 

            // Modify guest <li> styles
            isGuestDebtor ? guestLi.classList.add('negative') : guestLi.classList.remove('negative');

            // Modify balance money
            guestLi.querySelector('.guestItem-badge').innerHTML = guestDebtData.debtsSum > 0 ? `${(guestDebtData.debtsSum / 100).toFixed(2)} €` : 0;
            guestLi.querySelector('.guestItem-badge').classList.toggle('d-none', guestDebtData.debtsSum <= 0);

            // Modify balance text
            guestLi.querySelector('.guestsItem-info_content').innerHTML = isGuestDebtor ? 'Saldo negativo | debe padar' : 'Saldo positivo';
        });
    }

    renderSummery() {
        //
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
    }

    // Render summary list
    renderSummaryList(debts) {
        this.summaryListUl.insertAdjacentHTML(
            'beforeend',
            this.singleGuestTemplate({
                guestId: guest.id,
                guestName: guest.name,
                guestDebtText: 'Saldo 0',
                guestDept: '0',
                guestInitial: guest.getInitialLetter()
            })
        );
    }

    // sortGuest(debtCalc) {
    //     // Duplicate node
    //     const newList = guestsList.cloneNode(false)

    //     // Add guests <li> to array
    //     const guestArr = [];
    //     for(let i = guestsList.childNodes.length; i--;){
    //         if(guestsList.childNodes[i].nodeName === 'LI')
    //         guestArr.push(guestsList.childNodes[i]);
    //     }

    //     // Sort the list in descending order
    //     guestArr.sort((a, b) => {
    //         const aValue = isNaN(parseInt(a.querySelector('.guestItem-badge').innerHTML.slice(0, b.querySelector('.guestItem-badge').innerHTML.length - 2))) ? 0 : parseInt(a.querySelector('.guestItem-badge').innerHTML.slice(0, b.querySelector('.guestItem-badge').innerHTML.length - 2));
    //         const bValue = isNaN(parseInt(b.querySelector('.guestItem-badge').innerHTML.slice(0, b.querySelector('.guestItem-badge').innerHTML.length - 2))) ? 0 : parseInt(b.querySelector('.guestItem-badge').innerHTML.slice(0, b.querySelector('.guestItem-badge').innerHTML.length - 2));
    //         return bValue - aValue
    //     });

    //     // Add them into the ul in order
    //     for(let i = 0; i < guestArr.length; i++) {
    //         newList.appendChild(guestArr[i]);
    //         console.log(guestsList, newList);
    //     }
    //     // guestsList.parentNode.replaceChild(newList, guestsList);
    //     console.log(guestsList, newList);
    // }
};

export { View };