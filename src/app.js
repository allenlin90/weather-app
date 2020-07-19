const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlerbars engine and views location
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", function (req, res) {
  res.render("index", {
    title: "Weather",
    name: "Allen",
  });
});

app.get("/about", function (req, res) {
  res.render("about", {
    title: "About Me",
    name: "Allen",
  });
});

app.get("/help", function (req, res) {
  res.render("help", {
    helpText: "This is some helpful text!",
    title: "Help",
    name: "Allen Lin",
  });
});

app.get("/weather", function (req, res) {
  if (!req.query.address) {
    return res.send({
      error: "You msut provide a valid address",
    });
  }
  const address = req.query.address;
  geocode(address, function (error, { latitude, longitude, location } = {}) {
    if (error) {
      return res.send({ geocodeError: `${error}` });
    }
    forecast(longitude, latitude, (error, forecastData) => {
      if (error) {
        return res.send({ forecastError: `${error}` });
      }
      return res.send({
        forecast: forecastData,
        address: address,
        location: location,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term!",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", function (req, res) {
  res.render("help404", {
    title: "404",
    errorMessage: "Help article not found.",
    name: "Allen",
  });
});

app.get("*", function (req, res) {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found",
    name: "Allen",
  });
});

app.listen(3000, function () {
  console.log("Server has started on port 3000");
});
