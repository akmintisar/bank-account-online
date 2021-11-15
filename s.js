const euroToUsd = 1.1;
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const total = movements
  .filter(movement => movement > 0)
  .map(movement => movement * euroToUsd)
  .reduce((prev, curr) => prev + curr, 0);

console.log(total);
