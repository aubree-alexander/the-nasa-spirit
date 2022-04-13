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
    weatherForecast()
});
};

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
    
    for (var i = 0; i < 5; i++) {
      var divCard = $('<div>');
      divCard.attr('class', 'max-w-sm rounded overflow-hidden shadow-lg');
      divCard.attr('style', 'max-width: 400px;');
      forecastContainer.append(divCard);

      var divHeader = $('<div>');
      divHeader.attr('class', 'divHeader font-bold text-xl mb-2');

      var date = weatherDataArray[i].datetime;
      divHeader.text(date);
      divCard.append(divHeader);

      var divBody = $('<div>');
      divBody.attr('class', 'card-body');
      divCard.append(divBody);

      var divIcon = $('<img>');
      divIcon.attr('class', 'icon');
      divIcon.attr('src', getIcon());
      // divBody.append(divIcon);
      console.log(weatherDataArray);

      var conditionsP = $('<p>').text(`Conditions: ${weatherDataArray[i].conditions}.`);
      // divBody.append(conditionsP);

      var cloudcoverP = $('<p>').text(`Cloudcover: ${weatherDataArray[i].cloudcover}`);
      // divBody.append(cloudcoverP);

      var sunsetP = $('<p>').text(`Sunset: ${weatherDataArray[i].sunset}`);
      // divBody.append(sunsetP);

      var moonphaseP = $('<p>').text(`Moonphase: ${weatherDataArray[i].moonphase}`);
      divBody.append(divIcon, conditionsP, cloudcoverP, sunsetP, moonphaseP);
    };
  })
  .catch(function(error) {
    console.log(error);
  });
}

// icon function if statement
function getIcon() {
    if (data[0].icon = snow) {
      $(divIcon).innerHTML("./weathericons/snow.png")
    } else if (data[0].icon = snow-showers-day) {
      $(divIcon).innerHTML("./weathericons/snow-showers-day.png")
    } else if (data[0].icon = snow-showers-night) {
      $(divIcon).innerHTML("./weathericons/snow-showers-night.png")
    } else if (data[0].icon = thunder-rain) {
      $(divIcon).innerHTML("./weathericons/thunder-rain.png")
    } else if (data[0].icon = thunder-showers-day) {
      $(divIcon).innerHTML("./weathericons/thunder-showers-day.png")
    } else if (data[0].icon = thunder-showers-night) {
      $(divIcon).innerHTML("./weathericons/thunder-showers-night.png")
    } else if (data[0].icon = rain) {
      $(divIcon).innerHTML("./weathericons/rain.png")
    } else if (data[0].icon = showers-day) {
      $(divIcon).innerHTML("./weathericons/showers-day.png")
    } else if (data[0].icon = showers-night) {
      $(divIcon).innerHTML("./weathericons/showers-night.png")
    } else if (data[0].icon = fog) {
      $(divIcon).innerHTML("./weathericons/fog.png")
    } else if (data[0].icon = wind) {
      $(divIcon).innerHTML("./weathericons/wind.png")
    } else if (data[0].icon = cloudy) {
      $(divIcon).innerHTML("./weathericons/cloudy.png")
    } else if (data[0].icon = partly-cloudy-day) {
      $(divIcon).innerHTML("./weathericons/partly-cloudy-day.png")
    } else if (data[0].icon = partly-cloudy-night) {
      $(divIcon).innerHTML("./weathericons/partly-cloudy-night.png")
    } else if (data[0].icon = clear-day) {
      $(divIcon).innerHTML("./weathericons/clear-day.png")
    } else if (data[0].icon = clear-night) {
      $(divIcon).innerHTML("./weathericons/clear-night.png")
    }
}

// function calls
backgroundImg();
zipSearch();