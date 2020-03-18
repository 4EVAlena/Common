const showAllCards = () => {
    // создаем все css стили для первого блока
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

    const data = './dbHeroes.json';
    // Получим/ распарсим данные из файла json и выведем их в карточки

    const cardsArray = JSON.parse(data);   // ВОПРОС: ПОЧЕМУ ТАК НЕЛЬЗЯ?
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

    divContainer.append(tablo);

    const button = document.createElement('button');
    button.className = 'btnShowAll';
    button.innerText = 'Показать всю картотеку';
    divContainer.append(button);
};
showAllCards(); // Unexpected token . in JSON at position 0 at JSON.parse (<anonymous>)