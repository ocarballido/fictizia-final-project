class View {
    constructor() {
        // Guests elements
        this.guestListUl = document.querySelector('#guestsList');
        this.addGuestForm = document.querySelector('#addGuestForm');
        this.addGuestInput = document.querySelector('#addGuestInpu');
        this.addGuestButton = document.querySelector('#addGuestButton');
        this.singleGuestTemplate = document.querySelector('#guestItemTemplate').innerHTML;

        // Products elements
        this.productListUl = document.querySelector('#productsList');
        this.addProductForm = document.querySelector('#productsForm');
        this.addProductInputName = document.querySelector('#addProductInpu');
        this.addProductPrice = document.querySelector('#productPrizeEuroInpu');
        this.bindProductBuyer = document.querySelector('#bindProductBuyer');
        this.addProductButton = document.querySelector('#addProductButton');

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
                event.target.elements.guestName.value = ''
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
    }
};

export { View };