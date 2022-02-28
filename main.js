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


getLocation(address, (err, res)=>{
  if (err) return console.log(err);

  console.log(res);
  const { lat, lng } = res;

  getWeatherStatus(lat, lng, (err, res)=>{
    if (err) return console.log(err);

    console.log(res)
  })

})