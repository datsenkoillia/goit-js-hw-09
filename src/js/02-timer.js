import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  daysLeft: document.querySelector('[data-days]'),
  hoursLeft: document.querySelector('[data-hours]'),
  minutesLeft: document.querySelector('[data-minutes]'),
  secondsLeft: document.querySelector('[data-seconds]'),
};

// refs.startBtn.disabled = true;

let timeOnClose = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    timeOnClose = selectedDates[0].getTime();
    fpOnClose();
  },
};

flatpickr('#datetime-picker', options);

refs.startBtn.addEventListener('click', onStartTimer);

function fpOnClose() {
  const currentDate = Date.now();

  if (currentDate > timeOnClose) {
    Report.warning('Attention', 'Please choose a date in the future', 'OK');
    // window.alert('Please choose a date in the future');
    refs.startBtn.disabled = true;
  } else {
    refs.startBtn.disabled = false;
  }
}

function onStartTimer() {
  timerId = setInterval(() => {
    changeTimer();
  }, 1000);
  refs.startBtn.disabled = true;
}

function changeTimer() {
  let deltaMs = timeOnClose - Date.now();

  if (deltaMs <= 0) {
    clearInterval(timerId);
    refs.startBtn.disabled = false;
    return;
  }

  const timeLeft = convertMs(deltaMs);

  refs.daysLeft.textContent = addLeadingZero(timeLeft.days);
  refs.hoursLeft.textContent = addLeadingZero(timeLeft.hours);
  refs.minutesLeft.textContent = addLeadingZero(timeLeft.minutes);
  refs.secondsLeft.textContent = addLeadingZero(timeLeft.seconds);
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
  return String(value).padStart(2, '0');
}
