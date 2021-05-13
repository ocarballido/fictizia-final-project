import '../scss/index.scss';
import { app } from './controller';

document.addEventListener('DOMContentLoaded', () => {
    console.log('loaded index');
});

const test = [
    {
        name: 'Oscar',
        expenses: 60,
        id: 1,
        globalDebt: {
            2: 10,
            3: 1
        }
    },
    {
        name: 'Pepe',
        expenses: 30,
        id: 2,
        globalDebt: {
            1: 20,
            3: 1
        }
    },
    {
        name: 'Bolo',
        expenses: 3,
        id: 3,
        globalDebt: {
            1: 20,
            2: 10
        }
    }
];

const debts = test.reduce((obj, user) => {
    obj[user.id] = obj[user.id] || {};
    obj[user.id] = user.globalDebt;
    return obj;
}, {});

console.log(app.model.data);