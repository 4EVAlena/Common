'use strict';

const Element = function(selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
};

Element.prototype.createNewElem = function() {
let newElem;

    if (this.selector[0] == '.') {
    newElem = document.createElement('div');
    newElem.classList.add('block');
    } else if (this.selector[0] == '#') {
        newElem = document.createElement('p');
        newElem.classList.add('id', 'best');
    }    
    newElem.style = `height: ${this.height};
    width: ${this.width};
    background: ${this.bg};
    font-size: ${this.fontSize};
    color: #efefef`;
    newElem.textContent = 'Этот текст выглядит по-разному, в зависимости от элемента-объекта';

    document.body.appendChild(newElem);
};

// const div = new Element('.block', '200px', '200px', 'blue', '16px');
const p = new Element('#best', 'inherit', 'inherit', 'green', '30px');

// div.createNewElem();
p.createNewElem();


