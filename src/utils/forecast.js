const request = require('request')

// const url = 'http://api.weatherstack.com/current?access_key=abc87c47fda31b7fe47884b6f8640190&query=37.8267,-122.4233'

// request({url: url, json: true}, (error, response)=>{
//     // const data = JSON.parse(response.body)
//     // console.log(data.current)
//     if (error){
//         console.log('Unable to connect to weather service')
//     } else if (response.body.error) {
//         console.log('Unable to find location')
//     }else {
//         const temperature = response.body.current.temperature
//         const feelslike = response.body.current.feelslike
//         console.log('Current temperature is ' +temperature + " but it feels like " + feelslike)
//     }  
// })

const forecast = (lat, long, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=abc87c47fda31b7fe47884b6f8640190&query='+encodeURIComponent(lat)+','+encodeURIComponent(long)
    request({url: url, json: true}, (error, response)=>{
    if (error){
        callback('Unable to connect to weather service', undefined)   
    }else if (response.body.error) {
         callback('Unable to find location', undefined)
    }else {
        const temperature = response.body.current.temperature
        const feelslike = response.body.current.feelslike
        callback(undefined,'Current temperature is ' +temperature + " but it feels like " + feelslike)
    } 
    })
}

module.exports = forecast