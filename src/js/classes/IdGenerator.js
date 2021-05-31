class IdGenerator {
    constructor() {
        this.id = IdGenerator.getID();
    }
    static getID() {
        return (Date.now() + Math.random()).toString(36);
    }
}

export { IdGenerator };