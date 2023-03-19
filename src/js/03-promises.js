import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const formElements = event.currentTarget.elements;
  let delay = Number(formElements.delay.value);
  let step = Number(formElements.step.value);
  let amount = Number(formElements.amount.value);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay} ms`);
        Notify.success(`Fulfilled promise ${position} in ${delay} ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay} ms`);
        Notify.failure(`Rejected promise ${position} in ${delay} ms`);
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}
