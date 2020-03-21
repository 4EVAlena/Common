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
        color: grey; 
    }  
    .btnContainer {
        margin: 40 auto;
        flex-direction: row;
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
        width: 200px;
        height: 330px;
        color: white;
        background: black;
        text-align: center;
        font-size: 16px;
    }    
    button {
        padding: 10px 20px;  
        color: blue;
        font-size: 16px; 
        font-weight: bold;             
    }
    img {
        display: block; 
        overflow: hidden;
        margin: 0 auto;
        max-width: 70%;
        height: 30%;
    }
    `;
    document.head.appendChild(style);
    // создаем и выводим на страницу первый контейнер-блок
    const divContainer1 = document.createElement('div');
    divContainer1.classList.add('container');
    divContainer1.innerText = 'Картотека Героев';
    divContainer1.style.fontSize = "30px";
    document.body.appendChild(divContainer1);

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('btnContainer');
    divContainer1.append(btnContainer);

    const button = document.getElementById('btnShowAll');
    btnContainer.append(button);
    const button2 = document.createElement('select');
    button2.classList.add('button');
    btnContainer.append(button2);

    let option = document.createElement('option');  // остановилась тут, в работе
    option.classList.add('button');
    option.value = "Выбери фильм";
    button2.append(option);
     
    const tablo = document.createElement('div');
    tablo.className = 'tablo';
    tablo.style.display = "none";
    divContainer1.append(tablo);
    
    button.addEventListener('click', () => {
        tablo.style.display = "";
        const request = new XMLHttpRequest();
        request.open('GET', './dbHeroes.json');
        request.setRequestHeader('Content-Type', 'application/json');
        request.send();
        request.addEventListener('readystatechange', (event) => {
            if (request.readyState !== 4 && request.status !== 200) {
                divContainer1.innerText = 'Произошла ошибка';
                return;
            }
            const cardsArray = JSON.parse(request.responseText);
            cardsArray.forEach((card) => {
              let cardTablo = document.createElement('div');
              cardTablo.classList.add('card');
              const {
                photo,
                actors,
                realName,
                movies,
                status
              } = card;
              console.log(photo);
              cardTablo.innerHTML = `<img src="${photo}"> <br>
                                            Актер: ${actors} <br>
                                            Настоящее имя: ${realName} <br>
                                            Фильмы: ${movies} <br>
                                            Статус: ${status}`;
              tablo.appendChild(cardTablo);
            });
          });
        });

        button2.addEventListener('click', (event) => {

        });




});

