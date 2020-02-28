document.addEventListener('DOMContentLoaded', function() {

       'use strict';

        const form = document.querySelector('.todo-control');
        const headerInput = document.querySelector('.header-input');
        const toDoList = document.getElementById('todo');
        const completedList = document.getElementById('completed');
        // 1. при загрузке страницы первым делом создаем объект
        let data = {
            todo: [],
            completed: []
        };
        // 2. делаем проверку как только загрузится страница,
        //если в localStorage есть данные (с прошлого посещения), то
        if(localStorage.getItem('localData')) {
        // то распарсим данные-объект
        data = JSON.parse(localStorage.getItem('localData'));
        }

        // 3. функция, которая рендерит наши данные, если они есть в Storage
        const renderItemsForUpdate = function() {
            // если данных в localStorage нет (страница открывается впервые, происходит кастомизация в 4.)
            if(!data.todo.length && !data.completed.length) {
                return;
            }
            // если объекты не пусты, то рендер на страницу по одному
            for (let i=0; i<data.todo.length; i++) {
                renderItem(data.todo[i]);
            }
            for (let i=0; i<data.completed.length; i++) {
                renderItem(data.completed[i], true);
            }
        };   

        // 4. заносим/обновляем данные в localStorage
        const dataUpdateToLocals = function() {
            localStorage.setItem('localData', JSON.stringify(data));
        };

        // 6. функция рендерит один элемент - запускает его на страничку
        const addItem = function (text) {
            renderItem(text); // 7.
            headerInput.value = '';
            data.todo.push(text); // все строки обязательно попадают в todo

            // как только новый элемент появляется на странице, он заносится в localStorage
            dataUpdateToLocals(); 
        };
       
        // 8. фукция удаляет элемент из его родителя
        // щелкнули по кнопке "Удалить", функция приняла наш event и мы заносим его в переменную item
        const itemRemove = function (elem) {
            const item = elem.parentNode.parentNode; // чтобы получить li, надо получить родителя button - прародителя li
            const itemParent = item.parentNode; // получили ul, чтобы мочь удалить из него li
            const id = itemParent.id; // 	<ul class="todo" id="todo"> 
            const text = item.textContent;

            if(id === 'todo') {
                // убираем ненужный
                data.todo.splice(data.todo.indexOf(text), 1); // элемент с id в кол-ве 1шт                         
            } else {
                // если id completed, удаляем из completed
                data.completed.splice(data.completed.indexOf(text), 1); // элемент с id в кол-ве 1шт                 
            }

            itemParent.removeChild(item);

            // каждый раз, когда мы удаляем элемент со страницы, нужно обновлять localStorage
            dataUpdateToLocals();
        };

        // переносит эелемент из одного списка в другой
        const itemComplete = function (elem) {
            const item = elem.parentNode.parentNode; // чтобы получить li, надо получить родителя button - прародителя li
            const itemParent = item.parentNode; // получили ul, чтобы мочь удалить из него li
            const id = itemParent.id; // 	<ul class="todo" id="todo"> 
            const text = item.textContent;

            let target;
            // сортировка
            if(id === 'todo') {
                target = completedList;
            } else {
                target = toDoList;
            }
            // перемещение
            if(id === 'todo') {
                // убираем ненужный
                data.todo.splice(data.todo.indexOf(text), 1); // элемент с id в кол-ве 1шт 
                // размещаем противоположный
                data.completed.push(text);               
            } else {
                data.completed.splice(data.completed.indexOf(text), 1); // элемент с id в кол-ве 1шт   
                data.todo.push(text); 
            }

            // родитель элемента, произведенного кликом  itemParent // удаляем кликнутый item
            itemParent.removeChild(item);
            target.insertBefore(item, target.childNodes[0]);

            dataUpdateToLocals();
        };

        // 7.
        const renderItem = function(text, completed = false) {
            // один li
            const item = document.createElement('li');
            // div
            const btnBlock = document.createElement('div');
            const btnRemove = document.createElement('button');
            const btnComplete = document.createElement('button');
            
            let list;
            if(completed) {
                list = completedList; // если completed = true
            } else {
                list = toDoList; // completed = false
            }

            item.classList.add('todo-item');
            btnBlock.classList.add('todo-buttons');
            btnRemove.classList.add('.todo-remove');
            btnComplete.classList.add('.todo-complete');

            btnRemove.addEventListener('click', function(event) {
                itemRemove(event.target);
            });

            btnComplete.addEventListener('click', function(event) {
                itemComplete(event.target);
            });

            item.textContent = text;

            btnBlock.appendChild(btnRemove);
            btnBlock.appendChild(btnComplete);
            item.appendChild(btnBlock);

            list.insertBefore(item, list.childNodes[0]);
        };
        // 5. сабмитим форму
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            if(headerInput.value !== '') {
                addItem(headerInput.value.trim()); // 6.
            }
        });
        // запускаем в конце, чтобы после обработки страницы, шла проверка объека data,
        // если он пустой, то return и обрабатываем страницу дальше
        // а если не пустой, то перебираем каждое наше свойство и каждый элемент по очереди запускаем на страницу
        renderItemsForUpdate();
        
});