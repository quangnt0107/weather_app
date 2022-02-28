const request = require( "request" );
const { config } = require( "../config.js" );

function getLocation(address, callback) {
  request.get({
    url: `${config.google.url}?key=${config.google.key}&address=${address}`,
    json: true
  }, (err, res, body)=>{
    if (err && err.code === "ENOTFOUND") return callback("Cannot connect to maps.googleapis.com");

    if (body.status === "ZERO_RESULTS") return callback("Address Not Found");

    callback(null, {
      formatted_address: body.results[0].formatted_address,
      lat: body.results[0].geometry.location.lat,
      lng: body.results[0].geometry.location.lng,
    });
  })
}

module.exports = {
  getLocation
}