const request = require("request");

const geocode = function (address, callback) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYWxsZW5saW45MCIsImEiOiJja2NvZGE3Y3QwM3JuMzBxaTV6Ym81eWV2In0.7nYUE26c5bCIpZFkOxPIpA&limit=1`;

  request({ url, json: true }, function (error, { body }) {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      const { center: center, place_name: location } = body.features[0];
      callback(undefined, {
        longitude: center[0],
        latitude: center[1],
        location,
      });
    }
  });
};

module.exports = geocode;
