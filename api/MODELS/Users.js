// MONGOOSE MODELS IMBRIQUES
var mongoose = require('mongoose');

// rendre possible l'utilisation des schemas
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId;

// definiton des shemas !jamais de contenu que types!
const UserTestSchema = new mongoose.Schema({
    name: String,
    surname : String,
    email : String,
    phone : {
        number : String,
        default : ""

    }, // accepter les messages qui viennent de la collection userMessages
    messages: [{ 
        type : Schema.Types.ObjectId, // ajoute l'id d'un message et non le message
        ref : 'userMessages' // fait reference à la COLLECTION userMessages
    }] 
});

const UserMessagesShema  = new mongoose.Schema({
    message : String,
    title : String,
    note : Number 

});

// regrouper le tout dans un model 'myUsers' est le nom de la collection
const myUsers = mongoose.model('myUsers', UserTestSchema);
const userMessages = mongoose.model('userMessages', UserMessagesShema);

module.exports = { myUsers, userMessages }