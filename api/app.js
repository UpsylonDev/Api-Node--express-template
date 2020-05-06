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

app.get('/mess', (req, res) => {
    // MONGOOSE CREATION ET AJOUT rapide
    var yann = myUsers({name: "yann"})
    yann
        .messages
        .push({message: "blalbalbdsf sdfsdfsdf sdfsd fsd"})
    yann
        .save()
        .catch((err) => console.log(err))
        res.end()
});


// app.get('/mess2', (req, res) => {

//     // MONGOOSE UPDATE + PUSH
//     const newMessage = { messages : 'hello2'}

//     myUsers.updateOne({ name : "yann"}, { $push: { messages: newMessage } })
//           .then(()=>{
//               console.log('Modifié !')
//             //   ...
//           }).catch(error => res.status(400).json({ error }));

          
          

// });
app.get('/mess3', (req, res) => {

    // MONGOOSE Creation collection imbriquées 

    /**
     * 1 créer un message
     * 2 le sauver 
     * 3 faire un push de son id vers le parent qui l'embarque
     *   afin de les lier
    */

    // 1 creation d'un document séparé
    var Newmessage = new  userMessages({ 
        message : "un messages complet ....",
        title : "Montitre 1",
        note : 5

    });
    
    // 2 sauvegarde
    Newmessage.save().then(()=>{ 
        console.log('sauvé')
        res.end()
        
    }).catch((err)=> console.log(err))

    // 3 pousser la reference dans le parent souhaité 
    myUsers.updateOne({ name : "yann"}, { $push: { messages: Newmessage } })
    .then((resp)=>{
        console.log('Modifié !')
    }).catch(error => res.status(400).json({ error }));

});

app.get('/liretout', (req, res)=>{

    
    // MONGOOSE POPULATE vers simple : 
    /**
     *  populate( 'la props du parent à remplir, 
     *  2eme arg la liste des props de l'enfant à integrer
     */
    myUsers.findOne({name : 'yann'}).populate('messages' , 'title message note')
    .exec((err, response)=>{
        // renvoyer la reponse au front
        console.log(response)
        res.json({
            yannMessages : response.messages[4]
        })

    });

    
})

//********************************************************* */
app.listen(5000, () => {
    console.log("Lecture du port : 5000 >>>>>>>>>>>>>>>>>");
});

