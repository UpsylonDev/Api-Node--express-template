const express = require("express");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

const app = express();

// MIDLEWARES
app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json)
app.use(express.static("/public"));

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// INSTALLATION MONGOOSE
const mongUIRI = "mongodb+srv://upsy:pandore29m@cluster1-ru8ol.mongodb.net/mongotest?retryWrites" +
        "=true&w=majority"
mongoose.connect(mongUIRI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// VALIDATION
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connecté à ATLAS >>>>>>>>>>>>')
});

// RECUPERATION DES MODELS
const {myUsers, userMessages} = require('./MODELS/Users')

app.get('/ajouter', (req, res) => {

    // MONGOOSE- AJOUT DATAS
    var newUser = new myUsers({
        name: "Martin",
        surname: "sloveg",
        email: "mmm@gmail",
        phone: {
            number: "3456789"
        }
    });

    // MONGOOSE VALIDATION CHANGES
    newUser.save().then(() => {
            console.log("Gangements OK !")

        }).catch((err) => { console.log(err)})
});

app.get('/autre', (req, res) => {

    // MONGOOSE CREATION COLLETION + DATAS
    var newUser = new myUsers({
        name: "pierrot",
        message : " je suis pierot le fou"
    });

    // MONGOSE VALIDATION
    newUser.save().then(() => {
            console.log("Okkkk posté !")
            res.end()

    }).catch((err) => {
        console.log(err);
      });
})


app.get('/mess', (req, res) => {
    // MONGOOSE CREATION COLLETION + DATAS
    var newMessages = new userMessages({
      messages : "zeezrez",
    });
    
    // MONGOOSE VALIDATION CHANGES
    newMessages.save().then(() => {
      console.log("Creation")
      
    }).catch((err) => { console.log(err)})
  })


//********************************************************* */
app.listen(5000, () => {
    console.log("Lecture du port : 5000 >>>>>>>>>>>>>>>>>");
});
