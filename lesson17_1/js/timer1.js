window.addEventListener('DOMContentLoaded', function() {
    'use strict';
    // Timer
    function countTimer(deadline) {
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {    
            let dateStop = new Date(deadline).getTime(), // в милисекундах дата дедлайна
                  dateNow = new Date().getTime(),
                  timeRemaining = (dateStop - dateNow) / 1000, // в секундах
                  seconds = Math.floor(timeRemaining % 60),                
                  minutes = Math.floor((timeRemaining / 60) % 60), 
                  hours = Math.floor(timeRemaining / 60 / 60); 
        
            if (hours >= 0 && hours < 10) {
                hours = '0' + hours;
            } else if (hours < 0) {
                hours = '00';
            }

            if (minutes >= 0 && minutes < 10) {
                minutes = '0' + minutes;
            }  else if (minutes < 0) {
                minutes = '00';
            }

            if (seconds >= 0 && seconds < 10) {
                seconds = '0' + seconds;
            }  else if (seconds < 0) {
                seconds = '00';
            }    
            return {timeRemaining, hours, minutes, seconds}; // в современном синтаксисе
        }    
 
        // console.log(getTimeRemaining());
        function updateClock() {
            let timer = getTimeRemaining();

            timerHours.textContent = timer.hours;
            timerMinutes.textContent = timer.minutes;
            timerSeconds.textContent = timer.seconds;

            let idInterval;
            // let idTimeout;
            // if(timer.timeRemaining > 0) {
            //     idTimeout = setTimeout(updateClock, 1000);
            // } else if(timer.timeRemaining <=0) {
            //     clearTimeout(idTimeout);
            // }
            if(timer.timeRemaining > 0) {
                idInterval = setInterval(updateClock, 1000);
            } else if(timer.timeRemaining <=0) {
                clearInterval(idInterval);
            }
        }
            updateClock();
    }

        countTimer('10 March 2020');
});        