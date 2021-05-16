import '../scss/index.scss';
import { app } from './controllers/Controller';

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

const testDebt = [
    {
        id: 1,
        name: 'Pepe',
        expense: 300
    },
    {
        id: 1,
        name: 'Bolo',
        globalDebt: {},
    },
    {
        id: 1,
        name: 'Chini',
        globalDebt: {},
    },
];

const addForTest = (arr, productBuyer, expense) => {
    const totalBebt = arr.forEach((guest, index) => {
        if (guest.id !== productBuyer) {
            if (!guest.globalDebt[productBuyer]) {
                debt = {
                    ...debt,
                    [guest.id]: {
                        [productBuyer]: expense / arr.length,
                    }
                };
            } else {
                let debtValue = guest.globalDebt[productBuyer]
                debt = {
                    ...debt,
                    [guest.id]: {
                        [productBuyer]: debtValue + expense / arr.length,
                    }
                };
            }
        }
    });
};