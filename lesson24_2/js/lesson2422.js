'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const style = document.createElement('style');
    style.textContent = `
    body {
        box-sizing: border-box;
        background: #000;
    }    
    .container {
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #000;
    }    
    .tablo {
        margin: 10px;
        padding: 10px;
        width: 1000px;
        height: auto;
        background: #fff;
        border: thin inset #000;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }    
    .card {
        margin: 10px;
        padding: 10px;
        width: 150px;
        height: 150px;
        color: white;
        background: black;
        border: thin inset red;
    }    
    .btnShowAll {
        margin: 10px;
        padding: 10px 20px;        
    }
    `;
    // создаем и выводим на страницу первый контейнер-блок
    const divContainer1 = document.createElement('div');
    divContainer1.className = 'container';
    divContainer1.innerText = 'Вся Картотека';
     
    const tablo = document.createElement('div');
    tablo.className = 'tablo';

    // const data = './dbHeroes.json';
    // Получим/ распарсим данные из файла json и выведем их в карточки
    const button = document.getElementById('btnShowAll')
    button.addEventListener('click', () => {
        const request = new XMLHttpRequest();
        request.open('GET', './dbHeroes.json');
        request.setRequestHeader('Content-type', 'application/json');
        request.send();
        request.addEventListener('readystatechange', (event) => {
            if(request.readyState === 4 && request.status === 200) {
                const cardsArray = JSON.parse(request.responseText);
                cardsArray.forEach ((card) => {
                    cardTablo = document.createElement('div');
                    cardTablo.classList.add('card');
                    const {photo, actors, realName, movies, status} = card;
                    cardTablo.innerHTML = `${photo} <br>
                                        Актер: ${actors} <br>
                                        Настоящее имя: ${realName} <br>
                                        Фильмы: ${movies} <br>
                                        Статус: ${status}`;
                    tablo.appendChild(cardTablo);            
                });
            } else {
                divContainer1.innerText = 'Произошла ошибка';
            }  
        });    
    });    

    divContainer1.append(tablo);
}) 