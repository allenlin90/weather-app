console.log("Client side JavaScript file is loaded!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const location = search.value;

  if (!location) {
    return console.log(`You didn't give a valid address!`);
  }

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch(`http://localhost:3000/weather?address=${location}`).then(function (
    response
  ) {
    response.json().then(function (data) {
      if (data.geocodeError) {
        messageOne.textContent = data.geocodeError;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
