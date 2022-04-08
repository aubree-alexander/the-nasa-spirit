
//api key for NASA photo api
var photo_key = 'UaWaPX64ifKiFlemQ73fWGXNMRw5uwk1H5Bt5Feg'

fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=1`)
    
    .then(function (repsonse) {
        return repsonse.json()
    })
    .then(function (data) {
      // console.log(data)
        $("#explanationHolder").html(data[0].explanation);
        $("#dateHolder").html(data[0].date);
        $("#photoHolder").find('img').attr("src", data[0].hdurl);
        // $("photoHolder").append("")
        $("body").css("background-image", "url(" + data[0].hdurl + ")")
   

    })
    .catch(function(error) {
        console.log(error)
    })

//api key for weather api
// var weather_key = 'VZWgV0er6uU1OzceEKg64VTZPS1CWGn9aO3CD5hB'

// fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast&key=${weather_key}` 
//   )
//   .then(response => {
//     console.log(response);
//   })
//   .catch(err => {
//     console.error(err);
//   });