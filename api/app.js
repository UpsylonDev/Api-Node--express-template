const express = require("express");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

const app = express();

// MIDLEWARES
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json)
app.use(express.static("/public"));

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// INSTALLATION MONGOOSE
const mongUIRI = "mongodb+srv://upsy:pandore29m@cluster1-ru8ol.mongodb.net/mongotest?retryWrites=true&w=majority"
mongoose.connect( mongUIRI, {useNewUrlParser: true, useUnifiedTopology: true });

// VALIDATION  
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() { console.log('Connecté à ATLAS >>>>>>>>>>>>') });
 
// RECUPERATION DES MODELS
const { myUsers} = require('./MODELS/Users')

app.get('/', (req, res)=>{

    // MONGOOSE- UTILISER LE MODEL DEFINI (moule)
    // + entrer les données dans la Collection
    var newUser = new myUsers({ 
      name: "Martin",
      surname : "sloveg",
      email : "mmm@gmail",
      phone : {
          number : "3456789",
      }
    });

    // valider les modifications
    newUser.save().then(()=>{
      console.log("Okkkk posté !")
      
      res.status(200)
    }).catch((err)=>{
      console.log(err)
      
    })


      res.end()





  // res.status(200).json({
  //   test: "hello !!!!"
  // })
})



//********************************************************* */
app.listen(5000, () => {
  console.log("Lecture du port : 5000 >>>>>>>>>>>>>>>>>");
});
