require("./models/db.js");
const express=require("express");
const path=require("path");
const expbhs=require("express-handlebars");
const bodyparser=require("body-parser");




//Set Express Application and PORT Listen
var app=express();
app.listen(3000,()=>{
    console.log('Express server started at port 3000');
});

//Set Views Directory   
app.path('views',path.join(__dirname,'/views/'));

//Set BodyParser
app.use(bodyparser.urlencoded({
    extended:true
}));
app.use(bodyparser.json());

//Handlebars Configuration
app.engine('hbs',expbhs(
    {
        extname:'hbs',
        defaultLayout:'mainLayouts',
        layoutsDir:__dirname+'/views/layouts/',
        runtimeOptions:{
            allowProtoPropertiesByDefault: true, //For Prototype Security
            allowProtoMethodsByDefault: true,//For Prototype Security
        }
        
    })
    );
app.set('view engine','hbs');


//Controllers Settings
const employeeController=require('./controller/employeeController');


app.use('/employee',employeeController);
