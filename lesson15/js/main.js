"use strict";
const buttonStart = document.getElementById('start'),
      buttonPlus = document.getElementsByTagName('button'),
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
      leftSide = document.querySelector('.data'),    
      inputs = document.querySelectorAll('input[type=text]'),
      buttonCancel = document.getElementById('cancel');

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
          this.deposit = 0;
          this.percentDeposit = 0;
          this.moneyDeposit = 0;
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

    start() {
          this.budget = +salaryAmount.value;

          this.getExpenses(); // создаем объекты appData.expenses ОБЯЗАТЕЛЬНЫЕ РАСХОДЫ
          this.getIncome(); // получаем ЗНАЧЕНИЕ appData.incomeMonth МОДАЛЬНОЕ ОКНО
          this.getExpensesMonth(); // создаем объекты appData.expensesMonth ОБЯЗАТЕЛЬНЫЕ РАСХОДЫ
          this.getAddExpenses(); // создаем массив appData.addExpenses ВОЗМОЖНЫЕ РАСХОДЫ
          this.getAddIncome(); // создаем массив appData.addIncome НАИМЕНОВАНИЯ ВОЗМОЖНЫЕ ДОХОДЫ
          this.getBudget(); // budgetMonth и budgetDay

          this.showResult();
    }

    getCancel() {
        if (event.target.closest('#start')) {
          buttonStart.style.display = 'none'; // Рассчитать исчезает
          buttonCancel.style.display = 'block'; // появляется Сбросить
          inputs.forEach((item) => {
            item.setAttribute('readonly', 1); // блокируем inputs
            item.style.cssText = 'cursor: not-allowed';
          });
        }
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
            console.log(this.getExpenses);
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
            this.expensesMonth += this.expenses[key];
          }
    }

    getBudget() {
          this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
          this.budgetDay = Math.floor(this.budgetMonth / 30);
    }

    getTargetMonth() {
          return Math.ceil((targetAmount.value / this.budgetMonth));
    }

    getInfoDeposit() {
          const isNumber = function (num) {
            return !isNaN(parseFloat(num)) && isFinite(num);
          };

          this.deposit = confirm('Есть ли у вас депозит в банке?');

          if (this.deposit) {
            do {
              this.percentDeposit = prompt('Какой годовой процент?', 10);
            } while (!isNumber(this.percentDeposit));
            do {
              this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            } while (!isNumber(this.moneyDeposit));
          }
    }

    periodChange() {
          periodSelect.addEventListener('input', () => {
            periodAmount.textContent = periodSelect.value;
          });
    }

    calcPeriod() {
          return this.budgetMonth * periodSelect.value;
    }

    reset() {
          if (event.target.closest('#cancel')) {
            this.budget = 0;
            this.budgetDay = 0;
            this.budgetMonth = 0;
            this.expensesMonth = 0;
            this.income = 0;
            this.income = {};
            this.incomeMonth = 0;
            this.addIncome = 0;
            this.addIncome = [];
            this.expenses = 0;
            this.expenses = {};
            this.addExpenses = 0;
            this.addExpenses = [];
            this.deposit = 0;
            this.percentDeposit = 0;
            this.moneyDeposit = 0;

            inputs.forEach((item) => {
              item.removeAttribute('readonly');
              item.value = '';
              item.style.cssText = 'cursor: default';
            });

            for (let i = 0; i < incomeItems.length; i++) {
                if (i !== 0) {
                  income.removeChild(incomeItems[i]);
                }
            }
            btnPlus1.style.display = 'block';

            for (let i = 0; i < expensesItems.length; i++) {
                if (i !== 0) {
                  expenses.removeChild(expensesItems[i]);
                }
            }
            btnPlus2.style.display = 'block';

            periodAmount.textContent = 1;
            periodSelect.value = 1;

            buttonCancel.style.display = 'none';
            buttonStart.style.display = 'block';

            this.blockStart();
          }
    }

    addEventListeners() {
          btnPlus1.addEventListener('click', this.addIncomesBlock);
          btnPlus2.addEventListener('click', this.addExpensesBlock);

          const validate = (target) => {
            const placeholder = target.getAttribute('placeholder');
            if (placeholder === 'Сумма') {
              target.value = target.value.replace(/[^0-9]+$/, '');
            } else if (placeholder === 'Наименование') {
              target.value = target.value.replace(/[^а-я\s.,]/i, '');
            }
          };
          document.addEventListener('input', (event) => {
            validate(event.target);
          });

          buttonStart.addEventListener('click', this.start.bind(this));

          buttonStart.addEventListener('click', this.getCancel);

          buttonCancel.addEventListener('click', this.reset.bind(this));

          this.blockStart();

          this.periodChange();
    }
}

const appData = new AppData();

appData.addEventListeners();
