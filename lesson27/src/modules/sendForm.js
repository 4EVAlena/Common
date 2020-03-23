const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы скоро с Вами свяжемся!';

    const forms = document.querySelectorAll('form'); 
    const inputs = document.querySelectorAll('form input'); 

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem;';

    const postData = body => {
        return fetch ('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(body),
        });
    };     

    forms.forEach(form => {
        form.addEventListener('submit', event => {
            event.preventDefault();
            form.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;  
            const formData = new FormData(form);
            const body = {};
            formData.forEach((val, key) => {
                body[key] = val;
            }); 
            
            postData(body)
                .then( response => {
                    if (response.status !== 200) {
                        throw new Error('status network not 200');
                    }    
                    statusMessage.textContent = successMessage;
                })
                .catch(error => {
                    statusMessage.textContent = errorMessage;
                    console.error(error);
                 })
                .finally(() => {                       
                    setTimeout(() => {
                        inputs.forEach(item => item.value = '');
                        statusMessage.innerText = '';                         
                    }, 2500);
                }); 
        });
    });   
};

export default sendForm;