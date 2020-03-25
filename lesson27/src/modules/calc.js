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
            total = Math.floor(price * typeValue * squareValue * countValue * dayValue);
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

export default calc;