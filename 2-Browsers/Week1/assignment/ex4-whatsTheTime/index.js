/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Assignments/tree/main/2-Browsers/Week1#exercise-4-whats-the-time

1. Inside the `index.js`, complete the `addCurrentTime` to add the current time 
  to the webpage. Make sure it's written in the HH:MM:SS notation (hour, minute,
  second). Use `setInterval()` to make sure the time stays current.
2. Have the function execute when it's loading in the browser.
------------------------------------------------------------------------------*/
const timeContainer = document.createElement('div');
timeContainer.id = 'time-container';

const hourElement = document.createElement('span');
const minuteElement = document.createElement('span');
const secondElement = document.createElement('span');

hourElement.id = 'hour';
minuteElement.id = 'minute';
secondElement.id = 'second';

hourElement.textContent = '00';
minuteElement.textContent = '00';
secondElement.textContent = '00';

const colon1 = document.createElement('span');
colon1.textContent = ':';
const colon2 = document.createElement('span');
colon2.textContent = ':';

timeContainer.appendChild(hourElement);
timeContainer.appendChild(colon1);
timeContainer.appendChild(minuteElement);
timeContainer.appendChild(colon2);
timeContainer.appendChild(secondElement);

document.body.appendChild(timeContainer);

function addCurrentTime() {
  let currentTime = new Date();
  hourElement.innerHTML =
    (currentTime.getHours() < 10 ? '0' : '') + currentTime.getHours();
  minuteElement.innerHTML =
    (currentTime.getMinutes() < 10 ? '0' : '') + currentTime.getMinutes();
  secondElement.innerHTML =
    (currentTime.getSeconds() < 10 ? '0' : '') + currentTime.getSeconds();
}
setInterval(addCurrentTime, 1000);
window.addEventListener('load', addCurrentTime);
