window.addEventListener('DOMContentLoaded', function() {
    'use strict';
    // Timer
    function countTimer(deadline) {
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {    
            let dateStop = new Date(deadline).getTime(), // в миллисекундах дата дедлайна
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
 
        function updateClock() {
            let timer = getTimeRemaining();

            timerHours.textContent = timer.hours;
            timerMinutes.textContent = timer.minutes;
            timerSeconds.textContent = timer.seconds;

            let idInterval;
     
            if(timer.timeRemaining > 0) {
                idInterval = setInterval(updateClock, 1000);
            } else if(timer.timeRemaining <=0) {
                clearInterval(idInterval);
            }
        }
            updateClock();
    }

    countTimer('11 March 2020');

    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
              menu = document.querySelector('menu'),
              closeBtn = document.querySelector('.close-btn'),
              menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };    

        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);  
        
        menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));    
    };

    toggleMenu();

    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupСontent = document.querySelector('.popup-content'),
            popupClose = document.querySelector('.popup-close');

        popupBtn.forEach(elem => {
            elem.addEventListener('click', () => {
                if (screen.width > 768) {     // если экран больше 768 пикселей

                    popup.style.display = 'block';  // отображаем модальное окно
                    
                    const start = Date.now();   // кол-во миллисекунд в момент открытия
                    const height = (document.documentElement.clientHeight/2) - (popupСontent.clientHeight/2); 
                
                    const timer = setInterval(() => {
                        const timePassed = Date.now() - start;
                        if (timePassed >= height) {
                            clearInterval(timer); 
                            return;
                        }
                        let draw = function(timePassed) {
                        
                            popupСontent.style.top = timePassed + 'px';
                        };

                        draw(timePassed);
                          
                    }, 20);                
                                               
        
                } else {
                    popup.style.display = 'block';
                }
            });
        });
        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    };

    togglePopup();
});        