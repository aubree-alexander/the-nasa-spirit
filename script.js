var photo_key = 'UaWaPX64ifKiFlemQ73fWGXNMRw5uwk1H5Bt5Feg';
var weather_key = 'CECYA3AQSMBYUHF9N4VMZ53CK';
zipCode = "";

fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=1`)
    
    .then(function (repsonse) {
        return repsonse.json()
    })
    .then(function (data) {
      console.log(data)
        $("#explanationHolder").html(data[0].explanation);
        $("#dateHolder").html(data[0].date);
        $("#photoHolder").find('img').attr("src", data[0].hdurl);
        // $("photoHolder").append("")
        $("body").css("background-image", "url(" + data[0].hdurl + ")")
   

    })
    .catch(function(error) {
        console.log(error)
    });

// api key for weather api
$('.search').click(function (event){
    event.preventDefault();
    zipCode = $(this).parent('.btnPar').siblings('.zipCodeInput').val();
    if (zipCode === "") {
        return;
    }
    console.log(event);
});




fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast&key=${weather_key}` 
  )
  .then(function (response) {
    console.log(response);
    return response.json()
  })
  .catch(function(error) {
    // console.log(error);
  });