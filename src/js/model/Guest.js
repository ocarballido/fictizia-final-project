class Guest {
    constructor(guestData) {
        this.id = guestData.id;
        this.name = guestData.name;
    }

    // Get initial letter
    getInitialLetter() {
        return this.name[0].toUpperCase();
    }
}

export { Guest };