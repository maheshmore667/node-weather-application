const path=require('path');
const request=require('request');


const express=require('express');
const hbs=require('hbs');
const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast');
const app=express();
const publicDirectoryPath=path.join(__dirname,'../public');
const viewspath=path.join(__dirname,'/template/views');
const partialpath=path.join(__dirname,'/template/partials');

app.set('view engine','hbs');
app.set('views',viewspath)
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialpath);

app.get('',(req,res)=>{
    res.render('index',{title:'weather app',
    name:'Mahesh More'})
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'weather app',
        name:'Mahesh More'
    })
})
   

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'you will find help here',
        title:'weather app',
        name:'Mahesh More'
    })
})
app.get('/weather', (req, res) => {
  
    if (!req.query.address) {
       return res.send({ error: 'please provide appropriate address' })
    } 
    geocode(req.query.address, (error, data) => {
        if (error) {
          return res.send({error})
        }

        forecast(data.latitude, data.longitude, callback = (error, forecastdata={}) => {

            if (error) {
                return res.send({error})
            }
            res.send({
                forecast:forecastdata,
                location:data.location,
                address:req.query.address
            })
        })
    })
        
  
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        name:'Mahesh More',
        title:'404',
        errorMessage:'Required document not found'
    });
})
app.get('*',(req,res)=>{
    res.render('404',{
        name:'Mahesh More',
        title:'404',
        errorMessage:'error 404,not found anything !'
    });
})

app.listen(4000,()=>{
    console.log('app is running on port 4000')
})