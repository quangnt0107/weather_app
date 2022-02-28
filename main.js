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


getLocation(address)
  .then(res=>{
    console.log(res);
    const { lat, lng } = res;
    return getWeatherStatus(lat, lng) // promise chain
  })
  .then(res=>{
    console.log(res);
  })
  .catch(err=>console.log(err))