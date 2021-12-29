const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const path = require('path')
const express = require('express')
const hbs = require('hbs')

console.log(__dirname)

// Define paths for Express config
const app = express()
const port = process.env.PORT || 3000

const publicDir = path.join(__dirname, '../public')
const views = path.join(__dirname, '../templates/views')
const partials = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views location (if view folder is not named views)
app.set('view engine', 'hbs')
app.set('views', views)
hbs.registerPartials(partials)

// Set up static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Leo'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Leonardo Rios'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        text: 'This is the function help',
        title: 'Help',
        name: 'Leo'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address'
        })
    }
    geocode(req.query.address, (error, data)=>{
        if (error){
           return res.send({error})
        }
        forecast(data.latitude, data.longitude, (error2, data2)=>{
            if(error2){
                res.send(error2)
            }
            res.send({
                data2,
                loc: data.location,
                address: req.query.address
            })
        })
        
    })
   
})


app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: {}
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        text: 'Help article not found',
        name: 'Leo'
    })
})

app.get('*', (req, res)=>{
    res.render('404',{
        text: 'My 404 page',
        name: 'Leo'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})