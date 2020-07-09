console.log('javascript loaded');

const weatherForm=document.querySelector('form');
const seacrh=document.querySelector('input');
const forecastData=document.querySelector('#forecast');
const locationData=document.querySelector('#location');
const addressData=document.querySelector('#address');

forecastData.textContent='Loading....';
locationData.textContent='';
addressData.textContent='';

weatherForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  const location=seacrh.value;
    console.log(location);
    fetch('http://localhost:4000/weather?address='+ location).then((response)=>{
    response.json().then((error,data)=>{
        if(error){
       console.log(error)
           forecastData.textContent=error;
        }
        else
        {
            console.log(data);
        
            forecastData.textContent=data.forecast;
            locationData.textContent=data.location;
            addressData.textContent=data.address;

        }
    

    });
  
})
})