const { config } = require("../config");
const axios = require("axios");

const getWeatherStatus = (lat, lng) => {
  return axios.get(`${config.darksky.url}/${config.darksky.key}/${lat},${lng}`)
    .then(res => {
      // Hoc Vien handle error tuong tu GoogleApis

      return Promise.resolve({
        temperature: res.data.currently.temperature,
        summary: res.data.currently.summary,
        icon: res.data.currently.icon,
      })
    })
    .catch(err => {
      // Hoc Vien handle error tuong tu GoogleApis
    })
}


module.exports = {
  getWeatherStatus
}