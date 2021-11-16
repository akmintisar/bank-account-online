const euroToUsd = 1.1;
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const total = movements
  .filter(movement => movement > 0)
  .map(movement => movement * euroToUsd)
  .reduce((prev, curr) => prev + curr, 0);

console.log(total);

const age = [5, 2, 4, 1, 15, 8, 3];
const calcAverageHumanAge = age
  .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
  .filter(age => age >= 18);
console.log(calcAverageHumanAge);

const findMethod = movements.find(mov => mov < 0);
console.log(findMethod);
