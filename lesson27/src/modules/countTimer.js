const countTimer = (deadline) => {
    const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            const dateStop = new Date(deadline).getTime(), // в миллисекундах дата дедлайна
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000; // в секундах
            let seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);

            if (hours < 10) {
                hours = `0${hours}`;
            }

            if (minutes < 10) {
                minutes = `0${minutes}`;
            }

            if (seconds < 10) {
                seconds = `0${seconds}`;
            }

            return { timeRemaining, hours, minutes, seconds }; 
        }

        function updateClock() {
            const timer = getTimeRemaining();

            timerHours.textContent = timer.hours;
            timerMinutes.textContent = timer.minutes;
            timerSeconds.textContent = timer.seconds;

            let idInterval;

            if (timer.timeRemaining > 0) {
                idInterval = setInterval(updateClock, 1000);
            } else if (timer.timeRemaining <= 0) {
                clearInterval(idInterval);
                timerHours.textContent = `00`;
                timerMinutes.textContent = `00`;
                timerSeconds.textContent = `00`;
            }
        }
        updateClock();
};

export default countTimer;
