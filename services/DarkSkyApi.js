const { default: axios } = require( "axios" );


function getWeatherStatus(lat, lng){
  return axios.get(`${config.darksky.url}/${config.darksky.key}/${lat},${lng}`)
  .then(res => {
    // if res.err => handler err
    // else
    return Promise.resolve({
      temperature: res.data.currently.temperature,
      summary: res.data.currently.summary,
      icon: res.data.currently.icon,
    })
  })
  .catch(err=> Promise.reject(err))
}

module.exports = {
  getWeatherStatus
}