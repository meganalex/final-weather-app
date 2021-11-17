let now = new Date();
let time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${time}`;

let today = document.querySelector("#card-title");
today.innerHTML = `${currentDay}`;

////

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="five-day-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="five-temp">
          <span class="five-temp-max"> 18° </span>
          <span class="five-temp-min"> 12° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function search(event) {
  event.preventDefault();
  let input = document.querySelector("#city-search");

  let location = document.querySelector("#main-location");
  if (input.value) {
    location.innerHTML = `${input.value}`;
  } else {
    location.innerHTML = null;
    alert("Please type in a city");
  }
  let city = document.querySelector("#city-search").value;
  console.log(city);
  let apiKey = "3bc4c7ec3f401f2d634aee8e7ebb937d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let lookUp = document.querySelector("#search-form");
lookUp.addEventListener("submit", search);

////

function showTemperature(response) {
  console.log(response.data.main.temp);
  let newTemp = document.querySelector("#temperature");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#today");

  celTemp = response.data.main.temp;

  newTemp.innerHTML = Math.round(celTemp);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  iconElement.setAttribute("alt", response.data.weather[0].description);
  document.querySelector("#weather-info").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#main-location").innerHTML = response.data.name;
}

////

function yourPosition(position) {
  let apiKey = "3bc4c7ec3f401f2d634aee8e7ebb937d";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(yourPosition);
}

function showFarTemp(event) {
  event.preventDefault();
  let newTemp = document.querySelector("#temperature");
  let farTemperature = (celTemp * 9) / 5 + 32;
  newTemp.innerHTML = Math.round(farTemperature);
}

function showCelTemp(event) {
  event.preventDefault();
  let newTemp = document.querySelector("#temperature");
  newTemp.innerHTML = Math.round(celTemp);
}

let celTemp = null;

let button = document.querySelector("#your");
button.addEventListener("click", currentLocation);

let farLink = document.querySelector("#far-link");
farLink.addEventListener("click", showFarTemp);

let celLink = document.querySelector("#cel-link");
celLink.addEventListener("click", showCelTemp);

search("London");
displayForecast();
