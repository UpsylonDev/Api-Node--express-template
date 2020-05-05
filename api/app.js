const express = require("express");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

const app = express();

// MIDLEWARES
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json)
app.use(express.static("/public"));

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const mongUIRI = "mongodb+srv://upsy:pandore29m@cluster1-ru8ol.mongodb.net/mongotest?retryWrites=true&w=majority"
mongoose.connect( mongUIRI, {useNewUrlParser: true, useUnifiedTopology: true });

 

app.get('/', (req, res)=>{
  res.status(200).json({
    test: "helle"
  })
})



//********************************************************* */
app.listen(5000, () => {
  console.log("Lecture du port : 5000 >>>>>>>>>>>>>>>>>");
});
