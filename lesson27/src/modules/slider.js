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

export default slider;