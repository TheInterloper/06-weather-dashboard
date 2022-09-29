var cityName = document.getElementById("searchfield");
var searchButton = document.getElementById("searchbtn");
var currentWeather = document.getElementById("currentweather");
var forecast = document.getElementById("forecast");
var container = document.getElementById("container");

function saveToLocalStorage(value) {
  
  const cities = JSON.parse(localStorage.getItem("cities")) || [];

  cities.push(value);

  localStorage.setItem("cities", JSON.stringify(cities));

  var cityname = value

  cityname = document.createElement("p")
  container.append(cityname.text)
  
}

function loadFromLocalStorage(value) {
  const cities = JSON.parse(localStorage.getItem("cities")) || [];

  // Display the recent search
  for (let i = 0; i < cities.length; i++) {
    const city = cities[i];

    
   // Create HTMl Element and add them to the page

  }
}

loadFromLocalStorage();

// dispaly todays weather in the large card
function displayCurrentWeather(data) {
    // Accessing values
    var tTemp = data.list[0].main.temp;
    var tDate = data.list[0].dt;
    var tCity = data.city.name;
    var tHumid = data.list[0].main.humidity;
    var tWind = data.list[0].wind.speed;

    var card = document.createElement("div")
    var cityName = document.createElement('div')
    var date = document.createElement('div')
    var icon = document.createElement('img')
    var tempEl = document.createElement('div')
    var humidity = document.createElement('div')
    var windSpeed = document.createElement('div')

    // adding values to the elements
    date.innerText = moment.unix(tDate).format("MM/DD/YYYY");
    cityName.innerText = tCity;
    tempEl.innerText = "Temp: " + tTemp + " \u00B0F";
    humidity.innerText = "Humidity: " + tHumid + " %";
    windSpeed.innerText = "Wind Speed: " + tWind + " MPH"

    card.append(date, cityName, tempEl, humidity, windSpeed)
    currentWeather.append(card)
}

// loop over the data in incrents of 7 to offset the 3hr breakdown get 1 day increments
//display each day in a small card below the large card

function weather5Day(data) {
  for (var i = 7; i < data.list.length; i +=7){
    
    var tTemp = data.list[i].main.temp;
    var tDate = data.list[i].dt;
    var tCity = data.city.name;
    var tHumid = data.list[i].main.humidity;
    var tWind = data.list[i].wind.speed;

    var card = document.createElement("div")
    var cityName = document.createElement('div')
    var date = document.createElement('div')
    var icon = document.createElement('img')
    var tempEl = document.createElement('div')
    var humidity = document.createElement('div')
    var windSpeed = document.createElement('div')

    date.innerText = moment.unix(tDate).format("MM/DD/YYYY");
    cityName.innerText = tCity;
    tempEl.innerText = "Temp: " + tTemp + " \u00B0F";
    humidity.innerText = "Humidity: " + tHumid + " %";
    windSpeed.innerText = "Wind Speed: " + tWind + " MPH"

    card.append(date, cityName, tempEl, humidity, windSpeed)
    forecast.append(card)

  }
};

function getApi(event) {
  event.preventDefault();
  var city = cityName.value;

  currentWeather.innerHTML = "";
  forecast.innerHTML = "";

  // Save to local storage
  saveToLocalStorage(city);

  
  // console.log(city);
  var requestApi = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=56e4f4879148dccce2da9757a8e2f7f6&units=imperial`;

  //initiate API request
  fetch(requestApi)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      displayCurrentWeather(data);
      weather5Day(data)
      console.log(data);
    });
}




searchButton.addEventListener("click", getApi);


