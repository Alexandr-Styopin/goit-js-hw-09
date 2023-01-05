import Notiflix from 'notiflix';


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    // console.log("createPromise-ok");
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });  
      } else {
        // Reject
        reject({ position, delay });      
      }
    }, delay);
   
  });
};

const refs = {
    form: document.querySelector('.form'), 
};

class CallCreatePromise {
  constuctor() {};

  call() {
    
    const formEl = refs.form.elements;
    const delayValue = Number(formEl.delay.value);
    const stepValue = Number(formEl.step.value);
    const amountValue = Number(formEl.amount.value);

    let position = null;
    let delay = delayValue;

    const intervalId = setInterval(() => {
      if (position) {
        delay += stepValue;
      }
      position += 1;
      
      createPromise(position, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      });

      if (position === amountValue) {     
        clearTimeout(intervalId);
      };

    }, stepValue);

};

};

const callCreatePromise = new CallCreatePromise;

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
    evt.preventDefault();
    callCreatePromise.call();
    evt.target.reset();
};