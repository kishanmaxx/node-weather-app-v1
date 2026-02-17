const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { title } = require('process');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname,'../public'));

const app = express();

//define paths for express configs
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'templates','views');
const partialsPath = path.join(__dirname,'templates','partials');

//Setup handlebars engine and its views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// app.get('',(req, res) => {
//     // res.send("Hello World ... !!!");
//     res.send("<h2>Your weathers</h2>");
// });

app.get('',(req, res) => {
    res.render('index',{
        title:'Weather App',
                name:'Kishan Shetty'
    });
});

// app.get('/help',(req, res) => {
//     // res.send("Help page ...");
//     res.send({name:"Kishan", age:36});
// });

app.get('/help',(req, res) => {
    // res.send("Help page ...");
    res.render('help',{helpText:'This is a helpful text',title:'Help page',name:'Kishan Shetty'});
});

// app.get('/about',(req, res) => {
//     // res.send("About page...");
//     res.send("<h1>About</h1>");
// });

app.get('/about',(req, res) => {
    res.render('about',{
        title:'About me',
        name:'Kishan Shetty'
    })
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'Address is mandatory'
        })
    }
    geocode(req.query.address,(err, {latitude,longitude}={})=>{
        if(err){
            return res.send({error:err});
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error});
            }
            res.send({
                forecast:forecastData,
                address:req.query.address,

            })
        })

    });
    // res.send("Weather page....");
    // res.send({weather:'Temporary',place:'Bijapur',address:req.query.address});
});

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term.'
        });
    }
    console.log(req.query.search)
    res.send({products:[]});
})

app.get('/help/*splat',(req,res)=>{
    // res.send('Help article not found..');
    res.render('404error',{
        title:'404',
        name:'Kishan Shetty',
        errorText:'Help article not found..'
    })
})

app.all('/*splat',(req,res)=>{
    // res.send('404 page');
    res.render('404error',{
        title:'404',
        name:'Kishan Shetty',
        errorText:'404 page'
    })
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})