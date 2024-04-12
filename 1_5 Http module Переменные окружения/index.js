const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const { apiKey, baseUrl } = require("./config");
const API = require("./api");
const { logWeather } = require("./logWeather");

const WeatherApi = new API(baseUrl, apiKey);

yargs(hideBin(process.argv))
  .command({
    command: "$0 <city>",
    description: "Current weather",
    builder(yargs) {
      yargs
        .positional("city", {
          description: "Название города или поселения",
          type: "string",
        })
        .example("$0 London");
    },
    async handler({ city }) {
      debugger
      try {
        const { current, location } = await WeatherApi.getCurrent(city);

        logWeather(city, { current, location });
      } catch (error) {
        console.error(error);
        yargs.showHelp();
      }
      process.exit();
    },
  })
  .version(false)
  .parse();
