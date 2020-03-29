const scrollView = (allLinks, closeBtn, serviceBlock, url, nextBlock) => {
    const links = document.querySelectorAll(allLinks),
            notBtn = document.querySelector(closeBtn),
            btnContainer = document.getElementById(serviceBlock),
            pic = document.querySelector('img').src = url,
            blockToFollow = document.querySelector(nextBlock);

    links.forEach(link => {
        link.addEventListener('click', e => {
            if ((e.target || e.target.parentNode) && (e.target !== notBtn)) {
                e.preventDefault();
                const section = document.querySelector(link.getAttribute('href'));
                section.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    pic.addEventListener('click', e => { 
        if (e.target || (e.target.parentNode.id === btnContainer)) { 
            e.preventDefault();
            blockToFollow.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    });

};
export default scrollView;