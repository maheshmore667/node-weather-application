const request=require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b574564f633a38c75ae0d2ab1edddef2&query=' + latitude + ',' + longitude;


    request({ url: url, json: true }, (error, response) => {

        if (error) {
            callback('Unable to connect internet',undefined)
        } else if (response.body.error) {
            callback('Unable to find location',undefined)
        }
        else {

           callback(undefined,response.body.current.weather_descriptions[0] + '. today\'s temperature is ' + response.body.current.temperature + ' degrees and ' + response.body.current.precip + '% chance of rain');
        }

    })

}

module.exports=forecast;