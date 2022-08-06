
import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "flatpickr/dist/flatpickr.min.css";

function convertMs(ms) {
      // Number of milliseconds per unit of time
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      // Remaining days
      const days = addLeadingZero(Math.floor(ms / day));
      // Remaining hours
      const hours = addLeadingZero(Math.floor((ms % day) / hour));
      // Remaining minutes
      const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
      // Remaining seconds
      const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

      return { days, hours, minutes, seconds };
}



const refs = {
  input: document.querySelector('input'),
  startBtn: document.querySelector('button'),
  daysEl: document.querySelector("[data-days]"),
  hoursEl: document.querySelector("[data-hours]"),
  minutesEl: document.querySelector("[data-minutes]"),
  secondsEl: document.querySelector("[data-seconds]"),
}
let intervarId = null;

refs.startBtn.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(deadlineDate) {
    
      const initTime = options.defaultDate.getTime();
      if (deadlineDate[0] < initTime) {
        Notify.failure('Please choose a date in the future');
        return
      } else {
        refs.startBtn.removeAttribute('disabled')
    }
    const start = () => {

      
      const timer = () => {
        const currentTime = new Date();
        const deltaTime = deadlineDate[0] - currentTime;
        updateClock(convertMs(deltaTime))
        
        if (deltaTime < 1000) {
        Notify.success('Deadline finished');
        clearInterval(intervarId);
    }
      }

    intervarId = setInterval(timer, 1000);
    }
    

    refs.startBtn.addEventListener('click', start);
  },
};
const addLeadingZero = value => String(value).padStart(2, '0');
flatpickr(refs.input, options);

const updateClock = ({ days, hours, minutes, seconds }) => {
  refs.daysEl.textContent = days;
  refs.hoursEl.textContent = hours;
  refs.minutesEl.textContent = minutes;
  refs.secondsEl.textContent = seconds;
}