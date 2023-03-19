const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

let timerId = null;
stopBtn.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function changeBodyColor() {
  body.style.backgroundColor = getRandomHexColor();
}

function startChangeBodyColor() {
  timerId = setInterval(() => {
    changeBodyColor();
  }, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function stopChangeBodyColor() {
  clearInterval(timerId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

startBtn.addEventListener('click', startChangeBodyColor);
stopBtn.addEventListener('click', stopChangeBodyColor);
