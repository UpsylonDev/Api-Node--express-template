const express = require("express");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');



const app = express();


// MIDLEWARES
app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json)
app.use(express.static("/public"));
const js = require('./test.json')
console.log(js)


app.get('/json', (req, res)=>{
    res.json(js )
})  

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// INSTALLATION MONGOOSE
const mongUIRI = "mongodb+srv://upsy:pandore29m@cluster1-ru8ol.mongodb.net/mongotest?retryWrites" +
        "=true&w=majority"
mongoose.connect(mongUIRI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// VALIDATION CONNEXION
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connecté à ATLAS >>>>>>>>>>>>')
});

// RECUPERATION DES MODELS = collections structurées 
const {myUsers, userMessages} = require('./MODELS/Users')

/**
 * Creation et ajout de datas
 */
app.post('/mess', (req, res) => {
    // MONGOOSE CREATION ET AJOUT rapide
    var yann = myUsers({name: "yann"})
    yann
        .messages
        .push({message: "blalbalbdsfd"})
    yann
        .save()
        .catch((err) => console.log(err))
        res.end()
});



/**
 * Update  + push dans un arrray
 */
app.put('/mess2', (req, res) => {

    const newMessage = { messages : 'hello2'}

    myUsers.updateOne({ name : "yann"}, { $push: { messages: newMessage } })
          .then(()=>{
              console.log('Modifié !')
            //   ...
          }).catch(error => res.status(400).json({ error }));

});

/**
 * Ajout de datas imbliquées (clés étrangères)
 * 
 * 
 */
app.post('/mess3', (req, res) => {

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

/**
 * Lecture de données imbiquées 
 * dans plusieurs collections
 *  et retour au front
 * 
 */
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

app.get('/test', (req, res)=>{
    console.log('ok')
    res.cookie('name_of_cookie', 'value_of_cookie', { maxAge: 900000, httpOnly: true });
    res.end()
})

// NODEJS COOKIES SET/GET
// npm install express cookie-parser --save
var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.get('/set', function(req, res){
    // setting cookies
    res.cookie('username', 'john doe', { maxAge: 900000, httpOnly: true });
    
    // Supprimmer le cookie
    res.cookie('username', 'john doe', { maxAge: -1, httpOnly: true });

    var username = req.cookies['username'];
    if (username) {
        console.log(username)
        
        return res.json({username});        
    }else {
        res.end()
    }
});


//********************************************************* */
app.listen(5000, () => {
    console.log("Lecture du port : 5000 >>>>>>>>>>>>>>>>>");
});

