var cityName = document.getElementById("searchfield");
var searchButton = document.getElementById("searchbtn");
var currentWeather = document.getElementById("currentweather");
var forecast = document.getElementById("");

function saveToLocalStorage(value) {
  
  const cities = JSON.parse(localStorage.getItem("cities")) || [];

  cities.push(value);

  localStorage.setItem("cities", JSON.stringify(cities));

  
}

function loadFromLocalStorage(value) {
  const cities = JSON.parse(localStorage.getItem("cities")) || [];

  // Display the recent search
  for (let i = 0; i < cities.length; i++) {
    const city = cities[i];

    console.log("City: ", city);

    // Create HTMl Element and add them to the page
  }
}

loadFromLocalStorage();

// dispaly todays weather in the large card
function displayCurrentWeather(data) {
  for (var i = 7; i < data.list.length; i +=7)
    var todayTemp = data.list[i];

    // Accessing values
    var temp = todayTemp.main.temp;

    var small = document.createElement('div')
    var cityName = document.createElement('div')
    var date = document.createElement('div')
    var icon = document.createElement('img')
    var tempEl = document.createElement('div')
    var humdity = document.createElement('div')
    var windSpeed = document.createElement('div')

    // adding values to the elements
    tempEl.innerText = "Temp: " + temp + " \u00B0F";

    currentWeather.appendChild(date)
    currentWeather.appendChild(cityName)  
    currentWeather.appendChild(tempEl)
    currentWeather.appendChild(humdity)
    currentWeather.appendChild(windSpeed)
    

}


function getApi(event) {
  event.preventDefault();
  var city = cityName.value;

  // Save to local storage
  saveToLocalStorage(city);

  
  console.log(city);
  var requestApi = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=56e4f4879148dccce2da9757a8e2f7f6&units=imperial`;

  //initiate API request
  fetch(requestApi)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      displayCurrentWeather(data);
      //weather 5 day here
      console.log(data);
    });
}

// loop over the data in incrents of 7 to offset the 3hr breakdown get 1 day increments
//display each day in a small card below the large card
// function weather5Day(data) {
//   for (var i = 7; i < data.list.length; i +=7)
//     var small = document.createElement('div')
//     var cityName = document.createElement('div')
//     var date = document.createElement('div')
//     var icon = document.createElement('img')
//     var temp = document.createElement('div')
//     var humdity = document.createElement('div')
//     var windSpeed = document.createElement('div')

// };

searchButton.addEventListener("click", getApi);

//Code below provided by instructor as a workaround to how the weather API works.
// const weatherDays = []
// let currDay = null

// sampleData.list.forEach( function(tsObj){

//   // Makes a moment date object for each record
//   const dateObj = moment.unix(tsObj.dt)

//   // Generate the day # for the day in the date object
//   const dateNum = dateObj.format("DDD")

//   // If the current date in tsObj hasn't had a record put into weatherDays, do that now
//   // Then skip over all other records for this day
//   if( dateNum !== currDay && weatherDays.length < 5 ){
//     weatherDays.push( tsObj )
//     currDay = dateNum
//   }

// })
