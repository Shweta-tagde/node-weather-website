const express = require('express')
const path = require('path')
const hbs =require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
console.log(__dirname)
//console.log(__filename)
// console.log( path.join(__dirname, '../public'))
const app = express()
 const publicdirectory =path.join(__dirname, '../public')
 app.use(express.static(publicdirectory))

 //changing views folder name to template
 const viewPath =path.join(__dirname, '../templates/views')
 //creating partial for setting content like header which is common in all page
 const partialPath =path.join(__dirname,'../templates/partials')
 
 // how we can make page dynamic using hbs
 app.set("view engine","hbs") // now we create a file index.hbs so now we can del the index.html from public coz hbs gonna run
app.set('views',viewPath)
hbs.registerPartials(partialPath)

 app.get("", (req,res)=>{
     //res.render('index') 
     // now we provided value for index.hbs
     res.render('index',{
         title:'weather app',
         name:"andrew head"
     })
 })
 app.get("/about", (req,res)=>{
     //res.render('about') 
     // now we provided value for about.hbs
     res.render('about',{
         title:'About Me',
         name:"andrew"
     })
 })

 app.get("/help", (req,res)=>{
     //res.render('about') 
     // now we provided value for about.hbs
     res.render('help',{
         title:'HELP',
         name:"andrew",
         helptext :'This is some helpful text..'
     })
 })



 // when we want different route 
 // app.com , // app.com/help // app.com/about
 // app.get use for what to give as response when request on perticular route come

//  app.get ('', (req, res)=>{
// //       res.send ('hello express')
// // if we want to send html to client
// res.send('<h1> WEATHER </h1>')
//  })

//  app.get ('/help', (req, res)=>{
//       //res.send ('help express')
//       // if we want to send json in object
//     //   res.send ({
//     //       name : 'andrew',
//     //       age : 20
//     //   })
//       // if we want to send array of object
//       res.send ([{
//         name : 'andrew',
//         age : 20
//     },{
//     name2 : 'selena',
//     age1 : 45}])
 //})


//  app.get ('/about', (req, res)=>{
//       res.send ('<h1> about</h1>')
//  })

//  app.get ('/weather', (req, res)=>{
//       res.send ({
//           forecast: 'it is snowing',
//           location:'nyc'
//       })
//  })

 // sending the weather actual forecast and weather  in weather 

 app.get ('/weather', (req, res)=>{
     if(!req.query.address){
          return res.send({
             error:"you must provide a address"
         })
        }
        geocode(req.query.address,(error, {latitude,longitude,location}={})=>{
            if (error){ 
                 res.send ({error})

            }
            forecast(latitude,longitude,(error,forecastData)=>{
                if (error){
                    return res.send ({error})
                }
                res.send({
                    forecast:forecastData,
                    location,
                    address: req.query.address

                })
            })
        })
        //   res.send({
        //       forecast: "it is snowing",
        //       location:"nyc"
        //   })
     
    
    })




 // for 404 error 

 app.get ('/help/*', (req, res)=>{
    res.render(" 404 ",{
        title:"404",
        name:'andrew',
        errormessage:"help article not found"
    })
        
    
    })
 app.get ('*', (req, res)=>{
res.render("404",{
    title:404,
    name:'andrew',
    errormessage:"page not found"
})
    

})

 // start the server using app.listen
 app.listen(3000,()=>{
 console.log(" server is up on port 3000")
 })