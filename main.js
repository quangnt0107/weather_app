const request = require('request');
const yargs = require('yargs');



const argv = yargs.options({
  a: {
    // demand: true,
    alias: "address",
    describe: "Enter your address",
    string: true
  }
}).help()
  .alias("help", "h")
  .argv;


const address = argv.address;


request.get({
  url: `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDNI_ZWPqvdS6r6gPVO50I4TlYkfkZdXh8&address=${address || 'hanoi'}`,
  json: true
}, (err, res, body)=>{
  if (err && err.code === "ENOTFOUND") return console.log("Cannot connect to maps.googleapis.com");
  if (body.status === "ZERO_RESULTS") return console.log("Address Not Found");

  const formatted_address = body.results[0].formatted_address;
  const lat = body.results[0].geometry.location.lat;
  const lng = body.results[0].geometry.location.lng;
  console.log(formatted_address);
  console.log(lat);
  console.log(lng);

  request.get({
    url: `https://api.darksky.net/forecast/b8164e69c9f7fbc654f20d2d6381d1fc/${lat},${lng}`,
    json: true
  }, (err, res, body) => {
    console.log("temperature: ", body.currently.temperature);
    console.log("summary: ", body.currently.summary);
    console.log("icon: ", body.currently.icon);
  });
})