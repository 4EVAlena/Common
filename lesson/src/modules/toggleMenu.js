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

export default toggleMenu;