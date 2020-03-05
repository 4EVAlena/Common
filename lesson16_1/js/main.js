"use strict";
const buttonStart = document.getElementById('start'),
      buttonPlus = document.getElementsByTagName('button'),
      buttons = document.querySelectorAll('.control'),
      btnPlus1 = buttonPlus[0],
      btnPlus2 = buttonPlus[1],
      additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
      checkboxDepositCheck = document.querySelector('#deposit-check'),
      budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
      budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
      expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
      additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
      additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
      incomePeriodValue = document.querySelector('.income_period-value'),
      targetMonthValue = document.getElementsByClassName('target_month-value')[0],
      salaryAmount = document.querySelector('.salary-amount'),
      income = document.querySelector('.income'),
      incomeTitle = document.querySelector('.income-title'),
      expenses = document.querySelector('.expenses'),
      expensesTitle = document.querySelector('.expenses-title'),
      additionalExpenses = document.querySelector('.additional_expenses'),
      periodSelect = document.querySelector('.period-select'),
      additionalExpensesItems = document.querySelector('.additional_expenses-item'),
      targetAmount = document.querySelector('.target-amount'),
      periodAmount = document.querySelector('.period-amount'),
      leftSideInputs = document.querySelector('.data').querySelectorAll('[type=text]'),    
      inputs = document.querySelectorAll('input[type=text]'),
      buttonCancel = document.getElementById('cancel'),
      depositBank = document.querySelector('.deposit-bank'),
      depositAmount = document.querySelector('.deposit-amount'), // input Сумма
      depositPercent = document.querySelector('.deposit-percent'); // input Процент

let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');



class AppData {
    constructor() {
          this.budget = 0;
          this.budgetDay = 0;
          this.budgetMonth = 0;
          this.expensesMonth = 0;
          this.income = {};
          this.incomeMonth = 0;
          this.addIncome = [];
          this.expenses = {};
          this.addExpenses = [];
          this.deposit = false;
          this.percentDeposit = 0;
          this.moneyDeposit = 0;
    }

    start() {
          this.budget = +salaryAmount.value;

          this.getExpenses(); // создаем объекты appData.expenses ОБЯЗАТЕЛЬНЫЕ РАСХОДЫ
          this.getIncome(); // получаем ЗНАЧЕНИЕ appData.incomeMonth МОДАЛЬНОЕ ОКНО
          this.getExpensesMonth(); // создаем объекты appData.expensesMonth ОБЯЗАТЕЛЬНЫЕ РАСХОДЫ
          this.getAddExpenses(); // создаем массив appData.addExpenses ВОЗМОЖНЫЕ РАСХОДЫ
          this.getAddIncome(); // создаем массив appData.addIncome НАИМЕНОВАНИЯ ВОЗМОЖНЫЕ ДОХОДЫ
          this.getInfoDeposit();
          this.getBudget(); // budgetMonth и budgetDay

          this.showResult();
    }

    blockStart() {
          buttonStart.setAttribute('disabled', 1);
          buttonStart.style.cssText = 'cursor: not-allowed';
          salaryAmount.addEventListener('input', (event) => {
            if (event.target.value.trim() !== '') {
              buttonStart.removeAttribute('disabled');
              buttonStart.style.cssText = 'cursor: pointer';
            } else {
              buttonStart.setAttribute('disabled', 1);
              buttonStart.style.cssText = 'cursor: not-allowed';
            }
          });
    }

    showResult() {
          budgetMonthValue.value = this.budgetMonth;
          budgetDayValue.value = this.budgetDay;
          expensesMonthValue.value = this.expensesMonth;
          additionalExpensesValue.value = this.addExpenses.join(', ');
          additionalIncomeValue.value = this.addIncome.join(', ');
          targetMonthValue.value = this.getTargetMonth();
          incomePeriodValue.value = this.calcPeriod();
          periodSelect.addEventListener('input', () => {
            incomePeriodValue.value = this.calcPeriod();
          });
    }

