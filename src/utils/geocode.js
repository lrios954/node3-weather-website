const request = require('request')


// const url2 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibHJpb3M5NTQiLCJhIjoiY2t4bTZqc2R4M3h5YjJ1b2MzOXkzdHFqdiJ9.pILNK5K55KfmV2yzwxk8zA&limit=1'
// const error = 'https://api.mapbox.com/geocoding/v5/mapbox.places/0nles.json?access_token=pk.eyJ1IjoibHJpb3M5NTQiLCJhIjoiY2t4bTZqc2R4M3h5YjJ1b2MzOXkzdHFqdiJ9.pILNK5K55KfmV2yzwxk8zA&limit=1'

// request({url: error, json: true}, (error, response)=>{
//     if (error) {
//         console.log('Unable to connect to location services')
//     } else if (response.body.features.length === 0) {
//         console.log('Unable to find this location')
//     } else {
//     //const data = JSON.parse(response)
//     console.log(response.body.features[0].center[0])
//     console.log(response.body.features[0].center[1])
//     }

// })

const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibHJpb3M5NTQiLCJhIjoiY2t4bTZqc2R4M3h5YjJ1b2MzOXkzdHFqdiJ9.pILNK5K55KfmV2yzwxk8zA&limit=1'
    request({url:url, json:true}, (error, response)=>{
        if (error){
            callback('Unable to connect to location services', undefined)
        } else if (response.body.features.length ===0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode