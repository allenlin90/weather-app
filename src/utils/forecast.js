const request = require("request");

function forecast(long, lat, callback) {
  const url = `http://api.weatherstack.com/current?access_key=08d4f0c107bfb486eafb2bc98d318866&query=${lat},${long}`;
  // find access token from weather stack
  request({ url, json: true }, function (error, { body }) {
    const data = body.current;
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find the location", undefined);
    } else {
      callback(
        undefined,
        `${data.weather_descriptions[0]}. It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out.`
      );
    }
  });
}

module.exports = forecast;
