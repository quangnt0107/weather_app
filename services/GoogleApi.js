const request = require( "request" );
const { config } = require( "../config.js" );


function getLocation(address){
  request.get({
    url: `${config.google.url}?key=${config.google.key}&address=${address}`,
    json: true
  }, (err, res, body)=>{
    if (err && err.code === "ENOTFOUND") return callback("Cannot connect to maps.googleapis.com");

    if (body.status === "ZERO_RESULTS") return callback("Address Not Found");

    return new Promise((resolve)=>{
      resolve({
        formatted_address: res.data.results[0].formatted_address,
        lat: res.data.results[0].geometry.location.lat,
        lng: res.data.results[0].geometry.location.lng,
      })
    })
  })
}

module.exports = {
  getLocation
}