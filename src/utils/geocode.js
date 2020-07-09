const request=require('request');



const geocode=(address,callback)=>{
    const mapboxurl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibWFoZXNobW9yZTY2NyIsImEiOiJja2J4cjE2eWYwbDJsMnFsamtveDVrenVxIn0.znoHwHs5NZGXf5O-vMgH4Q';
    request({url:mapboxurl,json:true},(error,response)=>{
        if(error)
        {
            callback('Unable to connect mapbox services',undefined);
        
        }else if(response.body.features.length===0){
            callback(undefined,'Unable to find location')
        }
        else{
             callback(undefined,{
                longitude  :  + response.body.features[0].center[0],
                latitude  :  + response.body.features[0].center[1],
                location: response.body.features[0].place_name
             })
           
           
        }
    })
}
module.exports=geocode;