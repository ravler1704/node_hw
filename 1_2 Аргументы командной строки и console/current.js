#!/usr/bin/env node

const yargs = require('yargs/yargs'); // Подключаем пакет
const { hideBin } = require('yargs/helpers'); // Берём нужную нам функцию

// Обрабатываем аргументы
const argv = yargs(hideBin(process.argv))
  .option('year', {
    alias: "y",
    description: "при указании этого параметра будет выведен текущий год",
  })
  .option('month', {
    alias: "m",
    description: "при указании этого параметра будет выведен текущий месяц",
  })
  .option('date', {
    alias: "d",
    description: "при указании этого параметра будет выведена текущая дата",
  })
  .argv;


let year
let month
let day
let result = []

// Выводим результат в консоль
if (process.argv.length <= 2) {
  console.log(new Date().toISOString());
} else {
  year = new Date().getUTCFullYear().toString()
  month = pad(new Date().getUTCMonth() + 1)
  day = pad(new Date().getUTCDay())

  if (argv.year) {
    result.push(year)
  }

  if (argv.month) {
    result.push(month)
  }

  if (argv.date) {
    result = []
    result.push(year)
    result.push(month)
    result.push(day)
  }

  console.log(result.join('-'));
}

function pad(number) {
  var r = String(number);
  if (r.length === 1) {
    r = '0' + r;
  }
  return r;
}



