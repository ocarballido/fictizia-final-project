let id = 0;

class Guest {
    constructor(name) {
        this.id = ++id;
        this.name = name;
        this.expenses = 0;
        this.globalDebt = {};
        this.realDebt = {};
    }

    // Get initial letter
    getInitialLetter() {
        return this.name[0].toUpperCase();
    }
}

export { Guest };