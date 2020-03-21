'use strict';
// будем делать AJAX запрос к тестовому API и выводить на страницу то, что получили

// сначала пишем код без использования промисов

const output = document.getElementById('output');
// стандарная функция для GET запросов:
// принимает адрес json файла и callback функцию
// если бы у нас был POST запрос, то надо было бы передавать const getData = (method, headers, url, outputData)
// а при GET запросе заголовки необязательны, метод указываем в request.open  как GET
const getData = (url, outputData) => {
    // создаем запрос
    const request = new XMLHttpRequest();
    // настраиваем запрос, передаем через адрес API
    request.open('GET', url);
    request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) {
            return;
        }
        if (request.status === 200) {
            // получаем объект распарсив файл json
            const response = JSON.parse(request.responseText);
            // outputData() будет обрабатывать данные, она должна быть callback функцией
            outputData(response);
        } else {
            console.error(request.statusText);
        }
    });
    // открываем соединение и отправляем запрос
    request.send();
};
const outputPhotos = data => {
    const random = Math.floor(Math.random() * data.length);
    const obj = data[random];
    // console.log(obj);
    output.innerHTML = `<h2>${obj.title}</h2>
                        <img scr="${obj.url}" alt="${obj.title}">`;
};
// url - будем делать запрос именно к json файлу, который содержит данные с фото

const urlPhotos = 'https://jsonplaceholder.typicode.com/photos';
// при вызове getData мы передаем url и сallback функцию
getData(urlPhotos, outputPhotos);
