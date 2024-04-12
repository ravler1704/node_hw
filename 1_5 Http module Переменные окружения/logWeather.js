module.exports.logWeather = (request, { current, location }) => {

  console.log(`погода по вашему запросу:  ${request} 
на момент времени ${new Date(
    current.last_updated_epoch * 1000
  ).toLocaleString()}
Наименование: ${location.name}, в стране ${location.country}
Состояние погоды: ${current.condition.text}
Температура: ${current.temp_c}℃
`);

};
