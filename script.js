var photo_key = 'UaWaPX64ifKiFlemQ73fWGXNMRw5uwk1H5Bt5Feg'
//this link below is just one that I randomly used to confirm that this API can at least be connected to. the variable above is the key i was assigned. 
fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=5`)
    
    .then(function (repsonse) {
        return repsonse.json()
    })
    .then(function (data) {
        console.log(data[0])
    })
    .catch(function(error) {
        console.log(error)
    })

//Alright. This is the weather API. I'm honestly not too sure what the issue is here. I reviewed their website and after some lengthy searching I found our key. But I can't find an appropriate HTML link to fetch with (at least thats how it seems to me.) Hopefully one of you can figure out what im doing wrong. It's also almost midnight so I wouldnt be surprised if this is just user error.
var weather_key = 'VZWgV0er6uU1OzceEKg64VTZPS1CWGn9aO3CD5hB'

fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast&key=${weather_key}` 
 )
.then(response => {
  console.log(response);
})
.catch(err => {
  console.error(err);
});