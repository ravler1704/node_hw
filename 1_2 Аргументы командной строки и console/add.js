#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');


const argv = yargs(hideBin(process.argv))
  .option('month', {
    alias: "m",
    description: "дата и время в формате ISO со смещением месяца в зависимости от параметра",
  })
  .option('day', {
    alias: "d",
    description: "дата и время в формате ISO со смещением дня в зависимости от параметра",
  })
  .argv;


let resultDate = new Date()

if (argv.m) {
  resultDate.setMonth(resultDate.getMonth() + Number(argv.m))
}

if (argv.d) {
  resultDate.setDate(resultDate.getDate() + Number(argv.d))
}

console.log(resultDate.toISOString());





