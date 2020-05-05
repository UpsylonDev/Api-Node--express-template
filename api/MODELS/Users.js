// MONGOOSE  DEFINITION MODELS
var mongoose = require('mongoose');

// rendre possible l'utilisation des schemas
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId;

// definiton des shemas 
const UserTestSchema = new mongoose.Schema({
    name: String,
    surname : String,
    email : String,
    phone : {
        number : String,
        default : ""
    },
    messages: ['userMessages'] 
});

const UserMessagesShema  = new mongoose.Schema({
    message : String,

});

// regrouper le tout dans un model 'myUsers' est le nom de la collection
const myUsers = mongoose.model('myUsers', UserTestSchema);
const userMessages = mongoose.model('userMessages', UserMessagesShema);

module.exports = { myUsers, userMessages }