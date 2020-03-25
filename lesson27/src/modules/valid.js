const valid = () => {
    const inputs = document.querySelectorAll('input');

    const validate = target => {
        const placeholder = target.getAttribute('placeholder');
        if (placeholder === 'Номер телефона') {
            target.value = target.value.replace(/[^\+0-9]+$/, '');
        } else if (placeholder === 'Ваше имя' || placeholder === 'Ваше сообщение') {
            target.value = target.value.replace(/[^А-Яа-я\s.,]/g, '');
        } else if (placeholder === 'E-mail') {
            target.value = target.value.replace(/^\w+@\w\./, '');
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

export default valid;