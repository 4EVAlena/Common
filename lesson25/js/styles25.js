'use strict';

window.addEventListener('DOMContentLoaded', () => {
    // Timer
    function countTimer(deadline) {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            const dateStop = new Date(deadline).getTime(), // в миллисекундах дата дедлайна
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000; // в секундах
            let seconds = Math.floor(timeRemaining % 60),
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

            return { timeRemaining, hours, minutes, seconds }; // в современном синтаксисе
        }

        function updateClock() {
            const timer = getTimeRemaining();

            timerHours.textContent = timer.hours;
            timerMinutes.textContent = timer.minutes;
            timerSeconds.textContent = timer.seconds;

            let idInterval;

            if (timer.timeRemaining > 0) {
                idInterval = setInterval(updateClock, 1000);
            } else if (timer.timeRemaining <= 0) {
                clearInterval(idInterval);
                timerHours.textContent = `00`;
                timerMinutes.textContent = `00`;
                timerSeconds.textContent = `00`;
            }
        }
        updateClock();
    }

    countTimer('10 March 2020');

    const toggleMenu = () => {
        const menu = document.querySelector('menu'); // line 96
        const handlerMenu = () => {

            if (screen.width < 768) {
                if (!menu.style.transform || menu.style.transform === `translate(-100%)`) {
                    menu.style.transform = `translate(0)`;
                } else {
                    menu.style.transform = `translate(-100%)`;
                }
            } else {
                menu.classList.toggle('active-menu');
            }
        };

        document.body.addEventListener('click', () => {
            const target = event.target;

            if (target.closest('div.menu')) {
                handlerMenu();
            } else if (target.closest('.active-menu li a') || target.matches('menu.close-btn')) {
                handlerMenu();
            } else if (menu.classList.contains('active-menu') && !target.matches('.active-menu')) {
                handlerMenu();
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

        popup.addEventListener('click', event => {
            let target = event.target;
            if (target.classList.contains('popup-close')) {
                popup.style.display = 'none';
            } else {

                target = target.closest('.popup-content');
                if (!target) {
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

        const toggleTabContent = index => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };


        tabHeader.addEventListener('click', event => {
            let target = event.target;

            target = target.closest('.service-header-tab');

            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };

    tabs();

    // slider
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            slider = document.querySelector('.portfolio-content');

        let currentSlide = 0, interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        // dots generation
        const dotsContainer = document.querySelector('.portfolio-dots');

        const dotsFactory = () => {
            slide.forEach(elem => {
                const dot = document.createElement('li');
                if (elem[0]) {
                    dot.classList.add("dot", "dot-active");
                } else {
                    dot.classList.add("dot");
                }
                dotsContainer.appendChild(dot);
            });

        };
        dotsFactory();
        const dot = document.querySelectorAll('.dot');

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };


        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', event => {
            event.preventDefault();

            const target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) { // стрелка справа
                currentSlide++;
            } else if (target.matches('#arrow-left')) { // стрелка слева
                currentSlide--;
            } else if (target.matches('.dot')) { // на точку
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }
            // замыкаем по кругу - сначала направо
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            // затем замыкаем по кругу налево
            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });
        // mouseover останавливаем
        slider.addEventListener('mouseover', event => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }
        });
        // mouseout запускаем
        slider.addEventListener('mouseout', event => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(1500); // запускаем через setInterval функцию autoPlaySlide()

    };

    slider();

    // inputs validation
    const valid = () => {
        const inputs = document.querySelectorAll('input');
        // console.log(inputs);

        const validate = target => {
            const placeholder = target.getAttribute('placeholder');
            if (placeholder === 'Номер телефона') {
                target.value = target.value.replace(/[^\+0-9]+$/, '');
            } else if (placeholder === 'Ваше имя' || placeholder === 'Ваше сообщение') {
                target.value = target.value.replace(/[^а-я\s]/i, '');
            } else if (placeholder === 'E-mail') {
                target.value = target.value.replace(/^\w+@\w+\.\w$/, '');
            } else if (target.matches('input.calc-item')) {
                target.value = target.value.replace(/[^0-9\.]+$/);
            }
        };

        inputs.forEach(input => {
            input.addEventListener('input', event => {
                const target = event.target;
                validate(target);
            });
        });
    };
    valid();
    //team
    const team = () => {

        const command = document.querySelector('.command');

        command.addEventListener('mouseover', event => {
            const target = event.target,
                image1 = target.getAttribute('src'),
                image2 = target.getAttribute('data-img');

            if (target.hasAttribute('src')) {
                target.setAttribute('src', image2);
            }
            command.addEventListener('mouseout', e => {
                e.target.setAttribute('src', image1);
            });
        });

    };
    team();
    // calculator
    const calc = price => {
        const calcBlock = document.querySelector('.calc-block'), // контейнер
            calcType = document.querySelector('.calc-type'), // select
            calcSquare = document.querySelector('.calc-square'), // Общая площадь
            calcDay = document.querySelector('.calc-day'), // Срок исполнения (в днях)
            calcCount = document.querySelector('.calc-count'), // Количество помещений
            totalValue = document.getElementById('total'); // ИТОГО:
        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }
            totalValue.textContent = total;
        };

        calcBlock.addEventListener('change', event => {
            const target = event.target;
            if (target.matches('select') || target.matches('input')) {
                countSum();
            }
        });
    };
    calc(100); // price

    // send-ajax-form
    
    const sendForm = () => {
        const errorMessage = 'Что-то пошло не так...',
            loadMessage = 'Загрузка...',
            successMessage = 'Спасибо! Мы скоро с Вами свяжемся!';

        const forms = document.querySelectorAll('form'); // все формы
        const inputs = document.querySelectorAll('form input'); // все инпуты форм

        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 2rem;';

        const body = {};

        forms.forEach(form => {
            form.addEventListener('submit', event => {
                event.preventDefault();
                form.appendChild(statusMessage);
                statusMessage.textContent = loadMessage;
                const formData = new FormData(form);
                formData.forEach((val, key) => {
                    body[key] = val;
                });               
            });
        });

        const postData = body => {
            return new Promise ((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('POST', './server.php');
            request.setRequestHeader('Content-Type', 'application/json');


                request.addEventListener('readystatechange', () => {
                    if (request.readyState !== 4) {
                        return;
                    }
                    if (request.status === 200) {
                        resolve();
                    } else {
                        reject(error);
                    }
                });

                // request.setRequestHeader('Content-Type', 'application/json');

                request.send(JSON.stringify(body));
            });
        };    
        

        postData(body, inputs)
            .then(() => {
                statusMessage.textContent = successMessage;
            })
            .catch(error => {
                statusMessage.textContent = errorMessage;
                console.error(error);
            })
            .finally(inputs => {
                inputs.forEach(item => {
                    item.value = '';
                });    

                statusMessage.textContent = '';                      
            })
    };
    sendForm();
});    




    
