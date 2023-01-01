import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  let delay = Number(formEl.elements.delay.value);
  const step = Number(formEl.elements.step.value);
  const amount = Number(formEl.elements.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(result => {
        console.log(
          `✅ Fulfilled promise ${result.position} in ${result.delay}ms`
        );
        Notify.success(
          `✅ Fulfilled promise ${result.position} in ${result.delay}ms`
        );
      })
      .catch(result => {
        console.log(
          `❌ Rejected promise ${result.position} in ${result.delay}ms`
        );
        Notify.failure(
          `❌ Rejected promise ${result.position} in ${result.delay}ms`
        );
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolved, rejected) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolved({ position, delay });
      } else {
        rejected({ position, delay });
      }
    }, delay);
  });
}