    addExpensesBlock() {
          const cloneExpensesBlock = expensesItems[0].cloneNode(true);
          for (let i = 0; i < cloneExpensesBlock.childNodes.length; i++) {
            cloneExpensesBlock.childNodes[i].value = '';
          }
          expensesItems[0].parentNode.insertBefore(cloneExpensesBlock, btnPlus2);
          expensesItems = document.querySelectorAll('.expenses-items');

          if (expensesItems.length === 3) {
            btnPlus2.style.display = 'none';
          }
          cloneExpensesBlock.style.placeholder = '';
    }

    getExpenses() {
          expensesItems.forEach((item) => {
            // console.log(this.getExpenses);
            const nameExpenses = item.querySelector('.expenses-title').value;
            const amountExpenses = item.querySelector('.expenses-amount').value;
            if (nameExpenses !== '' && amountExpenses !== '') {
              this.expenses[nameExpenses] = +amountExpenses;
            }
          });
    }

    addIncomesBlock() {
          const cloneIncomeBlock = incomeItems[0].cloneNode(true);
          for (let i = 0; i < cloneIncomeBlock.childNodes.length; i++) {
            cloneIncomeBlock.childNodes[i].value = '';
          }
          incomeItems[0].parentNode.insertBefore(cloneIncomeBlock, btnPlus1);
          incomeItems = document.querySelectorAll('.income-items');
          if (incomeItems.length === 3) {
            btnPlus1.style.display = 'none';
          }
          cloneIncomeBlock.style.placeholder = '';
    }

    getIncome() { // ДОПОЛНИТЕЛЬНЫЙ ДОХОД
          incomeItems.forEach((pair) => {
            const nameIncome = pair.querySelector('.income-title').value;
            const amountIncome = pair.querySelector('.income-amount').value;

            if (nameIncome !== '' && amountIncome !== '') {
              this.income[nameIncome] = +amountIncome;
            }
          });

            for (const key in this.income) {
                this.incomeMonth += +this.income[key];
            }
    }

