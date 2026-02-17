const request = require('postman-request');
const geocode = (address,callback) => {
    const url = `http://api.positionstack.com/v1/forward?access_key=d5e3e2dbf6e286c92f5ba5cd98a7a864&query=${encodeURIComponent(address)}&limit=1`;
    request({
        url:url,
        json:true
    },(error, {body}={}) => {
        console.log(body);
        if(error){
            callback('Unable to connect to location services !',undefined);
        }
        else if(body.error){
            callback('Unable to connect to location services !',undefined);
        }
        else if(body.data.length===0){
            callback('Unable to find the given location.',undefined);
        }
        else{
            console.log(body)
        callback(undefined,{latitude:body.data[0].latitude,longitude:body.data[0].longitude});
    }
    })

}
module.exports = geocode;