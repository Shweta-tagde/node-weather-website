//////////call back  abstraction calling forecast inside geocode////////////////
const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=20b783668e39e760bec92eecffdb4964&query='+ latitude +',' + longitude 
  
 request({url, json:true}, (error,{body})=>{
 if (error){
     callback ('unable to connect', undefined)

 }
 else if(body.error){
     callback("unable to find location", undefined)

 }
 else{
      callback (undefined,body.current.weather_descriptions[0]+ ' it is currently ' + body.current.temperature + " degree out . there is a"+ body.current.feelslike +' degree out')

 }
 })

}

module.exports = forecast