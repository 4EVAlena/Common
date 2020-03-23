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

export default team;