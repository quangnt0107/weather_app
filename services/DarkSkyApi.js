const request = require( "request" );
const { config } = require( "../config.js" );


function getWeatherStatus(lat, lng, callback){
  request.get({
    url: `${config.darksky.url}/${config.darksky.key}/${lat},${lng}`,
    json: true
  }, (err, res, body)=>{
    console.log(err)

    callback(null, {
      temperature: body.currently.temperature,
      summary: body.currently.summary,
      icon: body.currently.icon,
    })
  })
}

module.exports = {
  getWeatherStatus
}