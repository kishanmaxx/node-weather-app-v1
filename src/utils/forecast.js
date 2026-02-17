const request = require('postman-request');
const forecast = (latitude, longitude, callback) => {
const url = 'https://api.weatherstack.com/current?access_key=abb3e82db81bf2403391c7d0df43228d&query='+latitude+','+longitude+'&units=m';

// request({ url : url, json:true },(error, response) => {
    request({ url : url, json:true },(error, {body}) => {
    if(error){
        callback("Error : " + error, undefined);
    }
    else if(body.error){
        callback('Unable to find the given location.', undefined);
    }
    else{
    // console.log(response);
    // const data = JSON.parse(response.body);
    callback(undefined, `It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.`);
}
});

};
module.exports = forecast;