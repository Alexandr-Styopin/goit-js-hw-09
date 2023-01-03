import Notiflix from 'notiflix';


function createPromise(position, delay) {
  return promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    const values = {
      position: position,
      delay: delay,
    };
  
    if (shouldResolve) {
      // Fulfill
      return resolve(values);

    } else {
      // Reject
      return reject(values);
    }
  });
};


const refs = {
    form: document.querySelector('.form'),
    
};

const callCreatePromise = {
  isActive: false,
  intervalId: null,

  call() {

    if(this.isActive) {
      return;
  };

    this.isActive = true;

    const formEl = refs.form.elements;
    const amountInputValue = Number(formEl.amount.value);
    const delayInputValue = Number(formEl.delay.value);
    const stepInputValue = Number(formEl.step.value);

    let position = null;
    
    let delay = delayInputValue; 
        
    const intervalId = setInterval(() => { 
        if (position) {
      delay += stepInputValue;
    }

    position += 1;
   
    createPromise(position, delay)
    .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);

    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
  })
    .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);

    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });

      if (position === amountInputValue) {     
          clearTimeout(intervalId);
          this.isActive = false;
      };
    },delay);
  }
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
    evt.preventDefault();
  
    callCreatePromise.call();
};