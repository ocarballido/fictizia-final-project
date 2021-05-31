class ApiServices {
    constructor() {
        this.dataStorage = localStorage.getItem('dataStorage')
        ? 
        JSON.parse(localStorage.getItem('dataStorage'))
        :
        {
            guestsList: [],
            productsList: [],
        }
    }

    // Save in localStorage
    saveDataStorage(dataStorage) {
        localStorage.setItem('dataStorage', JSON.stringify(dataStorage));
    }

    // Get in localStorage
    getDataStorage() {
        return this.dataStorage;
    }

    // Clear data
    clearData() {
        this.dataStorage.guestsList = [];
        this.dataStorage.productsList = [];
        this.saveDataStorage(this.dataStorage);
    }
}

const apiServices = new ApiServices();

export { apiServices };