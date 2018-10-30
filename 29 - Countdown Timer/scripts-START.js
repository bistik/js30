const display = document.querySelector(".display__time-left");
const back = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll(".timer__button");
const form = document.querySelector("#custom");

let countdown;

function showTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secLeft = seconds % 60;
    display.textContent = `${minutes}:${secLeft < 10 ? 0 : ''}${secLeft}`;
}

function showBack(seconds) {
    const timeEnd = Date.now() + seconds * 1000;
    const backTime = new Date(timeEnd);
    const hour = backTime.getHours() % 12;
    const minute = backTime.getMinutes();
    back.textContent = `Be Back At ${hour < 10 ? 0 : ''}${hour}:${minute < 10 ? 0 : ''}${minute}`;
}

function timer(seconds) {
    clearInterval(countdown);
    if (!parseInt(seconds)) {
        return;
    }
    const end = Date.now() + seconds * 1000;
    
    showTime(seconds);
    showBack(seconds);
    countdown = setInterval(() => {
        const secLeft = Math.round((end - Date.now()) / 1000);

        if (secLeft < 0) {
            clearInterval(countdown);
            return;
        }
        showTime(secLeft);
    }, 1000);
}

function handleButton() {
    timer(this.dataset.time);
}

buttons.forEach(button => {
    button.addEventListener('click', handleButton);
})

custom.addEventListener('submit', function (e) {
    e.preventDefault();
    timer(this.minutes.value * 60);
    this.reset(); // clear input
});
