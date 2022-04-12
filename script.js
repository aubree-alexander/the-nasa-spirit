// global variables
var photo_key = 'UaWaPX64ifKiFlemQ73fWGXNMRw5uwk1H5Bt5Feg';
var weather_key = 'CECYA3AQSMBYUHF9N4VMZ53CK';
var zipCode = "53716";
var zipHistory = [];
var forecastContainer =$("#forecastContainer");

// display nasa background image
function backgroundImg() {
fetch(`https://api.nasa.gov/planetary/apod?api_key=${photo_key}&count=1`)
    .then(function (repsonse) {
        return repsonse.json()
    })
    .then(function (data) {
      console.log(data)
        $("#nasaExplain").html(data[0].explanation);
        $("#dateHolder").html(data[0].date);
        $("#photoHolder").find('img').attr("src", data[0].hdurl);
        // $("photoHolder").append("")
        $("body").css("background-image", "url(" + data[0].hdurl + ")")
    })
    .catch(function(error) {
        console.log(error)
    });
}


// api key for weather api
function zipSearch(){
$('#search').click(function(event){
    event.preventDefault();
    zipCode = $('#zipCodeInput').val();
    if (zipCode === "") {
        return;
    };
    zipHistory.push(zipCode);
    localStorage.setItem('zipCode', JSON.stringify(zipHistory));
    console.log(event);

    // Once we are able to fetch all the right weather data we will call the function below to generate the desired zipcode and can remove weatherForecast() at the bottom of the page
    // weatherForecast()
});
}

// to pull and display weather forecast
function weatherForecast() {
fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${zipCode}?key=${weather_key}`)
  .then(function(response) {
    return response.json()
  })
  .then(function(data) {
    console.log(data);

    var forecastArray = data.days;
    var weatherDataArray = [];
    console.log(forecastArray);

    $.each(forecastArray, function(i, data) {
        weatherInfo = {
            datetime: data.datetime,
            conditions: data.conditions,
            cloudcover: data.cloudcover,
            icon: data.icon,
            sunset: data.sunset,
            moonphase: data.moonphase
        };
        weatherDataArray.push(weatherInfo);
        console.log(weatherInfo);
    });
    
    for (var i = 0; i < weatherDataArray.length; i++) {
      var divCard = $('<div>');
      divCard.attr('class', 'max-w-sm rounded overflow-hidden shadow-lg');
      divCard.attr('style', 'max-width: 200px;');
      forecastContainer.append(divCard);

      var divHeader = $('<div>');
      divHeader.attr('class', 'font-bold text-xl mb-2');

      var date = weatherDataArray[i].datetime;
      divHeader.text(date);
      divCard.append(divHeader);

      var divBody = $('<div>');
      divBody.attr('class', 'card-body');
      divCard.append(divBody);

      var divIcon = $('<img>');
      divIcon.attr('class', 'icon');
      divIcon.attr('src', weatherDataArray[i].icon);
      divBody.append(divIcon);

      var conditionsP = $('<p>').text(`Conditions: ${weatherArray[i].conditions}.`);
      divBody.append(conditionsP);

      var cloudcoverP = $('<p>').text(`Cloudcover: ${weatherArray[i].cloudcover}`);
      divBody.append(cloudcoverP);

      var sunsetP = $('<p>').text(`Sunset: ${weatherArray[i].sunset}`);
      divBody.append(sunsetP);

      var moonphaseP = $('<p>').text(`Moonphase: ${weatherArray[i].moonphase}`);
      divBody.append(moonphaseP);
    };
  })
  .catch(function(error) {
    console.log(error);
  });
}

// function calls
backgroundImg();
zipSearch();
weatherForecast();