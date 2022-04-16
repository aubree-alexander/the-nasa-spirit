// global variables
var photo_key = 'UaWaPX64ifKiFlemQ73fWGXNMRw5uwk1H5Bt5Feg';
var weather_key = 'CECYA3AQSMBYUHF9N4VMZ53CK';
var zipCode = "53716";
var zipHistory = [];
var historyContainer = $('.cityHistory');
var forecastContainer =$("#forecastContainer");

// display nasa background image
function backgroundImg() {
fetch(`https://api.nasa.gov/planetary/apod?api_key=${photo_key}&count=1`)
    .then(function (repsonse) {
        return repsonse.json()
    })
    .then(function (data) {
      //console.log(data)
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


function loadHistory() {
  if (localStorage.getItem('zipCode')) {
    zipHistory = JSON.parse(localStorage.getItem('zipCode'))
  } else {
    localStorage.setItem('zipCode', JSON.stringify(zipHistory))
  }

}


// api key for weather api
function zipSearch(){
$('#search').click(function(event){
    event.preventDefault();
    zipCode = $('#zipCodeInput').val();
    if (zipCode === "") {
        return;
    };
    forecastContainer.empty();
    if (zipHistory.length < 4) {
      zipHistory.push(zipCode);
      localStorage.setItem('zipCode', JSON.stringify(zipHistory));
     
      getHistory();
    }

    weatherForecast()
});
};

// function to display previously searched cities
function getHistory() {
  historyContainer.empty();

  for (var i = 0; i < zipHistory.length; i++) {
      var rowEl = $('<row>');
      var btnEl = $('<button>').text(`${zipHistory[i]}`);

      rowEl.addClass('row hisBtnRow');
      btnEl.addClass('btn btn-outline-secondary histBtn');
      btnEl.attr('type', 'button');
      btnEl.attr('id', 'search');

      historyContainer.prepend(rowEl);
      rowEl.append(btnEl);
    } if (!zipCode) {
       return;
      };


  // displays city info once histBtn is clicked
  $('.histBtn').click(function(event) {
    event.preventDefault();
      zipCode = $(this).text();
      console.log(zipCode)
      if (zipCode === "") {
          return;
      };
      localStorage.setItem('zipCode', JSON.stringify(zipHistory));
      forecastContainer.empty();
      getHistory();

      weatherForecast()

  })

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
    //console.log(forecastArray);

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
        //console.log(weatherInfo);
    });
    
    for (var i = 0; i < 5; i++) {
      var divCard = $('<div>');
      divCard.attr('class', 'max-w-sm rounded shadow-lg' );
      divCard.attr('style', 'max-width: 15%; display: inline-block; margin: 0 5px; vertical-align:bottom;');
      forecastContainer.append(divCard);

      var divHeader = $('<div>');
      divHeader.attr('class', 'divHeader font-bold text-xl mb-2');

      var date = weatherDataArray[i].datetime;
      divHeader.text(date);
      divCard.append(divHeader);

      var divBody = $('<div>');
      divBody.attr('class', 'card-body');
      divCard.append(divBody);
      divBody.append(divHeader);
      var divIcon = $('<img>');
      divIcon.attr('class', 'icon');
      divIcon.attr('src', getIcon());
      // divBody.append(divIcon);
      //console.log(weatherDataArray);

      var conditionsP = $('<p>').text(`Conditions: ${weatherDataArray[i].conditions}.`);
      // divBody.append(conditionsP);

      var cloudcoverP = $('<p>').text(`Cloudcover: ${weatherDataArray[i].cloudcover}`);
      // divBody.append(cloudcoverP);

      var sunsetP = $('<p>').text(`Sunset: ${weatherDataArray[i].sunset}`);
      // divBody.append(sunsetP);

      var moonphaseP = $('<p>').text(`Moonphase: ${weatherDataArray[i].moonphase}`);
      divBody.append(divIcon, conditionsP, cloudcoverP, sunsetP, moonphaseP);
    };

   
 // icon function if statement
 function getIcon() {
  if (data.days[i].icon == "snow") {
    return "./weatherIcons/snow.png";

  } else if (data.days[i].icon == "snow-showers-day") {
    return "./weatherIcons/snow-showers-day.png"

  } else if (data.days[i].icon == "snow-showers-night") {
    return "./weatherIcons/snow-showers-night.png"

  } else if (data.days[i].icon == "thunder-rain") {
    return "./weatherIcons/thunder-rain.png"

  } else if (data.days[i].icon == "thunder-showers-day") {
    return "./weatherIcons/thunder-showers-day.png"

  } else if (data.days[i].icon == "thunder-showers-night") {
    return "./weatherIcons/thunder-showers-night.png"

  } else if (data.days[i].icon == "rain") {
    return "./weatherIcons/rain.png"

  } else if (data.days[i].icon == "showers-day") {
    return "./weatherIcons/showers-day.png"

  } else if (data.days[i].icon == "showers-night") {
    return "./weatherIcons/showers-night.png"
  
  } else if (data.days[i].icon == "fog") {
    return "./weatherIcons/fog.png"

  } else if (data.days[i].icon == "wind") {
    return "./weatherIcons/wind.png"

  } else if (data.days[i].icon == "cloudy") {
    return "./weatherIcons/cloudy.png"
    
  } else if (data.days[i].icon == "partly-cloudy-day") {
    return "./weatherIcons/partly-cloudy-day.png"

  } else if (data.days[i].icon == "partly-cloudy-night") {
    return "./weatherIcons/partly-cloudy-night.png"

  } else if (data.days[i].icon == "clear-day") {
    return "./weatherIcons/clear-day.png"
    
  } else if (data.days[i].icon == "clear-night") {
    return "./weatherIcons/clear-night.png"
  
  } else if (data.days[i].icon == "rain-snow-showers-day") {
    return "./weatherIcons/rain-snow-showers-day.png"

  } else if (data.days[i].icon == "rain-snow-showers-night") {
    return "./weatherIcons/rain-snow-showers-night.png"

  } else if (data.days[i].icon == "rain-snow") {
    return "./weatherIcons/rain-snow.png"

  } else if (data.days[i].icon == "sleet") {
    return "./weatherIcons/sleet.png"

  } else if (data.days[i].icon == "thunder") {
    return "./weatherIcons/thunder.png"
  }
}
})
.catch(function(error) {
console.log(error);
});
}


// function calls
backgroundImg();
zipSearch();
loadHistory();
getHistory();
