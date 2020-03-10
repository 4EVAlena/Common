'use strict';

const greeting = document.getElementById('greeting'),
      dayOfToday = document.getElementById('day-of-today'),
      currentTime = document.getElementById('current-time'),
      newYear = document.getElementById('new-year'),
      day = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

    let getTimeRemaining = function() {
        let date = new Date(),
            currentHour = date.getHours(),
            newYear = new Date(`January 1, 2021`).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (newYear - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.ceil(timeRemaining / 60 / 60) % 24,
            days = Math.floor(timeRemaining / 60 / 60 / 24),
            timeToString = date.toLocaleTimeString('en');

        if (hours < 10) {
            hours = `0${hours}`;
        }
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        return {currentHour, timeRemaining, hours, minutes, seconds, timeToString, days, date};
    };

let toScreen = () => {
    let timer = getTimeRemaining();
    // console.log(timer.currentHour);

    if (timer.currentHour >= 5 && timer.currentHour < 12) {
        greeting.textContent = `Доброе утро!`;
    } else if (timer.currentHour >=12 && timer.currentHour < 18) {
        greeting.textContent = `Добрый день!`;
    } else if (timer.currentHour >=18 && timer.currentHour < 24) {
        greeting.textContent = `Добрый вечер!`;
    } else if (timer.currentHour >= 0 && timer.currentHour < 5) {
        greeting.textContent = `Доброй ночи!`;
    }  
           
    dayOfToday.textContent = `Сегодня: ${day[timer.date.getDay()]}`;

    let showTime = function(){
        let timer = getTimeRemaining();
        currentTime.textContent = `Текущее время: ${timer.timeToString}`;
        setInterval(showTime, 1000);    
    };
    showTime();

    if(timer.timeRemaining){
        newYear.textContent = `До Нового года осталось ${timer.days} дней`;
    } else{
        newYear.textContent = '';
    }        
};

toScreen();