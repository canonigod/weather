let appId = "13fbfe01e01a37d2b25d32892f704549";
let units = "imperial";
let searchMethod;
let btn = document.getElementById("search-btn");
let input = document.getElementById("search-input");

function getSearchMethod(searchTerm) {
  if (
    searchTerm.length === 5 &&
    Number.parseInt(searchTerm) + "" === searchTerm
  ) {
    searchMethod = "zip";
  } else {
    searchMethod = "q";
  }
}

function searchWeather(searchTerm) {
  getSearchMethod(searchTerm);
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&${units}`
  )
    .then(result => {
      return result.json();
    })
    .then(result => {
      init(result);
    });
}

function init(resultFromServer) {
  switch (resultFromServer.weather[0].main) {
    case "Clear":
      document.body.style.background =
        'url("https://i.postimg.cc/0ywZMShQ/sunbg-copy.jpg")';
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundSize = "cover";
      document.getElementById("card").style.backgroundImage = 'url(")';
      break;

    case "Clouds":
      document.body.style.background =
        'url("https://i.postimg.cc/Y2R2Cs4m/foggy.jpgg")';
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundSize = "cover";
      document.getElementById("card").style.backgroundImage = "";
      break;

    case "Smoke":
    case "Foggy":
    case "Haze":
      document.body.style.background =
        "url('https://i.postimg.cc/Y2R2Cs4m/foggy.jpg')";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundSize = "cover";
      break;

    case "Rain":
    case "Drizzle":
    case "Mist":
      document.body.style.background =
        "url('https://i.postimg.cc/j5XTCDjr/rainbg.jpg')";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundSize = "cover";
      document.getElementById("card").style.backgroundImage = "";
      break;

    case "Thunderstorm":
      document.body.style.background =
        "url('https://i.postimg.cc/N0cZTQSG/thunder.jpg')";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundSize = "cover";
      document.getElementById("card").style.backgroundImage = "";
      break;

    case "Snow":
      document.body.style.background =
        'url("https://i.postimg.cc/Y2R2Cs4m/foggy.jpg")';
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundSize = "cover";
      document.getElementById("card").style.backgroundImage = "";
      break;

    default:
      break;
  }

  let weatherDescriptionHeader = document.getElementById(
    "weather-description-header"
  );
  let temperatureElement = document.getElementById("temperature");
  let humidityElement = document.getElementById("humidity");
  let windSpeedElement = document.getElementById("wind-speed");
  let cityHeader = document.getElementById("city-header");
  let icon = document.getElementById("icon-img");

  icon.src =
    "http://openweathermap.org/img/w/" +
    resultFromServer.weather[0].icon +
    ".png";

  let resultDescription = resultFromServer.weather[0].description;

  weatherDescriptionHeader.innerText =
    resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

  temperatureElement.innerHTML =
    Math.floor(((resultFromServer.main.temp - 273.15) * 9) / 5 + 32) + "&#176";

  windSpeedElement.innerHTML =
    "Winds at " + Math.floor(resultFromServer.wind.speed) + " m/s ";

  cityHeader.innerHTML = resultFromServer.name;

  humidityElement.innerHTML =
    "Humidity levels at " + resultFromServer.main.humidity + "%";

  setPositionForWeatherInfo();
}

function setPositionForWeatherInfo() {
  let weatherContainer = document.getElementById("weather-container");
  let weatherContainerHeight = weatherContainer.clientHeight;
  let weatherContainerWidth = weatherContainer.clientWidth;

  weatherContainer.style.left = `calc(50% - ${weatherContainerWidth / 2}px)`;
  weatherContainer.style.top = `calc(50% - ${weatherContainerHeight / 1.3}px)`;
  weatherContainer.style.visibility = "visible";
}

btn.addEventListener("click", () => {
  let searchTerm = input.value;
  if (searchTerm) {
    searchWeather(searchTerm);
  }
});
