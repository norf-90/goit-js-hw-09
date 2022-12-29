import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  outputDays: document.querySelector('[data-days]'),
  outputHours: document.querySelector('[data-hours]'),
  outputMinutes: document.querySelector('[data-minutes]'),
  outputSeconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;
let finishDate = null;

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notify.failure('Please choose a date in the future', { timeout: 3000 });
    } else {
      refs.startBtn.disabled = false;
      finishDate = selectedDates[0];
      refs.startBtn.addEventListener('click', onStartBtnClick);
    }
  },
});

function onStartBtnClick() {
  const timerId = setInterval(() => {
    const deltaTime = finishDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(deltaTime);

    refs.outputDays.textContent = addLeadingZero(days);
    refs.outputHours.textContent = addLeadingZero(hours);
    refs.outputMinutes.textContent = addLeadingZero(minutes);
    refs.outputSeconds.textContent = addLeadingZero(seconds);

    if (deltaTime < 1000) {
      clearInterval(timerId);
    }
  }, 1000);
}

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

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
