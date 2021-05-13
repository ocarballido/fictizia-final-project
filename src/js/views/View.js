class View {
    constructor() {
        // Guests elements
        this.guestListUl = document.querySelector('#usersList');
        this.addGuestForm = document.querySelector('#addUserForm');
        this.addGuestInput = document.querySelector('#addUserInpu');
        this.addGuestButton = document.querySelector('#addUserButton');
        this.singleUserTemplate = document.querySelector('#userItemTemplate').innerHTML;

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

    // Add user action
    addUserAction(handler) {
        this.addGuestForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const userName = event.target.elements.userName.value.trim();
            if (userName.length > 0) {
                handler(userName);
                event.target.elements.userName.value = ''
            }
        });
    }

    // Render single user
    renderSingleUser(user) {
        const userText = this.singleUserTemplate
            .replace('[[userId]]', user.id)
            .replace('[[userName]]', user.name)
            .replace('[[userDedtText]]', 'Saldo 0')
            .replace('[[userDept]]', '0')
            .replace('[[userInitial]]', user.getInitialLetter());
        this.guestListUl.innerHTML += userText;
    }
};

export { View };