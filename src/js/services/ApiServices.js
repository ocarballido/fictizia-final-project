const SERVER = 'http://localhost:3000';
const SERVER_GUESTS = `${SERVER}/guests`;
const SERVER_PRODUCTS = `${SERVER}/products`;

const fetchDb = (endpoint, method, data) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    if (data) options.body = JSON.stringify(data);

    return new Promise((resolve, reject) => {
        fetch(endpoint, options)
            .then(response => {
                if (response.ok) {
                    response
                        .json()
                        .then(json => resolve(json));
                } else {
                    reject('Server error');
                }
            })
            .catch(error => reject(error));

    });
};

class ApiServices {
    loadGuests() {
        return fetchDb(SERVER_GUESTS, 'GET');
    }

    loadProducts() {
        return fetchDb(SERVER_PRODUCTS, 'GET');
    }

    addGuest(name) {
        return fetchDb(
            SERVER_GUESTS,
            'POST',
            { name }
        );
    }

    addProduct(title, price, buyer){
        return fetchDb(
            SERVER_PRODUCTS,
            'POST',
            {
                title,
                price,
                buyer
            }
        );
    }
    
    deleteGuest(id) {
        return fetchDb(
            `${SERVER_GUESTS}/${id}`,
            'DELETE'
        );
    }

    deleteProduct(id) {
        return fetchDb(
            `${SERVER_PRODUCTS}/${id}`,
            'DELETE'
        );
    }

}

const apiServices = new ApiServices();

export { apiServices };