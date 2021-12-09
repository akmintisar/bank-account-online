'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Demo User',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 9999,
};

const account5 = {
  owner: 'N I S H A T',
  movements: [100, 300, 500, 700, 900, -100, -400, -200, 10000, 20000],
  interestRate: 3,
  pin: 6969,
};
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const accounts = [account1, account2, account3, account4, account5];
const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(element => element[0])
      .join('');
  });
};

createUserName(accounts);

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const calcPrintBalance = function (acc) {
  acc.balanceTotal = acc.movements.reduce((prev, curr) => prev + curr, 0);

  labelBalance.textContent = `${acc.balanceTotal} EURO`;
};

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (movement, index) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">
      ${index + 1} ${type}
    </div>

    <div class="movements__value">${movement}</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterBegin', html);
  });
};

//////////////////////////////////////////////
///////////////////////////////////////////////
//LECTURES;

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const withdrawals = movements.filter(move => move < 0);

const balanceTotal = movements.reduce((prev, curr) => prev + curr, 0);

// movements.forEach(function (movement, index, array) {
//   if (movement > 0) {
//     console.log(
//       `Movement ${index + 1}: You've deposited ${movement} and ${array}`
//     );
//   } else {
//     console.log(
//       `Movement ${index + 1}: You've withdrawn ${Math.abs(movement)}`
//     );
//   }
// });
//--------------------------------------------------
const calcDisplaySummary = function (acc) {
  //Total Deposit Calculation
  const totalDeposit = acc.movements
    .filter(movement => movement > 0)
    .reduce((curr, prev) => curr + prev, 0);

  labelSumIn.textContent = totalDeposit;
  //--------------------------------------------------
  //Total Withdrawal Calculation
  const totalWithdraw = acc.movements
    .filter(movement => movement < 0)
    .reduce((curr, prev) => curr + prev, 0);

  labelSumOut.textContent = Math.abs(totalWithdraw);
  //--------------------------------------------------
  //Total Interest Calculation

  const totalInterest =
    (acc.movements
      .filter(movement => movement > 0)
      .reduce((curr, prev) => curr + prev, 0) *
      acc.interestRate) /
    100;

  labelSumInterest.textContent = totalInterest;
};
//--------------------------------------------------
const updateUI = function (acc) {
  displayMovements(acc.movements);
  calcPrintBalance(acc);
  calcDisplaySummary(acc);
};
let currentAcc;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAcc = accounts.find(acc => acc.userName === inputLoginUsername.value);

  if (currentAcc?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back ${currentAcc.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;
    updateUI(currentAcc);
  }
});
//--------------------------------------------------
//Transfer
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    currentAcc.balanceTotal >= amount &&
    receiverAcc?.userName !== currentAcc.userName
  ) {
    currentAcc.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAcc);
  }
});
//Request Loan Section
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmount = inputLoanAmount.value;
  if (
    loanAmount > 0 &&
    currentAcc.movements.some(mov => mov >= loanAmount * 0.1)
  ) {
    currentAcc.movements.push(loanAmount);
    updateUI(currentAcc);
  }
  inputLoanAmount.value = '';
});

//Close Account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAcc.userName &&
    Number(inputClosePin.value) === currentAcc.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.userName === currentAcc.userName
    );

    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});
/////////////////////////////////////////////
// Sort Button
var sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAcc.movements, !sorted);
  sorted = !sorted;
});
