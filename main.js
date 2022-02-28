const yargs = require("yargs");
const { getWeatherStatus } = require( "./services/DarkSkyApi.js" );
const { getLocation } = require( "./services/GoogleApi.js" );

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: "address",
      describe: "Enter your address",
      string: true
    }
  })
  .help()
  .alias("help", "h")
  .argv;

const address = argv.address;

/**
 * async function => promise
 * await promise
 */


async function showStatus(address){
  let {lat, lng} = await getLocation(address);
  let status = await getWeatherStatus(lat,lng);

  return status;
}

showStatus(address);