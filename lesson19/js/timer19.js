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

    countTimer('12 March 2020');

    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'), // line 45
              menu = document.querySelector('menu'); // line 96
 
        btnMenu.addEventListener('click', event => { 
        let target = event.target;
            if (target.classList.contains('close-btn')) { 
                menu.style.display = 'none';
            } else {
                target = target.closest('menu');  
                if (!target) {
                    menu.style.display = 'none';
                }
            }
        });   
    };    

    toggleMenu();

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

     //табы
    const tabs = () => {

        const tabHeader = document.querySelector('.service-header'),
                tab = tabHeader.querySelectorAll('.service-header-tab'), // divs
                tabContent = document.querySelectorAll('.service-tab'); // блоки с содержанием/описанием

        const toggleTabContent = (index) => {
            for(let i=0; i < tabContent.length; i++) {
                if(index === i) { 
                    tab[i].classList.add('active'); 
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active'); 
                    tabContent[i].classList.add('d-none'); 
                }
            }
        };

    
        tabHeader.addEventListener('click', (event) => {
            let target = event.target; 
        
            target = target.closest('.service-header-tab');
        
            if(target) {                 
                    tab.forEach((item, i) => {  
                        if(item === target) {
                            toggleTabContent(i); 
                        }
                    });
            }
        });
    };

    tabs();    
});        