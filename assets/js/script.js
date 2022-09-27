
var cityName = 

function getApi(){
  var requestApi = 'https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid=56e4f4879148dccce2da9757a8e2f7f6'

  //initiate API request
  fetch(requestApi)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {

    })
}



//Code below provided by instructor as a workaround to how the weather API works.
const weatherDays = []  
let currDay = null

sampleData.list.forEach( function(tsObj){

  // Makes a moment date object for each record
  const dateObj = moment.unix(tsObj.dt)

  // Generate the day # for the day in the date object
  const dateNum = dateObj.format("DDD")

  // If the current date in tsObj hasn't had a record put into weatherDays, do that now 
  // Then skip over all other records for this day
  if( dateNum !== currDay && weatherDays.length < 5 ){
    weatherDays.push( tsObj )
    currDay = dateNum
  }

})