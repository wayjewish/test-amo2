const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  let timer = null;

  return (seconds) => {
    if (timer) clearInterval(timer);
    
    const start = Date.now();
    let prevDelta = 0;

    timerEl.textContent = getTime(seconds);

    timer = setInterval(() => {
      const delta = Math.floor((Date.now() - start) / 1000);
      const difference = delta - prevDelta;

      if (difference > 0) {
        seconds = seconds + difference;
        prevDelta = delta;
 
        timerEl.textContent = getTime(seconds);
      }
    }, 10);
  };
};

const getTime = (seconds) => {
  const time = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  
  if (seconds > (60 * 60)) time.hours = Math.floor(seconds / 60 / 60);
  if (seconds > 60) time.minutes = Math.floor(seconds / 60) % 100;
  time.seconds = seconds % 60;

  return Object.values(time).map((num) => num < 10 ? `0${num}` : `${num}`).join(':');
};


const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  const target = e.target;
  const { value } = target;

  if (!value.length > 0) return;

  if (!/^\d+$/.test(value)) {
    target.value = value.replace(/\D/g, '');
  } 
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';
});
