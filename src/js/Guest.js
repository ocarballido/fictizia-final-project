import { IdGenerator } from './IdGenerator';

class Guest extends IdGenerator {
    constructor(name) {
        super();
        this.name = name;
    }
}

export { Guest };