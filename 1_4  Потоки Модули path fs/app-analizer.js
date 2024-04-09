const fs = require('fs');
const logFile = 'games.log';

// Читаем файл логов
let logData = fs.readFileSync(logFile, 'utf8');

const lines = logData.split('\n');
let totalGames = 0;
let winsGames = 0;

lines.forEach(line => {
  if (line.includes('Вы угадали! -') || line.includes('Вы не угадали!')) {
    totalGames++;
    if (line.includes('Решка!') || line.includes('Орёл!')) {
      winsGames++;
    }
  }
});

const lossGame = totalGames - winsGames;
const winsPercentage = totalGames ? ((winsGames / totalGames) * 100).toFixed(2) : 0;

console.log(`Всего игр: ${totalGames}`);
console.log(`Победы: ${winsGames}`);
console.log(`Проигрыши: ${lossGame}`);
console.log(`Процент побед: ${winsPercentage}%`);
