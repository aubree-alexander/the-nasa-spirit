// global variables
var photo_key = 'UaWaPX64ifKiFlemQ73fWGXNMRw5uwk1H5Bt5Feg';
var weather_key = 'CECYA3AQSMBYUHF9N4VMZ53CK';
var zipCode = "53716";
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
$('.search').click(function (event){
    event.preventDefault();
    zipCode = $(this).parent('.btnPar').siblings('.zipCodeInput').val();
    if (zipCode === "") {
        return;
    }
    console.log(event);

    // Once we are able to fetch all the right weather data we will call the function below to generate the desired zipcode and can remove weatherForecast() at the bottom of the page
    // weatherForecast()
});
}

// to pull and display weather forecast
function weatherForecast() {
fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${zipCode}?key=${weather_key}`)
  .then(function(response) {
    response.json().then(function(data) {
        console.log(data);


        // I was trying to make an array of all the data we want to pull and display in forecastContainer, but no luck finding the right path T_T

        // var forcastArray = response.data.list;
        // var weatherDataArray = [];
        // $.each(forcastArray, function(i, value) {
        //     console.log(this);
        //     testObj = {
        //         datetime: value.dt_txt.split("")[0],
        //         cloudcover: ,

        //     }

        // })
    })
  })
  .catch(function(error) {
    console.log(error);
  });
}

// function calls
backgroundImg();
zipSearch();
weatherForecast();