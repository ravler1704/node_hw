#!/usr/bin/env node
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Генератор случайных чисел в заданном диапазоне
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Вывод генератора
const secretNumber = generateRandomNumber(1, 2);

// Функция записи в файл
const logFile = 'games.log';
function logResult(result, logFile) {
  fs.appendFileSync(logFile, `${result}\n`, 'utf8');
}
console.log('Игра "Орёл или Решка"!');

// Очистка файла логов перед началом игры
const gameStart = () => {
  rl.question('Хотите очистить файл логов? (да/yes/y или нет/no/n): ', (answer) => {
    console.log(answer);
    if (answer === 'да' || answer === 'yes' || answer === 'y') {
      fs.writeFileSync(logFile, '', 'utf8');
      console.log('Файл логов очищен.');
      gamePlay();
    } else if (answer === 'нет' || answer === 'no' || answer === 'n') {
      console.log('Файл логов не изменен.');
      gamePlay();
    } else {
      gameStart();
    }

  });
};

// Игра
const gamePlay = () => {
  console.log('Введите 1(Орёл) или 2(Решка).');
  console.log(`Результаты будут сохранены в файле: ${logFile}`);
  rl.question('Введите число: ', (answer) => {
    const number = parseInt(answer);

    console.log(number);

    if (isNaN(number)) {
      console.log('Вы ошиблись (это не цифра), введите цифру 1 или 2.');
      gamePlay();
      return;
    } else if (number < 1 || number > 2) {
      console.log('Вы ошиблись, введите только цифру 1 или 2.');
      gamePlay();
      return;
    }

    if (number !== secretNumber) {
      const result = 'Вы не угадали!';
      console.log(`Вы не угадали!`);
      console.log(`Попробуйте еще раз`);
      logResult(result, logFile);
      gamePlay();
      return;
    }
    if (number === secretNumber) {
      if (secretNumber === 1) {
        const result = 'Вы угадали! - Орёл!';
        console.log(`Вы угадали! - Орёл`);
        console.log(`Игра завершена. Спасибо за участие!!!`);
        logResult(result, logFile);
        rl.close();
      }
      if (secretNumber === 2) {
        const result = 'Вы угадали! - Решка!';
        console.log(`Вы угадали! - Решка`);
        console.log(`Игра завершена. Спасибо за участие!!!`);
        logResult(result, logFile);
        rl.close();
      }
      return;
    }

    gamePlay();
  });
};
gameStart();
