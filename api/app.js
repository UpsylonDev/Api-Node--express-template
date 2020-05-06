// NODE JS TEMPLATE - APP BASE 
const express = require("express");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

const app = express();

// MIDLEWARES
app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json)
app.use(express.static("/public"));

// ::::::::::::::::::::::::::::::::::::
app.get('/', (req, res)=>{
    
})




// ::::::::::::::::::::::::::::::::::::
app.listen(5000, () => {
    console.log("Lecture du port : 5000 >>>>>>>>>>>>>>>>>");
});

