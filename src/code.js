import "./style.css";
import { cities } from "./cities.js";
const weatherTemp = document.getElementById("temp");
const weatherHumidity = document.getElementById("humidity");
const weatherCloud = document.getElementById("cloud");
const filtered = document.getElementById("suggestions");
const cityInput = document.getElementById("city-input");
const search = document.getElementById("search-btn");
const location = document.getElementById("location");

async function getweather(city) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=MRUH2GH2SR5JGTFUGQ7S37SNB`,
  );
  const weatherData = await response.json();
  const currTempF = weatherData.currentConditions.temp;
  const currTempC = currTempF - 32;
  const currHumidity = weatherData.currentConditions.humidity;
  const currCloud = weatherData.currentConditions.cloudcover;

  weatherTemp.innerHTML = "Current Temperature: " + currTempF + " °F";
  weatherHumidity.innerHTML = "Current Humidity: " + currHumidity + "%";
  weatherCloud.innerHTML = "Current Cloud Cover: " + currCloud + "%";

  console.log(weatherData.currentConditions);
}

cityInput.addEventListener("input", () => {
  const search = cityInput.value.toLowerCase();

  const filteredCities = cities.filter((location) => {
    const city = location.city.toLowerCase();
    const country = location.country.toLowerCase();

    return city.startsWith(search) || country.includes(search);
  });

  suggestions.innerHTML = "";

  filteredCities.forEach((location) => {
    const option = document.createElement("div");
    option.textContent = `${location.city}, ${location.country}`;
    option.classList.add("cities");
    option.addEventListener("click", () => {
      cityInput.value = option.textContent;
      suggestions.innerHTML = "";
    });
    suggestions.appendChild(option);
  });

  filteredCities.forEach((location) => {
    if (cityInput.value == `${location.city}, ${location.country}`) {
      suggestions.innerHTML = "";
    }
  });

  if (cityInput.value === "") {
    suggestions.innerHTML = "";
  }
});

search.addEventListener("click", () => {
  location.innerHTML = cityInput.value;
  const city = cityInput.value.split(",")[0];

  getweather(city);
  cityInput.value = "";
});