    getAddExpenses() {
          const addExpenses = additionalExpensesItems.value.split(', ');
          addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
              this.addExpenses.push(item);
            }
          });
    }

    getAddIncome() {
          additionalIncomeItems.forEach((item) => {
            const itemValue = item.value.trim();
            if (itemValue !== '') {
              this.addIncome.push(itemValue);
            }
          });
    }

    getExpensesMonth() {
          for (const key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
          }
    }

    getBudget() {
          const monthDeposit = Math.floor(this.moneyDeposit * this.percentDeposit/100/12);
          this.budgetMonth = Math.floor(this.budget + this.incomeMonth - this.expensesMonth + monthDeposit);
          this.budgetDay = Math.floor(this.budgetMonth / 30);
    }

    getTargetMonth() {
          return Math.ceil((targetAmount.value / this.budgetMonth));
    }

    calcPeriod() {
          return this.budgetMonth * periodSelect.value;
    }

    reset() {
        document.addEventListener('click', event => {
        if (event.target.closest('#start')) {
            buttonStart.style.display = 'none'; // Рассчитать исчезает
            buttonCancel.style.display = 'block'; // появляется Сбросить
            leftSideInputs.forEach((item) => {
            item.setAttribute('readonly', 1); // блокируем inputs
            item.style.cssText = 'cursor: not-allowed';
            });
            checkboxDepositCheck.setAttribute('disabled', 1);
            btnPlus1.setAttribute('disabled', 1); // доп доходы блокируем ввод
            btnPlus2.setAttribute('disabled', 1); // доп расходы блокируем ввод            
        }
        
        else if (event.target.closest('#cancel')) { // если нажимаем на Очистить
            Object.assign(this, new AppData()); // обнуляем данные в объекте

            leftSideInputs.forEach((item) => {  // очищаем все поля
              item.removeAttribute('readonly'); // снимаем с них блокировку
              item.value = '';
              item.style.cssText = 'cursor: default';
            });

            inputs.forEach((item) => {
                item.value = '';
            })

            for (let i = 0; i < incomeItems.length; i++) { // убираем блоки в Income
                if (i !== 0) {                        // все кроме первого
                  income.removeChild(incomeItems[i]);
                }
            }
            btnPlus1.style.display = 'block'; // показываем 1-ю кнопку +
            btnPlus1.removeAttribute('disabled'); // кнопка доп доходы разблокировка

            for (let i = 0; i < expensesItems.length; i++) { // перебираем блоки в Расходах
                if (i !== 0) {                             // кроме первого
                  expenses.removeChild(expensesItems[i]); // удаляем остальные
                }
            }
            btnPlus2.style.display = 'block';   // показываем 2-ю кнопку +
            btnPlus2.removeAttribute('disabled'); // кнопка доп расходы разблокировка

            checkboxDepositCheck.checked = false; // скидываем галочку с Депозита
            checkboxDepositCheck.removeAttribute('disabled'); // чекбокс можно снова кликать
            depositBank.style.display = 'none'; // прячем селект с банками
            depositBank.value = ''; // значение возвращаем к исходному
            depositAmount.style.display = 'none'; // прячем окно сумма

            periodAmount.textContent = 1;  // Период расчета 1
            periodSelect.value = 1; // значение ползунка 1

            buttonCancel.style.display = 'none'; // прячем кнопку Очистить
            buttonStart.style.display = 'block'; // кнопка рассчитать появляется

            this.blockStart(); // если поле зп не заполнено блокируем Рассчитать
           }
        });
    }    

    changePercent() {
      const valueSelect = this.value;
      if (valueSelect === 'other') {
          depositPercent.removeAttribute('disabled');  
          depositPercent.style.display = 'inline-block';
          depositPercent.value = '';
          depositPercent.addEventListener('input', (event) => {
            const isPercent = function (num) {
              return !isNaN(parseFloat(num)) && isFinite(num) && num<=100;
            };
            if(!isPercent(event.target.value)) {
              depositPercent.value = '';
            } else {
              this.percentDeposit = depositPercent.value;
            }
          });
 
      } else {
          depositPercent.style.display = 'none';
          depositPercent.value = valueSelect;
      }
    }
    
    getInfoDeposit() {
    
      if (this.deposit) {
          this.percentDeposit = +depositPercent.value; // % используется в getBudget
          this.moneyDeposit = +depositAmount.value; // сумма вклада используется в getBudget
      }
    }    

    depositHandler() {

      if(checkboxDepositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true; 
            depositBank.addEventListener('change', this.changePercent);
      } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            checkboxDepositCheck.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            this.deposit = false; 
            depositBank.removeEventListener('change', this.changePercent);
      }
    }
// что тут не так - как альтернативный вариант?
    // validate() {
    //     leftSideInputs.forEach((input) => {
    //         for(input.hasAttribute('placeholder')) {
    //             const placeholder = input.getAttribute('placeholder');
    //             if (placeholder === 'Сумма') {
    //                 target.value = target.value.replace(/[^0-9]+$/, '');
    //               } else if (placeholder === 'Наименование') {
    //                 target.value = target.value.replace(/[^а-я\s.,]/i, ''); 
    //               } else if (placeholder === 'Процент') {
    //                   target.value = target.value.replace(/[^0-9]+$/, ''); 
    //           }
    //         }
    //     });
    // }    

    addEventListeners() {
          btnPlus1.addEventListener('click', this.addIncomesBlock); 
          btnPlus2.addEventListener('click', this.addExpensesBlock); 

          const validate = (target) => {
            const placeholder = target.getAttribute('placeholder');
            if (placeholder === 'Сумма') {
              target.value = target.value.replace(/[^0-9]+$/, '');
            } else if (placeholder === 'Наименование') {
              target.value = target.value.replace(/[^а-я\s.,]/i, ''); 
            } else if (placeholder === 'Процент') {
                target.value = target.value.replace(/[^0-9.,]+$/, ''); 
            }
          };   

          document.addEventListener('input', (event) => { 
            validate(event.target);
          });

        //   leftSideInputs.addEventListener('input', this.validate.bind(this));

          checkboxDepositCheck.addEventListener('change', this.depositHandler.bind(this)); 

          buttonStart.addEventListener('click', this.start.bind(this)); 

          periodSelect.addEventListener('input', () => {
            periodAmount.textContent = periodSelect.value;
          });

          this.reset();
          this.blockStart();

    }
}

const appData = new AppData();

appData.addEventListeners();
