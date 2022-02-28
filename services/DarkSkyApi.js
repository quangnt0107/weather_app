const request = require( "request" );
const { config } = require( "../config.js" );


function getWeatherStatus(lat, lng){
  request.get({
    url: `${config.darksky.url}/${config.darksky.key}/${lat},${lng}`,
    json: true
  }, (err, res, body)=>{
    if (err && err.code === "ENOTFOUND") return callback("Cannot connect to maps.googleapis.com");

    if (body.status === "ZERO_RESULTS") return callback("Address Not Found");

    return new Promise((resolve)=>{
      resolve({
        temperature: res.data.currently.temperature,
        summary: res.data.currently.summary,
        icon: res.data.currently.icon,
      })
    })
  })
}

module.exports = {
  getWeatherStatus
}