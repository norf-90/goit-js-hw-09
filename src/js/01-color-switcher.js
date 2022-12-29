const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};
let intervalId = null;
document.body.style.transition = 'background-color 500ms';

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  intervalId = setInterval(randomizeBgColor, 1000, getRandomHexColor);
  refs.startBtn.disabled = true;
}

function onStopBtnClick() {
  clearInterval(intervalId);
  isStarted = false;
  refs.startBtn.disabled = false;
}

function randomizeBgColor(randomizeFunc) {
  document.body.style.backgroundColor = randomizeFunc();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
