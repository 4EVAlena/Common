
const buttonStart = document.getElementById('start');
const buttonPlus = document.getElementsByTagName('button');
const btnPlus1 = buttonPlus[0];
const btnPlus2 = buttonPlus[1];
const additionalIncomeItems = document.querySelectorAll('.additional_income-item');
const checkboxDepositCheck = document.querySelector('#deposit-check');
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.querySelector('.income_period-value');
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const salaryAmount = document.querySelector('.salary-amount');
const income = document.querySelector('.income');
const incomeTitle = document.querySelector('.income-title');
const expenses = document.querySelector('.expenses');
const expensesTitle = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
const additionalExpenses = document.querySelector('.additional_expenses');
const periodSelect = document.querySelector('.period-select');
const additionalExpensesItems = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
let incomeItems = document.querySelectorAll('.income-items');
const periodAmount = document.querySelector('.period-amount');
const leftSide = document.querySelector('.data');
const inputs = document.querySelectorAll('input[type=text]');
const buttonCancel = document.getElementById('cancel');

const AppData = function () {
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
};

AppData.prototype.blockStart = function () {
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
};

AppData.prototype.start = function () {
  this.budget = +salaryAmount.value;

  this.getExpenses(); // создаем объекты appData.expenses ОБЯЗАТЕЛЬНЫЕ РАСХОДЫ
  this.getIncome(); // получаем ЗНАЧЕНИЕ appData.incomeMonth МОДАЛЬНОЕ ОКНО
  this.getExpensesMonth(); // создаем объекты appData.expensesMonth ОБЯЗАТЕЛЬНЫЕ РАСХОДЫ
  this.getAddExpenses(); // создаем массив appData.addExpenses ВОЗМОЖНЫЕ РАСХОДЫ
  this.getAddIncome(); // создаем массив appData.addIncome НАИМЕНОВАНИЯ ВОЗМОЖНЫЕ ДОХОДЫ
  this.getBudget(); // budgetMonth и budgetDay

  this.showResult();
};

AppData.prototype.getCancel = function () {
  if (event.target.closest('#start')) {
    buttonStart.style.display = 'none'; // Рассчитать исчезает
    buttonCancel.style.display = 'block'; // появляется Сбросить
    inputs.forEach((item) => {
      item.setAttribute('readonly', 1); // блокируем inputs
      item.style.cssText = 'cursor: not-allowed';
    });
  }
};

AppData.prototype.blockStart = function () {
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
};

AppData.prototype.showResult = function () {
  const _this = this; // так как присвоение вне функции periodSelect, то this будет внешним
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = this.getTargetMonth();
  incomePeriodValue.value = this.calcPeriod();
  periodSelect.addEventListener('input', () => {
    incomePeriodValue.value = _this.calcPeriod();
  });
};


AppData.prototype.addExpensesBlock = function () {
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
};

AppData.prototype.getExpenses = function () {
  const _this = this;
  expensesItems.forEach((item) => {
    // console.log(this.getExpenses);
    const nameExpenses = item.querySelector('.expenses-title').value;
    const amountExpenses = item.querySelector('.expenses-amount').value;
    if (nameExpenses !== '' && amountExpenses !== '') {
      _this.expenses[nameExpenses] = +amountExpenses;
    }
  });
};

AppData.prototype.addIncomesBlock = function () {
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
};

AppData.prototype.getIncome = function () { // ДОПОЛНИТЕЛЬНЫЙ ДОХОД
  const _this = this;
  incomeItems.forEach((pair) => {
    const nameIncome = pair.querySelector('.income-title').value;

    const amountIncome = pair.querySelector('.income-amount').value;

    if (nameIncome !== '' && amountIncome !== '') {
      _this.income[nameIncome] = +amountIncome;
    }
  });

  for (const key in this.income) {
    this.incomeMonth += +this.income[key];
  }
};

AppData.prototype.getAddExpenses = function () {
  const _this = this;
  const addExpenses = additionalExpensesItems.value.split(', ');
  addExpenses.forEach((item) => {
    item = item.trim();
    if (item !== '') {
      _this.addExpenses.push(item);
    }
  });
};

AppData.prototype.getAddIncome = function () {
  const _this = this;
  additionalIncomeItems.forEach((item) => {
    const itemValue = item.value.trim();
    if (itemValue !== '') {
      _this.addIncome.push(itemValue);
    }
  });
};

AppData.prototype.getExpensesMonth = function () {
  for (const key in this.expenses) {
    this.expensesMonth += this.expenses[key];
  }
};

AppData.prototype.getBudget = function () {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function () {
  return Math.ceil((targetAmount.value / this.budgetMonth));
};

AppData.prototype.getInfoDeposit = function () {
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
};

AppData.prototype.periodChange = function () {
  periodSelect.addEventListener('input', () => {
    periodAmount.textContent = periodSelect.value;
  });
};

AppData.prototype.calcPeriod = function () {
  return this.budgetMonth * periodSelect.value;
};

AppData.prototype.reset = function () {
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

    buttonStart.style.display = 'block';
    buttonCancel.style.display = 'none';

    this.blockStart();
  }
};

AppData.prototype.addEventListeners = function () {
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
};

const appData = new AppData();

appData.addEventListeners();
