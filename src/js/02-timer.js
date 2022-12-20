import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    inputDate: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),

    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
};

refs.startBtn.setAttribute('disabled', true);
refs.startBtn.classList.add('isDisabled');
console.log();
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
      const DELAY = 1000;
      const selectedDate = selectedDates[0];
      const currentTime = Date.now();
      this.isActive = false;

      if (selectedDate <= currentTime) {
        alert("Please choose a date in the future");
      } else {
        refs.startBtn.removeAttribute('disabled');
        refs.startBtn.classList.remove('isDisabled');
      };

      function onClickStartBtn(evt) {
        if(this.isActive) {
          return;
      };

      this.isActive = true;

      const timerId = setInterval(() => {
        const currentIntervalTime = Date.now();
        const deltaTime = selectedDate - currentIntervalTime;

        const timeComponents = convertMs(deltaTime);

        if (deltaTime <= 1000) {
          clearInterval(timerId);
        }

        console.log(deltaTime);

        console.log("timeComponents", timeComponents);

        refs.days.textContent = timeComponents.days.toString().padStart(2, '0');
        refs.hours.textContent = timeComponents.hours.toString().padStart(2, '0');
        refs.minutes.textContent = timeComponents.minutes.toString().padStart(2, '0');
        refs.seconds.textContent = timeComponents.seconds.toString().padStart(2, '0');
      }, DELAY);

    };

      refs.startBtn.addEventListener('click', onClickStartBtn);

    },
  };
  



  const fp = flatpickr("#datetime-picker", options);

  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }