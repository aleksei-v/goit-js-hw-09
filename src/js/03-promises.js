import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector("form");

function promisingByCicle(delay, step, amount) {
    for (let i = 1; i <= amount; i += 1) {
        let total = delay + step * (i - 1);
        createPromise(i, total)
            .then(({ position, delay }) => {
                return Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
            })
            .catch(({ position, delay }) => {
                return Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
            });
    }
}
function CreatePromiseByAmount(evt) {
    evt.preventDefault();
    const delay = Number(evt.target.delay.value);
    const step = Number(evt.target.step.value);
    const amount = Number(evt.target.amount.value);
    promisingByCicle(delay, step, amount)
}

function createPromise(position, delay) {
        return new Promise((resolve, reject) => {
            const shouldResolve = Math.random() > 0.3;
            setTimeout(() => {
                if (shouldResolve) {
                    resolve({ position, delay });
                } else {
                    reject({ position, delay });
                }
            }, delay)
        });
}

form.addEventListener('submit', CreatePromiseByAmount)

