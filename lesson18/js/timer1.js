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

            if (hours < 10) { 
                hours = `0${hours}`;
            } 

            if (minutes < 10) { 
                minutes = `0${minutes}`;
            }    

            if (seconds < 10) {
                seconds = `0${seconds}`;
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
    //menu
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
   //popup
    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
              popupBtn = document.querySelectorAll('.popup-btn'),
              popupСontent = document.querySelector('.popup-content');

        popupBtn.forEach(elem => {
            elem.addEventListener('click', () => {
            popup.style.display = "block";

                if (screen.width > 768) {
                    // console.log(screen.width);
                    const start = Date.now();
        
                    const draw = timePassed => {
                        let dist = +getComputedStyle(popupСontent).width.split("px")[0];
                        dist = -dist / 2 + 50 + "px";
                        popupСontent.style.left = timePassed / 16 + "%";
                        popupСontent.style.marginLeft = dist;
                    };
        
                    const timer = setInterval(() => {
                        const timePassed = Date.now() - start;
                        if (timePassed >= 800) {
                            clearInterval(timer);
                            return;
                        }
        
                        draw(timePassed);
                    });
                }
            }); 
        });
  
        popup.addEventListener('click', (event) => {
            let target = event.target;
            if(target.classList.contains('popup-close')){
                popup.style.display = 'none';
            } else {

                target = target.closest('.popup-content');
                if(!target) {
                    popup.style.display = 'none';
                }
            }    
        });
    };

    togglePopup();
});        