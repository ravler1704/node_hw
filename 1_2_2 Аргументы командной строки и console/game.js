#!/usr/bin/env node

const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const rl = readline.createInterface({ input, output });

const from = 0;
const to = 100;
const number = getRandom(from, to);

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const question = () => {
  return new Promise((resolve) => rl.question('Попробуйте отгадать: ', answer => resolve(answer)));
};

const main = async () => {
  console.log(`Загадано число в диапазоне от ${from} до ${to}`);

  let success = false;

  while (!success) {
    const answer = await question();

    if (answer > number) console.log(`Больше`);
    if (answer < number) console.log(`Меньше`);

    success = +answer === number;
  }

  console.log(`Отгадано число ${number}`);
  rl.close();
};

main();



