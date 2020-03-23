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

export default togglePopup;